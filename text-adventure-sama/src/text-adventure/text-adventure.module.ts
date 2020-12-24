import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextAdventureComponent } from './text-adventure.component';
import { InputParserService } from '../services/input-parser.service';

/**
 * Import this module to add a text adventure to one of your components/routes.
 */
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
