import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TextAdventureModule } from './text-adventure/text-adventure.module';
import { ItemEventService } from './services/item-event.service';
import { SceneEventService } from './services/scene-event.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextAdventureModule
  ],
  providers: [
    ItemEventService,
    SceneEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
