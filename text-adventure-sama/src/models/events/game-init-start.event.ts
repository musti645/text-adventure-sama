import { Game } from '../game.model';

/**
 * Signals the game`s start of initialization
 */
export class GameInitStartEvent {
    constructor(game: Game) {
    }
}