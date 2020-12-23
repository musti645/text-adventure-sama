import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import * as natural from 'natural';

import { Action } from '../models/actions/action.model';
import { InGameItem } from '../models/item.model';
import { Game } from '../models/game.model';
import { Command } from '../models/command.model';

import { InteractionType } from '../models/interactions/interaction-type.enum';
import { ParseInputResult } from '../models/other/parse-input-result.model';
import { SpellcheckHelperService } from './spellcheck-helper.service';
import { IClassificationTrainer } from '../classification/interfaces/classification-trainer.interface';
import { BaseClassifier } from '../classification/classifier.base';
import { IPickUpClassificationHelper } from '../classification/interfaces/pick-up-classification-helper.interface';
import { IUseClassificationHelper } from '../classification/interfaces/use-classification-helper.interface';
import { ILookAtClassificationHelper } from '../classification/interfaces/look-at-classification-helper.interface';
import { UseClassificationHelper } from '../classification/use-classification-helper.service';
import { PickUpClassificationHelper } from '../classification/pick-up-classification-helper.service';
import { LookAtClassificationHelper } from '../classification/look-at-classification-helper.service';
import { IGoToClassificationHelper } from '../classification/interfaces/go-to-classification-helper.interface';
import { GoToClassificationHelper } from '../classification/go-to-classification-helper.service';


/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
@Injectable()
export class InputParserService {
    protected Game: Game;
    protected IsCaseSensitive: boolean;

    private Tokenizer: natural.WordTokenizer;
    private Classifier: natural.BayesClassifier;
    private Spellcheck: natural.Spellcheck;

    private useHelper: IUseClassificationHelper;
    private pickUpHelper: IPickUpClassificationHelper;
    private lookAtHelper: ILookAtClassificationHelper;
    private goToHelper: IGoToClassificationHelper;

    constructor() {
        this.Tokenizer = new natural.WordTokenizer();
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
            const uniqueWords = _.uniq(words);

            // using all relevant unique words in the game as our spellchecker`s corpus
            this.Spellcheck = new natural.Spellcheck(uniqueWords);

            this.useHelper = new UseClassificationHelper();
            this.pickUpHelper = new PickUpClassificationHelper();
            this.lookAtHelper = new LookAtClassificationHelper();
            this.goToHelper = new GoToClassificationHelper();

            trainer.trainClassifier(this.Classifier).then(() => resolve(true));
        });
    }


    public setGame(game: Game): void {
        this.Game = game;
    }

    public setCaseSensitivity(val: boolean): void {
        this.IsCaseSensitive = val;
    }

    /**
     * Because the classification of items is much harder than that of items, 
     * we can increase the match score by adding common phrases to the classification process
     * @param pickUpHelper gets common phrases and terms for PICK_UP type input
     * @param useHelper gets common phrases and terms for USE type input
     * @param lookAtHelper gets common phrases and terms for LOOK_AT type input
     */
    public setItemClassificationHelpers(pickUpHelper?: IPickUpClassificationHelper,
        useHelper?: IUseClassificationHelper,
        lookAtHelper?: ILookAtClassificationHelper,
        goToHelper?: IGoToClassificationHelper): void {
        if (pickUpHelper) {
            this.pickUpHelper = pickUpHelper;
        }

        if (useHelper) {
            this.useHelper = useHelper;
        }

        if (lookAtHelper) {
            this.lookAtHelper = lookAtHelper;
        }

        if (goToHelper) {
            this.goToHelper = goToHelper;
        }
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
        let commandsResult: ParseInputResult;

        let matchingCommand: Command;

        if (!this.IsCaseSensitive) {
            input = input.toLocaleLowerCase();
            matchingCommand = this.Game.getCommands().find(command => command.getTrigger().toLocaleLowerCase() === input);
        }
        else {
            matchingCommand = this.Game.getCommands().find(command => command.getTrigger() === input);
        }

        if (matchingCommand) {
            commandsResult = new ParseInputResult(matchingCommand.activate(),
                matchingCommand.getUseTypeWritingAnimation(),
                matchingCommand.getEndsGame(),
                matchingCommand.getResetsGame());
        }

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

        const action = this.getLikelyAction(input,
            gatewayActions,
            this.goToHelper.getGoToClassificationStrings());

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

        const item = this.getLikelyItem(input,
            this.Game.getItemsInScene().concat(this.Game.getItemsInInventory()),
            this.lookAtHelper?.getLookAtClassificationStrings());

        if (!item) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }

        result.Result = item.getDescription();
        return result;
    }

    protected getPickUpResponse(input: string): ParseInputResult {
        const result = new ParseInputResult('');

        const item = this.getLikelyItem(input,
            this.Game.getItemsInScene(),
            this.pickUpHelper?.getPickUpClassificationStrings());

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

        const item = this.getLikelyItem(input,
            this.Game.getItemsInScene().concat(this.Game.getItemsInInventory()),
            this.useHelper?.getUseClassificationStrings());

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

    protected getLikelyAction(input: string, actions: Action[], additionalClassificationDocuments?: string[]): Action {
        const actionClassifier = new BaseClassifier<Action>(0.75, this.Tokenizer, undefined, this.IsCaseSensitive);
        for (const action of actions) {
            const tokenizedTrigger: string[] = this.Tokenizer.tokenize(action.getTrigger());
            actionClassifier.addDocuments(tokenizedTrigger, action);
            for (const trigger of action.getAlternativeTriggers()) {
                const tokenizedAlternativeTrigger: string[] = this.Tokenizer.tokenize(trigger);
                actionClassifier.addDocuments(tokenizedAlternativeTrigger, action);
            }
            if (additionalClassificationDocuments) {
                actionClassifier.addDocuments(additionalClassificationDocuments, action);
            }
        }

        actionClassifier.train();

        input = this.spellcheckInput(input);

        return actionClassifier.classify(input);
    }

    protected getLikelyItem(input: string, items: InGameItem[], additionalClassificationDocuments?: string[]): InGameItem {
        const itemClassifier = new BaseClassifier<InGameItem>(0.75, this.Tokenizer, undefined, this.IsCaseSensitive)
        for (const item of items) {
            const tokenizedName: string[] = this.Tokenizer.tokenize(item.getName());
            itemClassifier.addDocuments(tokenizedName, item);
            if (additionalClassificationDocuments) {
                itemClassifier.addDocuments(additionalClassificationDocuments, item);
            }
        }

        itemClassifier.train();

        input = this.spellcheckInput(input);

        return itemClassifier.classify(input);
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
