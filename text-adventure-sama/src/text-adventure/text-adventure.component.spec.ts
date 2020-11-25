import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Game } from '../models/game.model';

import { TextAdventureComponent } from './text-adventure.component';

describe('TextAdventureComponent', () => {
  let component: TextAdventureComponent;
  let fixture: ComponentFixture<TextAdventureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAdventureComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAdventureComponent);
    component = fixture.componentInstance;
    component.Game = new Game();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
