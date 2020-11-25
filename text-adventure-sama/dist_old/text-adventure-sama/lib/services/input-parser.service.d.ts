import { Game } from '../models/game.model';
import { InteractionType } from '../models/interactions/interaction-type.enum';
import { IClassificationTrainer } from './classification-trainer.interface';
import { ParseInputResult } from '../models/other/parse-input-result.model';
/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
import * as ɵngcc0 from '@angular/core';
export declare class InputParserService {
    private Game;
    private POSTagger;
    private Tokenizer;
    private Classifier;
    constructor();
    initialize(trainer: IClassificationTrainer): Promise<boolean>;
    setGame(game: Game): void;
    parseInput(input: string): ParseInputResult;
    protected getCommandsResponse(input: string): ParseInputResult;
    protected getGoToResponse(relevantWords: string[]): ParseInputResult;
    protected getLookAtResponse(relevantWords: string[]): ParseInputResult;
    protected getPickUpResponse(relevantWords: string[]): ParseInputResult;
    protected getUseResponse(relevantWords: string[]): ParseInputResult;
    protected getDoResponse(relevantWords: string[]): ParseInputResult;
    protected getNounsAndVerbsFromTokenizedInput(taggedTokens: TaggedToken[]): any;
    private getItemDistancesFromNouns;
    private getActionDistancesFromNouns;
    protected getInteractionType(input: string): InteractionType;
    getInteractionTypeFromClassificationResult(result: string): InteractionType;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<InputParserService, never>;
}
declare class TaggedToken {
    token: string;
    tag: string;
    distance: number;
}
export {};

//# sourceMappingURL=input-parser.service.d.ts.map