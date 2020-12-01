import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ParseInputResult } from 'src/models/other/parse-input-result.model';
import { Scene } from 'src/models/scene.model';
import { Game } from '../models/game.model';
import { InputParserService } from 'src/services/input-parser.service';

import { TextAdventureComponent } from './text-adventure.component';
import { IClassificationTrainer } from 'src/classification/interfaces/classification-trainer.interface';

describe('TextAdventureComponent', () => {
  let fixture: ComponentFixture<TextAdventureComponent>;
  let component: TextAdventureComponent;
  let mockInputParserService: Partial<MockInputParserService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TextAdventureComponent
      ],
      providers: [
        { provide: InputParserService, useClass: MockInputParserService }
      ]
    })
      .compileComponents();

      fixture = TestBed.createComponent(TextAdventureComponent);
      component = fixture.componentInstance;
      mockInputParserService = TestBed.inject(InputParserService);
  
      const game = new Game();
      game.setTitle('Title');
      game.setIntroduction('Intro');
  
      const scene = new Scene();
      scene.setName('sceneName');
      scene.setItemNotFoundResponse('item not found.');
      scene.setActionNotRecognizedResponse('action not recognized response');
      scene.setInvalidInputResponse('invalid input');
      scene.setDescription('description of the scene');
      game.getStage().addScene(scene);
  
      component.Game = game;
  });

  
  afterEach(() => {
    component.Game.getStage().unsubscribe();
    component.Game.getInventory().unsubscribe();
    mockInputParserService.getGame()?.getStage().unsubscribe();
    mockInputParserService.getGame()?.getInventory().unsubscribe();
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  // test input and output
  it('#OnSubmit should print the input', async() => {
    fixture.detectChanges();
    await fixture.whenStable();

    const input = 'some input';

    const userInputFormGroup = component.InputForm.get('userInput') as FormControl;
    userInputFormGroup.setValue(input);

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    const inputLine = fixture.nativeElement.querySelector('.input-line');
    expect(inputLine).toBeTruthy();
    expect(inputLine.innerText).toBe(input);
  });

  it('#OnSubmit should print the output', fakeAsync(() => {
    component.UseTypewritingAnimation = false;
    fixture.detectChanges();
    tick();

    const userInputFormGroup = component.InputForm.get('userInput') as FormControl;
    userInputFormGroup.setValue('some input');

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    tick();

    const result = mockInputParserService.parseInputResult;
    fixture.detectChanges();
    tick();

    const outputLine = fixture.nativeElement.querySelectorAll('.output-line');
    expect(outputLine).toBeTruthy();
    expect(outputLine[outputLine.length - 1].innerText).toBe(result.Result);
  }));


  it('#OnSubmit should print the output animated', fakeAsync(() => {
    // print out title and introduciton without animation
    component.UseTypewritingAnimation = false;
    fixture.detectChanges();
    tick();
    // wait for both Title and Introduction to be printed

    // make the line animated
    let result = new ParseInputResult('res', true, false);
    mockInputParserService.parseInputResult = result;
    component.UseTypewritingAnimation = true;

    const userInputFormGroup = component.InputForm.get('userInput') as FormControl;
    userInputFormGroup.setValue('some input');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    const timeoutLength = (result.Result.length + 1) * component.TypewriterSpeed + 1;
    tick(timeoutLength + 1);
    fixture.detectChanges();
    tick();
    const outputLine = fixture.nativeElement.querySelectorAll('.output-line');
    expect(outputLine).toBeTruthy();
    expect(outputLine[outputLine.length - 1].innerText).toBe(result.Result);
  }));

});

class MockInputParserService {
  public parseInputResult: ParseInputResult;
  public initializeResult: boolean;
  protected Game: Game;

  constructor() {
    this.initializeResult = true;
    this.parseInputResult = new ParseInputResult('result', false, false);
  }

  public initialize(trainer: IClassificationTrainer): Promise<boolean> {
    return new Promise<boolean>((resolve) => resolve(this.initializeResult));
  }

  public parseInput(input: string): ParseInputResult {
    return this.parseInputResult;
  }

  public setGame(game: Game): void {
    this.Game = game;
  }

  public getGame(): Game {
    return this.Game;
  }

}