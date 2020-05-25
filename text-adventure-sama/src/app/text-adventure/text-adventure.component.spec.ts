import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAdventureComponent } from './text-adventure.component';

describe('TextAdventureComponent', () => {
  let component: TextAdventureComponent;
  let fixture: ComponentFixture<TextAdventureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAdventureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
