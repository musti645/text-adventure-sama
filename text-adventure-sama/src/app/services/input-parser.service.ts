import { Injectable } from '@angular/core';

import { Action } from '../models/actions/action.model';
import { InGameItem } from '../models/Item.model';
import { Game } from '../models/game.model';
import { TextInputType } from '../models/other/text-input.enum';

import * as natural from 'natural';
import { InteractionType } from '../models/interactions/interaction-type.enum';
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
    Game: Game;
    POSTagger: natural.BrillPOSTagger;
    Tokenizer: natural.WordTokenizer;
    SkipTokenization: boolean;

    constructor() {
    }

    public initialize(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.Tokenizer = new natural.WordTokenizer();
            const lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
            const ruleSet = new natural.RuleSet('EN');
            this.POSTagger = new natural.BrillPOSTagger(lexicon, ruleSet);
            resolve(true);
        });
    }

    setGame(game: Game) {
        this.Game = game;
    }

    setTokenization(tokenization: boolean) {
        this.SkipTokenization = tokenization;
    }

    public parseInput(input: string): string {
        let interactionType;

        const taggedTokens = this.POSTagger.tag(this.Tokenizer.tokenize(input));

        const verbs = this.getVerbsFromTokenizedInput(taggedTokens);

        for (const element of verbs) {
            const type = this.getInputType(element);
            if (!type) {
                break;
            }

            interactionType = type;
        }

        // no interaction type found
        if (!interactionType) {
            return this.Game.Stage.getCurrentScene().InvalidInputResponse;
        }

        // are there any actions, that might be triggered?
        const triggeredAction = this.getTriggeredAction(interactionType, taggedTokens, this.SkipTokenization);

        if (!triggeredAction) {
            return triggeredAction.trigger();
        }

        // are there any items, that might be used?
        const triggeredItem = this.getTriggeredItem(interactionType, taggedTokens, this.SkipTokenization);

        if (!triggeredItem) {
            return triggeredItem.use();
        }

        return this.Game.Stage.getCurrentScene().InvalidInputResponse;
    }

    protected getVerbsFromTokenizedInput(taggedTokens: TaggedToken[]): any {
        return taggedTokens.reduce<string[]>((result, token) => {
            if (token.tag === verbCategory) {
                result.push(token.token);
            }

            return result;
        }, []);
    }


    protected getInputType(input: string): InteractionType {
        // create a classifier and manually train it with strings to spit out which type of interaction is being used in this sentence
        return null;
    }

    protected getTriggeredAction(interactionType: InteractionType, taggedTokens: TaggedToken[], skipTokenization: boolean): Action {

        const actions = this.Game.Stage.getCurrentScene()
            .Actions
            .reduce<ActionDistance[]>((filteredActions: ActionDistance[], action: Action) => {
                if (action.InteractionType !== interactionType) {
                    return filteredActions;
                }

                const lowerCaseTrigger = action.Trigger.toLocaleLowerCase();
                // tag the trigger of the action

                let tokens = [];

                if (!skipTokenization) {
                    // tag the name of the item
                    const tag = this.POSTagger.tag(this.Tokenizer.tokenize(action.Trigger))[0].tag;
                    tokens = taggedTokens.filter(val => val.tag === tag);
                }

                const filteredTokens = tokens
                    .filter(val => {
                        // calculate the Damerau Levenshtein distance between the action trigger and the token
                        // if it is larger than 2, ignore the token
                        // ignore case
                        val.distance = natural.DamerauLevenshteinDistance(val.token.toLocaleLowerCase(),
                            lowerCaseTrigger, { transposition_cost: 0 });
                        return val.distance <= 2;
                    })
                    .sort(val => val.distance);

                if (!filteredTokens || filteredTokens.length <= 0) {
                    // no token tags match the tag of the trigger
                    return filteredActions;
                }

                // return the action and its lowest distance to a token with the same tag
                filteredActions.push(new ActionDistance(action, filteredTokens[0].distance));

                return filteredActions;
            }, []);

        if (!actions || actions.length <= 0) {
            return null;
        }

        actions.sort(val => val.Distance);

        return actions[0].Action;
    }

    protected getTriggeredItem(interactionType: InteractionType, taggedTokens: TaggedToken[], skipTokenization: boolean): InGameItem {

        const items = this.Game.Stage.getCurrentScene()
            .Items
            .reduce<ItemDistance[]>((filteredItems: ItemDistance[], item: InGameItem) => {
                if (item.InteractionType !== interactionType) {
                    return filteredItems;
                }

                const lowerCaseTrigger = item.Name.toLocaleLowerCase();

                let tokens = [];

                if (!skipTokenization) {
                    // tag the name of the item
                    const tag = this.POSTagger.tag(this.Tokenizer.tokenize(item.Name))[0].tag;
                    tokens = taggedTokens.filter(val => val.tag === tag);
                }

                const filteredTokens = tokens
                    .filter(val => {
                        // calculate the Damerau Levenshtein distance between the item name and the token
                        // if it is larger than 2, ignore the token
                        // ignore case
                        val.distance = natural.DamerauLevenshteinDistance(val.token.toLocaleLowerCase(),
                            lowerCaseTrigger, { transposition_cost: 0 });
                        return val.distance <= 2;
                    })
                    .sort(val => val.distance);

                if (!filteredTokens || filteredTokens.length <= 0) {
                    // no token tags match the tag of the name
                    return filteredItems;
                }

                // return the item and its lowest distance to a token with the same tag
                filteredItems.push(new ItemDistance(item, filteredTokens[0].distance));

                return filteredItems;
            }, []);

        if (!items || items.length <= 0) {
            return null;
        }

        items.sort(val => val.Distance);

        return items[0].Item;
    }
}

export class InputWrapper {
    public InputType: TextInputType;
    public Keyword: string;
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
