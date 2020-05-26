import { EventEmitter } from '@angular/core';

/**
 * This class represents an Object in the game.
 */
export abstract class InGameObject {
    ID: number;
    Name: string;
    Amount: number;

    /**
     * Called when this Object is to be removed from the inventory
     */
    OnObjectRemovedFromInventoryEvent: EventEmitter<number>;

    /**
     * Called when this Object is added to the inventory.
     */
    OnObjectAddedToInventoryEvent: EventEmitter<InGameObject>;

    constructor() {
        this.OnObjectRemovedFromInventoryEvent = new EventEmitter<number>();
        this.OnObjectAddedToInventoryEvent = new EventEmitter<InGameObject>();
    }

    public use(): void {
        this.Amount--;
        if (this.Amount > 0){
            return;
        }
        this.OnObjectRemovedFromInventoryEvent.emit(this.ID);
    }

    public addToInventory(): void {
        this.OnObjectAddedToInventoryEvent.emit(this);
    }
}
