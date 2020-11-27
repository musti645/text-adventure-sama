import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Scene } from 'src/models/scene.model';
import { Game } from '../models/game.model';

import { TextAdventureComponent } from './text-adventure.component';

describe('TextAdventureComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TextAdventureComponent,
        TestHostComponent
      ],
    })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});

@Component({
  selector: 'tas-test-host-component',
  template: '<tas-text-adventure [Game]="Game"></tas-text-adventure>'
})
class TestHostComponent {
  Game: Game;

  @ViewChild(TextAdventureComponent)
  public textAdventureComponent: TextAdventureComponent;

  constructor() {
    const game = new Game();
    game.setTitle('Title');
    game.setIntroduction('Introduction');

    const scene = new Scene();
    scene.setName('sceneName');
    scene.setItemNotFoundResponse('item not found.');
    scene.setActionNotRecognizedResponse('action not recognized response');
    scene.setInvalidInputResponse('invalid input');
    scene.setDescription('description of the scene');
    game.getStage().addScene(scene);

    this.Game = game;
  }
}
