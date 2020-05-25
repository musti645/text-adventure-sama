import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextInputType } from '../models/text-input.enum';
import { TextInput } from '../models/text-input.model';

@Component({
  selector: 'tas-text-adventure',
  templateUrl: './text-adventure.component.html',
  styleUrls: ['./text-adventure.component.scss']
})
export class TextAdventureComponent implements OnInit {
  @ViewChild('input', {static: true}) inputElement: ElementRef;

  OutputArray: TextInput[] = [];
  IsLoading: boolean;

  InputForm: FormGroup = new FormGroup(
    {
      userInput: new FormControl(
        {
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

}
