import { InGameItem } from './Item.model';
import { Inventory } from './inventory.model';
import { Stage } from './stage.model';
import { ItemEventService } from '../services/item-event.service';
import { SceneEventService } from '../services/scene-event.service';

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
