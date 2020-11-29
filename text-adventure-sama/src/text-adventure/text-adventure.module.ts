import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextAdventureComponent } from './text-adventure.component';
import { InputParserService } from 'dist/text-adventure-sama/services/input-parser.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    TextAdventureComponent
  ],
  exports: [
    TextAdventureComponent
  ],
  providers: [
    InputParserService
  ]
})
export class TextAdventureModule { }
