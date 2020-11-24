import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextAdventureComponent } from './text-adventure.component';

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
})
export class TextAdventureModule { }
