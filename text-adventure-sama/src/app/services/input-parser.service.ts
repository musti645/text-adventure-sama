import { Game } from '../models/game.model';

/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
export class InputParserService {
    Game: Game;

    constructor(game: Game) {
        this.Game = game;
    }

    public parseInput(input: string) {

    }

}
