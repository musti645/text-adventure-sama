import { Injectable } from '@angular/core';

import { Action } from '../models/actions/action.model';
import { InGameItem } from '../models/Item.model';
import { Game } from '../models/game.model';
import { TextInputType } from '../models/other/text-input.enum';

import * as natural from 'natural';
import { InteractionType } from '../models/interactions/interaction-type.enum';
import { IClassificationTrainer } from './classification-trainer.interface';
import { ParseInputResult } from '../models/other/parse-input-result.model';
const language = 'EN';
// see Penn Treebank Part-of-Speech Tags for more info on the tags
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';
const verbCategory = 'VB';

/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
@Injectable({
    providedIn: 'root'
})
export class InputParserService {
    private Game: Game;
    private POSTagger: natural.BrillPOSTagger;
    private Tokenizer: natural.WordTokenizer;
    private Classifier: natural.BayesClassifier;

    constructor() {
    }

    public initialize(trainer: IClassificationTrainer): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.Tokenizer = new natural.WordTokenizer();
            const lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
            const ruleSet = new natural.RuleSet('EN');
            this.POSTagger = new natural.BrillPOSTagger(lexicon, ruleSet);
            this.Classifier = new natural.BayesClassifier();
            trainer.trainClassifier(this.Classifier).then(() => resolve(true));
        });
    }


    setGame(game: Game) {
        this.Game = game;
    }

    public parseInput(input: string): ParseInputResult {
        const commandsResult = this.getCommandsResponse(input);
        if (commandsResult) {
            return commandsResult;
        }

        // because imperatives are not so common in the brown/penn corpus, we add a 'they ' before
        // the whole sentence, in order to make it a legitimate sentence and identify imperatives as verbs instead of nouns
        input = 'they ' + input;

        const taggedTokens = this.POSTagger.tag(this.Tokenizer.tokenize(input)).taggedWords;

        // we get verbs and nouns, because in many cases a noun may be mistaken to be a verb and vice versa e.g. (a) stick & (to) stick
        const nounsAndVerbs = this.getNounsAndVerbsFromTokenizedInput(taggedTokens);

        const interactionType = this.getInteractionType(input);

        // no interaction type found
        if (interactionType === undefined || interactionType === null) {
            return new ParseInputResult(this.Game.getInvalidInputResponse());
        }

        switch (interactionType) {
            case InteractionType.GO_TO:
                // scenes/gateway actions
                return this.getGoToResponse(nounsAndVerbs);
            case InteractionType.LOOK_AT:
                // item description
                return this.getLookAtResponse(nounsAndVerbs);
            case InteractionType.PICK_UP:
                // add item to inventory
                return this.getPickUpResponse(nounsAndVerbs);
            case InteractionType.USE:
                // use item in inventory or in scene
                return this.getUseResponse(nounsAndVerbs);
            default:
                return this.getDoResponse(nounsAndVerbs);
        }

    }

    protected getCommandsResponse(input: string): ParseInputResult {
        const lowerCaseInput = input.toLocaleLowerCase();

        let commandsResult: ParseInputResult;
        this.Game.getCommands().some(command => {
            if (command.getTrigger().toLocaleLowerCase() === lowerCaseInput) {
                commandsResult = new ParseInputResult(command.activate(), command.getUseTypeWritingAnimation());
                return true;
            }
        });

        return commandsResult;
    }

    protected getGoToResponse(relevantWords: string[]): ParseInputResult {
        const result = new ParseInputResult('');
        // get gateway actions
        const gatewayActions = this.Game.getActionsInScene().filter(val => {
            return val.getInteractionType() === InteractionType.GO_TO;
        });

        if (!gatewayActions || gatewayActions.length <= 0) {
            result.Result = this.Game.getGatewayTargetNotFoundResponse();
            return result;
        }

        const actionDistances = this.getActionDistancesFromNouns(relevantWords, gatewayActions);

        if (!actionDistances || actionDistances.length <= 0) {
            result.Result = this.Game.getGatewayTargetNotFoundResponse();
            return result;
        }

        const action = actionDistances[0].Action;

        result.Result = action.trigger();
        result.IsEndGameResult = action.getIsEndGameAction();
        return result;

    }

    protected getLookAtResponse(relevantWords: string[]): ParseInputResult {
        const result = new ParseInputResult('');

        const itemDistances = this.getItemDistancesFromNouns(relevantWords,
            this.Game.getItemsInScene(),
            this.Game.getItemsInInventory());

        if (!itemDistances || itemDistances.length <= 0) {
            result.Result = this.Game.getItemNotFoundResponse();
        }
        result.Result = itemDistances[0].Item.getDescription();
        return result;
    }

    protected getPickUpResponse(relevantWords: string[]): ParseInputResult {
        const result = new ParseInputResult('');

        const itemDistances = this.getItemDistancesFromNouns(relevantWords,
            this.Game.getItemsInScene(),
            undefined);

        if (!itemDistances || itemDistances.length <= 0) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }

        const item = itemDistances[0].Item;

        this.Game.addItemToInventory(item);

        this.Game.removeItemFromScene(item);

        result.Result = this.Game.getItemAddedToInventoryResponse();
        return result;
    }

    protected getUseResponse(relevantWords: string[]): ParseInputResult {
        const result = new ParseInputResult('');

        const itemDistances = this.getItemDistancesFromNouns(relevantWords,
            this.Game.getItemsInScene(),
            this.Game.getItemsInInventory());

        if (!itemDistances || itemDistances.length <= 0) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }

        const item = itemDistances[0].Item;

        result.Result = item.use();
        return result;
    }

    protected getDoResponse(relevantWords: string[]): ParseInputResult {
        const result = new ParseInputResult('');

        const actions = this.Game.getActionsInScene().filter(val => {
            return val.getInteractionType() === InteractionType.DO;
        });

        if (!actions || actions.length <= 0) {
            result.Result = this.Game.getActionNotRecognizedResponse();
            return result;
        }

        const actionDistances = this.getActionDistancesFromNouns(relevantWords, actions);

        if (!actionDistances || actionDistances.length <= 0) {
            result.Result = this.Game.getActionNotRecognizedResponse();
            return result;
        }

        const action = actionDistances[0].Action;

        result.Result = action.trigger();
        result.IsEndGameResult = action.getIsEndGameAction();
        return result;
    }

    protected getNounsAndVerbsFromTokenizedInput(taggedTokens: TaggedToken[]): any {
        return taggedTokens.reduce<string[]>((result, token) => {
            if (token.tag === defaultCategoryCapitalized || token.tag === defaultCategory || token.tag === verbCategory) {
                result.push(token.token);
            }

            return result;
        }, []);
    }

    private getItemDistancesFromNouns(relevantWords: string[], sceneItems: InGameItem[], inventoryItems: InGameItem[]): ItemDistance[] {
        const itemDistances: ItemDistance[] = [];

        let items = [];
        if (sceneItems) {
            items = items.concat(sceneItems);
        }

        if (inventoryItems) {
            items = items.concat(inventoryItems);
        }

        items.map(val => {
            const taggedName = this.POSTagger.tag(this.Tokenizer.tokenize(val.Name)).taggedWords;

            taggedName.map(name => {
                relevantWords.map(input => {
                    const distance = natural.DamerauLevenshteinDistance(input,
                        name.token, { transposition_cost: 0 });
                    if (distance <= 1) {
                        itemDistances.push(new ItemDistance(val, distance));
                    }
                });
            });

        });

        return itemDistances.sort(val => val.Distance);
    }

    private getActionDistancesFromNouns(relevantWords: string[], actions: Action[]): ActionDistance[] {
        const actionDistances: ActionDistance[] = [];

        actions.map(val => {
            const taggedTrigger = this.POSTagger.tag(this.Tokenizer.tokenize(val.getTrigger())).taggedWords;

            taggedTrigger.map(trigger => {
                relevantWords.map(input => {
                    const distance = natural.DamerauLevenshteinDistance(input,
                        trigger.token, { transposition_cost: 0 });
                    if (distance <= 1) {
                        actionDistances.push(new ActionDistance(val, distance));
                    }
                });
            });
        });

        return actionDistances.sort(val => val.Distance);
    }

    protected getInteractionType(input: string): InteractionType {
        const result = this.Classifier.classify(input);
        return this.getInteractionTypeFromClassificationResult(result);
    }

    public getInteractionTypeFromClassificationResult(result: string): InteractionType {
        switch (result) {
            case 'use':
                return InteractionType.USE;
            case 'look_at':
                return InteractionType.LOOK_AT;
            case 'go_to':
                return InteractionType.GO_TO;
            case 'pick_up':
                return InteractionType.PICK_UP;
            case 'do':
                return InteractionType.DO;
            default:
                return InteractionType.DO;
        }
    }
}


class ActionTag {
    public Action: Action;
    public Tag: string;

    public constructor(action: Action, tag: string) {
        this.Action = action;
        this.Tag = tag;
    }
}

class ActionDistance {
    public Action: Action;
    public Distance: number;

    public constructor(action: Action, distance: number) {
        this.Action = action;
        this.Distance = distance;
    }
}

class ItemDistance {
    public Item: InGameItem;
    public Distance: number;

    public constructor(item: InGameItem, distance: number) {
        this.Item = item;
        this.Distance = distance;
    }
}

class ItemTag {
    public Item: InGameItem;
    public Tag: string;

    public constructor(item: InGameItem, tag: string) {
        this.Item = item;
        this.Tag = tag;
    }
}

class TaggedToken {
    token: string;
    tag: string;
    distance: number;
}
