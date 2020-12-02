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
import { parse } from 'path';

/**
 * Main Component, that contains the input and output of the game.
 */
@Component({
  selector: 'tas-text-adventure',
  templateUrl: './text-adventure.component.html',
  styleUrls: ['./text-adventure.component.scss']
})
export class TextAdventureComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('input', { static: true }) inputElement: ElementRef;
  @Input() UseTypewritingAnimation = true;
  @Input() TypewriterSpeed = 40;

  @Input() Game: Game;

  @Input() ClassificationTrainer: IClassificationTrainer;

  @Output() OnGameInitStartEvent: EventEmitter<GameInitStartEvent> = new EventEmitter<GameInitStartEvent>();
  @Output() OnGameStartEvent: EventEmitter<GameStartEvent> = new EventEmitter<GameStartEvent>();
  @Output() OnGameResetEvent: EventEmitter<GameResetEvent> = new EventEmitter<GameResetEvent>();
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

  // other
  private IsGameInitialized: boolean;

  constructor(private inputParserService: InputParserService) {
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
      
      if(parseResult.IsEndGameResult){
        this.endGame();
        return;
      }

      if(parseResult.IsResetGameResult){
        this.resetGame();
        return;
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

  private initGame(): void {
    this.OnGameInitStart();

    let classificationTrainer;

    if (!this.ClassificationTrainer) {
      classificationTrainer = new ClassificationTrainer();
    }
    else {
      classificationTrainer = this.ClassificationTrainer;
    }

    this.IsGameInitialized = true;

    this.inputParserService.initialize(classificationTrainer).then(() => {
      this.startGame();
    });
  }

  private startGame(): void {
    this.inputParserService.setGame(this.Game);
    this.printOutput(this.Game.getTitle())
      .then(() => this.printOutput(this.Game.getIntroduction()))
      .then(() => this.stopLoading())
      .then(() => this.OnGameStart());
  }

  private resetGame(): void {
    this.OnGameReset();
  }

  private endGame(): void {
    this.OnGameEnd();
  }

  private get userInput(): FormControl {
    return this.InputForm.get('userInput') as FormControl;
  }

  private startLoading(): void {
    this.IsLoading = true;
    this.userInput.disable();
  }

  private stopLoading(): void {
    this.IsLoading = false;
    this.userInput.enable();
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  private printOutput(output: string, useTypewriteAnimationOnOutput: boolean = true): Promise<void> {
    return new Promise<void>((outerResolve, outerReject) => {
      if (!output) {
        outerReject('Output was not defined. Make sure to have set the required responses in the game.');
      }

      if (useTypewriteAnimationOnOutput && this.UseTypewritingAnimation) {
        const outputLines = output.split('\r\n');
        // we create a promise chain, in order to avoid printing new lines written as '<br>'
        let outputPromise = new Promise((resolve) => resolve());
        for (const singleLine of outputLines) {
          outputPromise = outputPromise.then(() => this.printLineAnimated(singleLine));
        }
        outputPromise = outputPromise.then(() => outerResolve());
      } else {
        output = output.split('\r\n').join('<br>');
        this.OutputArray.push(new TextInput(output, TextInputType.Output));
        outerResolve();
      }
    });
  }

  private printLineAnimated(line: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.OutputArray.push(new TextInput('', TextInputType.Output));
      // exit the recursion with the "resolve" function of the promise
      this.typewriteOutput(0, line, this.OutputArray, resolve);
    });
  }

  private typewriteOutput(i: number, output: string, outputArray: TextInput[], resolveFunction): void {
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

  private printInput(input: string): void {
    this.OutputArray.push(new TextInput(input, TextInputType.UserInput));
  }
}
