import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextAdventureModule } from 'text-adventure-sama';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TextAdventureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
