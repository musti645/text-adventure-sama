import { Scene } from './scene.model';
import { InGameObject } from './object.model';

/**
 * Represents the Game.
 */
export class Game {
    Title: string;
    Scenes: Scene[];

    Inventory: InGameObject[];

    OnGatewayActionTriggeredEvent(sceneId: number){
    }

    OnObjectRemovedFromInventoryEvent(objectId: number){
        const index = this.Inventory.findIndex(o => o.ID === objectId);
        this.Inventory.splice(index, 1);
    }

    OnObjectAddedToInventoryEvent(objectToAdd: InGameObject){
        this.Inventory.push(objectToAdd);
    }
}
