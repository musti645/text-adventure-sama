import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextInputType } from '../models/other/text-input.enum';
import { TextInput } from '../models/other/text-input.model';
import { Game } from '../models/game.model';
import { GameBuilder } from '../builder/game.builder';
import { InGameItem } from '../models/Item.model';
import { InputParserService } from '../services/input-parser.service';
import { ClassificationTrainer } from '../services/classification-trainer.service';

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
  IsLoading = false;

  Game: Game;
  GameBuilder: GameBuilder;

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

  constructor(private inputParserService: InputParserService) {
    inputParserService.initialize(new ClassificationTrainer());
  }

  ngOnInit() {
    this.startLoading();
    this.Game = this.buildGame();
    this.startGame();
    this.stopLoading();
  }

  OnSubmit() {
    this.startLoading();
    const inputString = this.userInput.value;
    if (inputString === '') {
      this.stopLoading();
      return;
    }
    this.printInput(inputString);
    this.userInput.setValue('');

    this.printOutput(this.inputParserService.parseInput(inputString));

    this.stopLoading();
  }

  OnReset() {
    this.buildGame();
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

  private startGame(){
    this.printOutput(this.Game.Title);
    this.printOutput(this.Game.Introduction);
  }

  private printOutput(output: string){
    this.OutputArray.push(new TextInput(output, TextInputType.Output));
  }

  private printInput(input: string){
    this.OutputArray.push(new TextInput(input, TextInputType.UserInput));
  }

  private buildGame(): Game {
    const builder = new GameBuilder()
    .setTitle('-- Test Adventure --')
    .setIntroduction('You\'ve lost track of where you are while hiking in the woods. Your battery is dead and it\'s going to get dark outside soon. You better find shelter for the night. \r\n'
    + 'While looking for signs of civilization, such as roads or lights, you come across a small hut...');

    builder.addScene(1)
      .setName('Shed in the Woods')
      .setDescription('A cozy looking shed surrounded by a lot of trees.')
      .setActionNotRecognizedResponse('Doing that in a forrest? You don\'t think so.')
      .setItemNotFoundResponse('There, beneath the leafs and sticks, you seem to have spotted something. As you get closer, you realize that it was a useless rock.')
        .addGatewayAction()
        .setTargetSceneId(2)
        .setTrigger('go inside')
        .setResponse('The door is not locked. You open it and walk inside.')
        .finish()
      .finish();

    builder.addScene(2)
      .setName('Inside of the Shed')
      .setDescription('Wooden floors, wooden doors, wooden walls. Everything seems to be made from the same wood. Probably the one surrounding this shed.')
      .setActionNotRecognizedResponse('You don\'t think, that this is an appropriate thing to do here.')
      .setItemNotFoundResponse('The place is too messy. You can\'t seem to find what you\'re looking for.')
      .addGatewayAction()
        .setTrigger('leave')
        .setResponse('You walk out the door through which you came in. You find yourself infront of the shed.')
        .setTargetSceneId(1)
        .finish()
      .addItemYieldingAction()
        .setAmountOfItems(1)
        .setResetItemUsagesToMaximum(true)
        .setResponse('You find a rusty key of some sorts on the ground.')
        .addItem()
          .setName('Key')
          .setDescription('A rusty key.')
          .setMaximumUsages(1)
          .setUsagesLeft(1)
          .finish()
        .finish()
      .finish();

    return builder.finish();
  }

}
