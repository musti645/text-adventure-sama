import { Injectable } from '@angular/core';

import { Action } from '../models/actions/action.model';
import { InGameItem } from '../models/item.model';
import { Game } from '../models/game.model';

import * as natural from 'natural';
import { InteractionType } from '../models/interactions/interaction-type.enum';
import { IClassificationTrainer } from './classification-trainer.interface';
import { ParseInputResult } from '../models/other/parse-input-result.model';
import { ClassificationResult } from 'src/models/natural/classification-result.model';
import { SpellcheckHelperService } from './spellcheck-helper.service';
const language = 'EN';
// see Penn Treebank Part-of-Speech Tags for more info on the tags
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';


/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
@Injectable()
export class InputParserService {
    protected nounCategories = ['N', 'NN', 'NNS', 'NNP', 'NNPS'];
    protected verbCategories = ['VB', 'VBD', 'VBG', 'VBN', 'VBO', 'VBZ'];

    protected Game: Game;
    private POSTagger: natural.BrillPOSTagger;
    private Tokenizer: natural.WordTokenizer;
    private Classifier: natural.BayesClassifier;
    private Spellcheck: natural.Spellcheck;

    constructor() {
        this.Tokenizer = new natural.WordTokenizer();
        const lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
        const ruleSet = new natural.RuleSet('EN');
        this.POSTagger = new natural.BrillPOSTagger(lexicon, ruleSet);
        this.Classifier = new natural.BayesClassifier();
    }

    public initialize(trainer: IClassificationTrainer): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let words = [];
            const gameStrings = this.Game.getInputRelevantStrings();

            // tokenize strings and push each word into the words array
            gameStrings.map(val => {
                words = words.concat(this.Tokenizer.tokenize(val));
            });

            words = words.concat(SpellcheckHelperService.getInputRelevantWords());

            // get only distinct words
            const uniqueWords = [...new Set(words)];

            // using all relevant unique words in the game as our spellchecker`s corpus
            this.Spellcheck = new natural.Spellcheck(uniqueWords);

