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

    constructor(itemEventService: ItemEventService,
                sceneEventService: SceneEventService) {
        this.Stage = new Stage(sceneEventService);
        this.Inventory = new Inventory(itemEventService);
    }

    reset() {
        this.Stage.reset();
        this.Inventory.reset();
    }

}
