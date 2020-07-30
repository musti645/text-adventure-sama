import { Inventory } from './inventory.model';
import { Stage } from './stage.model';

/**
 * Represents the Game.
 */
export class Game {
    Title: string;
    Stage: Stage;
    Inventory: Inventory;

    constructor() {
        this.Stage = new Stage();
        this.Inventory = new Inventory();
    }

    reset() {
        this.Stage.reset();
        this.Inventory.reset();
    }

}
