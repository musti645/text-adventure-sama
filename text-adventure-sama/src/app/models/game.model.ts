import { Scene } from './scene.model';
import { InGameItem } from './Item.model';
import { Inventory } from './inventory.model';

/**
 * Represents the Game.
 */
export class Game {
    Title: string;
    Scenes: Scene[];
    Inventory: Inventory;

    constructor() {
        this.Scenes = [];
    }

    OnGatewayActionTriggeredEvent(sceneId: number) {
    }

    OnItemRemovedFromInventoryEvent(ItemId: number) {
        this.Inventory.removeItemFromInventory(ItemId);
    }

    OnItemAddedToInventoryEvent(ItemToAdd: InGameItem) {
        this.Inventory.addItem(ItemToAdd);
    }
}
