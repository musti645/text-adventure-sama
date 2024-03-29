import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TextInputType } from '../models/other/text-input-type.enum';
import { TextInput } from '../models/other/text-input.model';
import { Game } from '../models/game.model';
import { GameResetEvent } from '../models/events/game-reset.event';
import { GameEndEvent } from '../models/events/game-end.event';
import { GameStartEvent } from '../models/events/game-start.event';
import { GameInitStartEvent } from '../models/events/game-init-start.event';

import { IClassificationTrainer } from '../classification/interfaces/classification-trainer.interface';
import { ClassificationTrainer } from '../classification/classification-trainer.service';

import { InputParserService } from '../services/input-parser.service';

/**
 * The TextAdventureComponent is the only component, that is necessary to create a Text Adventure.
 * Import the TextAdventureModule in order to use it.
 * 
 * For information on how to use this component, have a look at the docs.
 */
@Component({
  selector: 'tas-text-adventure',
  templateUrl: './text-adventure.component.html',
  styleUrls: ['./text-adventure.component.scss']
})
export class TextAdventureComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('input', { static: true }) inputElement: ElementRef;

  /**
   * Determines if the game uses the typewriting animation when printing output 
   */
  @Input() UseTypewritingAnimation = true;

  /**
   * The amount of milliseconds between each type of the typewriting animation
   */
  @Input() TypewriterSpeed = 40;

  /**
   * Determines if the input parsing is case sensitive
   */
  @Input() IsCaseSensitive = false;

  /**
   * To create a game use the "GameBuilder" and pass it into this component.
   * 
   * For more information on how to create a game, see the documentation.
   */
  @Input() Game: Game;

  /**
   * Allows to pass own ClassificationTrainer to train the input classifier
   */
  @Input() ClassificationTrainer: IClassificationTrainer;

  /**
   * Called when the game is initialized
   */
  @Output() OnGameInitStartEvent: EventEmitter<GameInitStartEvent> = new EventEmitter<GameInitStartEvent>();

  /**
   * Called when the game starts
   */
  @Output() OnGameStartEvent: EventEmitter<GameStartEvent> = new EventEmitter<GameStartEvent>();

  /**
   * Called when the game is reset
   */
  @Output() OnGameResetEvent: EventEmitter<GameResetEvent> = new EventEmitter<GameResetEvent>();

  /**
   * Called when the game ends
   */
  @Output() OnGameEndEvent: EventEmitter<GameEndEvent> = new EventEmitter<GameEndEvent>();

  // scope variables
  OutputArray: TextInput[] = [];
  IsLoading = false;
  InputForm: FormGroup = new FormGroup(
    {
      userInput: new FormControl({
        value: '',
        disabled: this.IsLoading
      }, [
        Validators.required
      ])
    }
  );
  // used to track output lines in the ngFor
  OutputLineId = 0;

  protected IsGameInitialized: boolean;

  constructor(private inputParserService: InputParserService) {
  }

  /**
   * Method to track the output lines, used in the template of the component.
   */
  IdentifyOutput(index: number, line: TextInput) {
    return line.Id;
  }

  ngOnInit(): void {
    this.startLoading();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.Game.currentValue || this.IsGameInitialized) {
      return;
    }

    this.initGame();
  }

  ngOnDestroy(): void {
    if (!this.Game) {
      return;
    }

    this.Game.onDestroy();
  }

  /**
   * Called when the user hits enter in the input field
   */
  OnSubmit(): void {
    this.startLoading();
    const inputString = this.userInput.value;
    if (!inputString) {
      this.stopLoading();
      return;
    }
    this.printInput(inputString);
    this.userInput.setValue('');

    const parseResult = this.inputParserService.parseInput(inputString);

    this.printOutput(parseResult.Result, parseResult.UseTypewriterAnimation).then(() => {
      if (parseResult.IsEndGameResult) {
        this.endGame();
        return;
      }

      if (parseResult.IsResetGameResult) {
        this.resetGame();
        return;
      }

      if (parseResult.IsClearOutputResult) {
        this.clearOutput();
      }

      this.stopLoading();
    });
  }

  OnGameReset(): void {
    this.OnGameResetEvent.emit(new GameResetEvent(this.Game));
  }

  OnGameEnd(): void {
    this.OnGameEndEvent.emit(new GameEndEvent(this.Game));
  }

  OnGameStart(): void {
    this.OnGameStartEvent.emit(new GameStartEvent(this.Game));
  }

  OnGameInitStart(): void {
    this.OnGameInitStartEvent.emit(new GameInitStartEvent(this.Game));
  }

  /**
   * Initializes the game
   */
  protected initGame(): void {
    this.OnGameInitStart();

    let classificationTrainer;

    if (!this.ClassificationTrainer) {
      classificationTrainer = new ClassificationTrainer();
    }
    else {
      classificationTrainer = this.ClassificationTrainer;
    }

    this.IsGameInitialized = true;
    this.inputParserService.setGame(this.Game);
    this.inputParserService.setCaseSensitivity(this.IsCaseSensitive);
    this.inputParserService.initialize(classificationTrainer).then(() => {
      this.startGame();
    });
  }

  /**
   * Called after the initialization is complete to start the game.
   */
  protected startGame(): void {
    this.printOutput(this.Game.getTitle())
      .then(() => this.printOutput(this.Game.getIntroduction()))
      .then(() => this.stopLoading())
      .then(() => this.OnGameStart());
  }

  protected resetGame(): void {
    this.IsGameInitialized = false;
    this.OnGameReset();
    this.clearOutput();
    this.initGame();
  }

  protected endGame(): void {
    this.OnGameEnd();
  }

  /**
   * Removes all output lines
   */
  protected clearOutput(): void {
    this.OutputArray = [];
  }

  protected get userInput(): FormControl {
    return this.InputForm.get('userInput') as FormControl;
  }

  protected startLoading(): void {
    this.IsLoading = true;
    this.userInput.disable();
  }

  protected stopLoading(): void {
    this.IsLoading = false;
    this.userInput.enable();
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  /**
   * Prints the output to the screen either with or without using the typewriting animation.
   * @param output the string that is to be printed onto the screen
   * @param useTypewriteAnimationOnOutput determines if the output is printed character by character or all at once.
   */
  protected printOutput(output: string, useTypewriteAnimationOnOutput: boolean = true): Promise<void> {
    return new Promise<void>((outerResolve, outerReject) => {
      if (!output) {
        outerReject('Output was not defined. Make sure to have set the required responses in the game.');
      }

      if (useTypewriteAnimationOnOutput && this.UseTypewritingAnimation) {
        const outputLines = output.split('\r\n');
        // we create a promise chain, in order to avoid printing new lines written as '<br>'
        let outputPromise = new Promise<void>((resolve) => resolve());
        for (const singleLine of outputLines) {
          outputPromise = outputPromise.then(() => this.printLineAnimated(singleLine));
        }
        outputPromise = outputPromise.then(() => outerResolve());
      } else {
        output = output.split('\r\n').join('<br>');
        this.addOutput(output, TextInputType.Output);
        outerResolve();
      }
    });
  }

  protected printLineAnimated(line: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.addOutput('', TextInputType.Output);
      // exit the recursion with the "resolve" function of the promise
      this.typewriteOutput(0, line, this.OutputArray, resolve);
    });
  }

  protected typewriteOutput(i: number, output: string, outputArray: TextInput[], resolveFunction): void {
    if (i >= output.length) {
      resolveFunction();
      return;
    }
    const char = output.charAt(i);
    outputArray[outputArray.length - 1].Value += char;
    i++;
    setTimeout(() => {
      this.typewriteOutput(i, output, this.OutputArray, resolveFunction);
    }, this.TypewriterSpeed);
  }

  /**
   * Prints the screen as an input line.
   * @param input string to be printed as an input line
   */
  protected printInput(input: string): void {
    input = '&gt ' + input;
    this.addOutput(input, TextInputType.UserInput);
  }

  /**
   * Used to both add output and input to the OutputArray.
   * @param input 
   * @param type 
   */
  protected addOutput(input: string, type: TextInputType) {
    this.OutputArray.push(new TextInput(input, type, this.OutputLineId));
    this.OutputLineId++;
  }
}
