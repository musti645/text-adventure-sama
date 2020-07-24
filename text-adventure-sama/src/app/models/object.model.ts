import { EventEmitter } from '@angular/core';

/**
 * This class represents an Object in the game.
 */
export abstract class InGameObject {
    ID: number;
    Name: string;
    MaximumUsages: number;

    UsagesLeft: number;

    /**
     * Called when this Object is to be removed from the inventory
     */
    OnObjectRemovedFromInventoryEvent: EventEmitter<InGameObject>;

    /**
     * Called when this Object is added to the inventory.
     */
    OnObjectAddedToInventoryEvent: EventEmitter<InGameObject>;

    constructor() {
        this.OnObjectRemovedFromInventoryEvent = new EventEmitter<InGameObject>();
        this.OnObjectAddedToInventoryEvent = new EventEmitter<InGameObject>();

    }

    public use(): void {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
            return;
        }

        this.OnObjectRemovedFromInventoryEvent.emit(this);
    }

    public resetUsages(): void {
        this.UsagesLeft = this.MaximumUsages;
    }

    public addToInventory(amountOfObjects: number = 1, resetUsages: boolean = true): void {
        if (resetUsages) {
            this.resetUsages();
        }

        for (let i = 0; i < amountOfObjects; i++) {
            this.OnObjectAddedToInventoryEvent.emit(this);
        }
    }

    public removeFromInventory(amountOfObjects: number = 1) {
        for (let i = 0; i < amountOfObjects; i++) {
            this.OnObjectRemovedFromInventoryEvent.emit(this);
        }
    }

    public isContainedInInventory(): boolean {
        return true;
    }
}