            trainer.trainClassifier(this.Classifier).then(() => resolve(true));
        });
    }


    public setGame(game: Game): void {
        this.Game = game;
    }

    public parseInput(input: string): ParseInputResult {
        input = input.trim();

        const commandsResult = this.getCommandsResponse(input);
        if (commandsResult) {
            return commandsResult;
        }

        const interactionType = this.getInteractionType(input);

        // no interaction type found
        if (interactionType === undefined || interactionType === null) {
            return new ParseInputResult(this.Game.getInvalidInputResponse());
        }

        switch (interactionType) {
            case InteractionType.GO_TO:
                // scenes/gateway actions
                return this.getGoToResponse(input);
            case InteractionType.LOOK_AT:
                // item description
                return this.getLookAtResponse(input);
            case InteractionType.PICK_UP:
                // add item to inventory
                return this.getPickUpResponse(input);
            case InteractionType.USE:
                // use item in inventory or in scene
                return this.getUseResponse(input);
            default:
                // do something
                return this.getDoResponse(input);
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

    protected getGoToResponse(input: string): ParseInputResult {
        const result = new ParseInputResult('');
        // get gateway actions
        const gatewayActions = this.Game.getActionsInScene().filter(val => {
            return val.getInteractionType() === InteractionType.GO_TO;
        });

        if (!gatewayActions || gatewayActions.length <= 0) {
            result.Result = this.Game.getGatewayTargetNotFoundResponse();
            return result;
        }

        const action = this.getLikelyAction(input, gatewayActions);

        if (!action) {
            result.Result = this.Game.getGatewayTargetNotFoundResponse();
            return result;
        }

        result.Result = action.trigger();
        result.IsEndGameResult = action.getIsEndGameAction();
        return result;
    }

    protected getLookAtResponse(input: string): ParseInputResult {
        const result = new ParseInputResult('');

        const item = this.getLikelyItem(input, this.Game.getItemsInScene().concat(this.Game.getItemsInInventory()));

        if (!item) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }

        result.Result = item.getDescription();
        return result;
    }

    protected getPickUpResponse(input: string): ParseInputResult {
        const result = new ParseInputResult('');


        const item = this.getLikelyItem(input, this.Game.getItemsInScene());

        if (!item) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }

        if (!item.getCanPickUp()) {
            result.Result = item.getCannotPickUpResponse();
            return result;
        }

        // one cannot pick up an item, that has no usages left anymore
        if (item.getUsagesLeft() <= 0) {
            result.Result = item.getNoUsagesLeftResponse();
            return result;
        }

        this.Game.addItemToInventory(item);

        this.Game.removeItemFromScene(item);

        result.Result = this.Game.getItemAddedToInventoryResponse();
        return result;
    }

    protected getUseResponse(input: string): ParseInputResult {
        const result = new ParseInputResult('');

        const item = this.getLikelyItem(input, this.Game.getItemsInScene().concat(this.Game.getItemsInInventory()));

        if (!item) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }

        if (!item.CanUseFunction(item, this.Game.getStage().getCurrentScene(), this.Game.getInventory())) {
            result.Result = item.getCannotUseItemResponse();
            return result;
        }

        result.Result = item.use();

        // if the item was in the inventory and has no usages left anymore -> remove it from inventory
        if (item.WasPickedUp && item.getUsagesLeft() <= 0) {
            result.Result += `\r\n${item.getNoUsagesLeftResponse()}`;
            this.Game.removeItemFromInventory(item);
        }

        return result;
    }

    protected getDoResponse(input: string): ParseInputResult {
        const result = new ParseInputResult('');

        const actions = this.Game.getActionsInScene().filter(val => {
            return val.getInteractionType() === InteractionType.DO;
        });

        if (!actions || actions.length <= 0) {
            result.Result = this.Game.getActionNotRecognizedResponse();
            return result;
        }

        const action = this.getLikelyAction(input, actions);

        if (!action) {
            result.Result = this.Game.getActionNotRecognizedResponse();
            return result;
        }

        result.Result = action.trigger();
        result.IsEndGameResult = action.getIsEndGameAction();
        return result;
    }

    protected getLikelyAction(input: string, actions: Action[]): Action {
        // we're using the logistic regression classifier here in order to get the maximum probability of 1
        // this allows us to filter out later on, in order to also have cases, where none of the actions match the input
        const actionClassifier = new natural.LogisticRegressionClassifier();
        for (const action of actions) {
            const taggedWordsTrigger = this.Tokenizer.tokenize(action.getTrigger());
            actionClassifier.addDocument(taggedWordsTrigger, action.getTrigger());
            for (const trigger of action.getAlternativeTriggers()) {
                const taggedWordsAlternativeTrigger = this.Tokenizer.tokenize(trigger);
                actionClassifier.addDocument(taggedWordsAlternativeTrigger, action.getTrigger());
            }
        }

        actionClassifier.train();

        let classifications: ClassificationResult[] = actionClassifier.getClassifications(input);
        classifications = classifications.filter((val) => {
            return val.value >= 0.8;
        });
        if (classifications.length <= 0) {
            input = this.spellcheckInput(input);

            classifications = actionClassifier.getClassifications(input);
            classifications = classifications.filter((val) => {
                return val.value >= 0.8;
            });
        }

        const result = classifications[0];
        if (!result) {
            return undefined;
        }
        return actions.find((val) => {
            return val.getTrigger() === result.label;
        });
    }

    protected getLikelyItem(input: string, items: InGameItem[]): InGameItem {
        const itemClassifier = new natural.LogisticRegressionClassifier();
        for (const item of items) {
            const taggedWordsTrigger = this.Tokenizer.tokenize(item.getName());
            itemClassifier.addDocument(taggedWordsTrigger, item.getName());
        }

        itemClassifier.train();

        let classifications: ClassificationResult[] = itemClassifier.getClassifications(input);
        classifications = classifications.filter((val) => {
            return val.value >= 0.8;
        });

        if (classifications.length <= 0) {
            input = this.spellcheckInput(input);

            classifications = itemClassifier.getClassifications(input);
            classifications = classifications.filter((val) => {
                return val.value >= 0.8;
            });
        }


        const result = classifications[0];
        if (!result) {
            return undefined;
        }
        return items.find((val) => {
            return val.getName() === result.label;
        });
    }

    protected spellcheckInput(input: string): string {
        const tokenizedInput: string[] = this.Tokenizer.tokenize(input);
        let correctedInputString = '';
        tokenizedInput.map(val => {
            if (!this.Spellcheck.isCorrect(val)) {
                const corrections = this.Spellcheck.getCorrections(val, 1);
                if (corrections.length >= 1) {
                    val = corrections[0];
                }
            }
            correctedInputString += (val + ' ');
        });

        correctedInputString = correctedInputString.trim();

        return correctedInputString;
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
