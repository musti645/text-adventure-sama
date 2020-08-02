import { Game } from '../models/game.model';
import { Injectable } from '@angular/core';

/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
@Injectable({
    providedIn: 'root'
  })
export class InputParserService {
    Game: Game;

    constructor() {
    }

    setGame(game: Game){
        this.Game = game;
    }

    public parseInput(input: string) {

    }

}
