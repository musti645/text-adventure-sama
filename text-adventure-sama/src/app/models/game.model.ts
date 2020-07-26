import { Scene } from './scene.model';
import { InGameItem } from './Item.model';
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
    }

    OnGatewayActionTriggeredEvent(sceneId: number) {
        this.Stage.goToScene(sceneId);
    }

    OnItemRemovedFromInventoryEvent(ItemId: number) {
        this.Inventory.removeItemFromInventory(ItemId);
    }

    OnItemAddedToInventoryEvent(ItemToAdd: InGameItem) {
        this.Inventory.addItem(ItemToAdd);
    }
}
