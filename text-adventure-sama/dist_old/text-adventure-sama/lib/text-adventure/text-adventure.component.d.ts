import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextInput } from '../models/other/text-input.model';
import { Game } from '../models/game.model';
import { GameBuilder } from '../builder/game.builder';
import { InputParserService } from '../services/input-parser.service';
import { GameResetEvent } from '../models/events/game-reset.event';
import { GameEndEvent } from '../models/events/game-end.event';
import { GameStartEvent } from '../models/events/game-start.event';
import { IClassificationTrainer } from '../services/classification-trainer.interface';
/**
 * Main Component, that contains the input and output of the game.
 */
import * as ɵngcc0 from '@angular/core';
export declare class TextAdventureComponent implements OnInit {
    private inputParserService;
    inputElement: ElementRef;
    OutputArray: TextInput[];
    IsLoading: boolean;
    UseTypewritingAnimation: boolean;
    TypewriterSpeed: number;
    Game: Game;
    ClassificationTrainer: IClassificationTrainer;
    OnGameStartEvent: EventEmitter<GameStartEvent>;
    OnGameResetEvent: EventEmitter<GameResetEvent>;
    OnGameEndEvent: EventEmitter<GameEndEvent>;
    GameBuilder: GameBuilder;
    InputForm: FormGroup;
    constructor(inputParserService: InputParserService);
    ngOnInit(): void;
    OnSubmit(): void;
    OnGameReset(): void;
    OnGameEnd(): void;
    private get userInput();
    private startLoading;
    private stopLoading;
    private startGame;
    private printOutput;
    private printLineAnimated;
    private typewriteOutput;
    private printInput;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TextAdventureComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TextAdventureComponent, "tas-text-adventure", never, { "UseTypewritingAnimation": "UseTypewritingAnimation"; "TypewriterSpeed": "TypewriterSpeed"; "Game": "Game"; "ClassificationTrainer": "ClassificationTrainer"; }, { "OnGameStartEvent": "OnGameStartEvent"; "OnGameResetEvent": "OnGameResetEvent"; "OnGameEndEvent": "OnGameEndEvent"; }, never, never>;
}

//# sourceMappingURL=text-adventure.component.d.ts.map