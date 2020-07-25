import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextInputType } from '../models/other/text-input.enum';
import { TextInput } from '../models/other/text-input.model';
import { Game } from '../models/game.model';
import { GameBuilder } from '../builder/game.builder';
import { Builder } from 'protractor';
import { GatewayAction } from '../models/actions/gateway-action.model';

/**
 * Main Component, that contains the input and output of the game.
 */
@Component({
  selector: 'tas-text-adventure',
  templateUrl: './text-adventure.component.html',
  styleUrls: ['./text-adventure.component.scss']
})
export class TextAdventureComponent implements OnInit {
  @ViewChild('input', { static: true }) inputElement: ElementRef;

  OutputArray: TextInput[] = [];
  IsLoading: boolean;

  Game: Game;

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

  constructor() {
  }

  ngOnInit() {
    this.startLoading();
    this.Game = this.buildGame();
  }

  OnSubmit() {
    this.startLoading();
    const inputString = this.userInput.value;
    if (inputString === '') {
      this.stopLoading();
      return;
    }
    this.OutputArray.push(new TextInput(inputString, TextInputType.UserInput));
    this.userInput.setValue('');
    // todo: parse inputString
    this.stopLoading();
  }

  get userInput() {
    return this.InputForm.get('userInput') as FormControl;
  }

  private startLoading() {
    this.IsLoading = true;
    this.userInput.disable();
  }

  private stopLoading() {
    this.IsLoading = false;
    this.userInput.enable();
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  private buildGame(): Game {
    const builder = new GameBuilder();

    builder.addScene(1)
      .setName('Shed in the Woods')
      .setDescription('A cozy looking shed surrounded by a lot of trees.')
      .addAction<GatewayAction>(new GatewayAction(1, 2))
        .setTrigger('go inside')
        .setResponse('The door is not locked. You open it and go inside.')
        .finish()
      .finish();

    builder.addScene(2)
      .setName('Inside of the Shed')
      .setDescription('Wooden floors, wooden doors, wooden walls. Everything seems to be made from the same wood. Probably the one surrounding this shed.')
      .addAction<GatewayAction>(new GatewayAction(2, 1))
        .setTrigger('go outside')
        .setResponse('You walk out the door through which you came in. You find yourself infront of the shed.')
        .finish()
      .finish();

    return builder.finish();
  }

}
