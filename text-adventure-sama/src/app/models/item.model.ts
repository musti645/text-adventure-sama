import { EventEmitter } from '@angular/core';

/**
 * This class represents an Item in the game.
 */
export abstract class InGameItem {
    ID: number;
    Name: string;
    Description: string;
    MaximumUsages: number;

    UsagesLeft: number;

    /**
     * Called when this Item is to be removed from the inventory
     */
    OnItemRemovedFromInventoryEvent: EventEmitter<InGameItem>;

    /**
     * Called when this Item is added to the inventory.
     */
    OnItemAddedToInventoryEvent: EventEmitter<InGameItem>;

    constructor() {
        this.OnItemRemovedFromInventoryEvent = new EventEmitter<InGameItem>();
        this.OnItemAddedToInventoryEvent = new EventEmitter<InGameItem>();

    }

    public use(): void {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
            return;
        }

        this.OnItemRemovedFromInventoryEvent.emit(this);
    }

    public resetUsages(): void {
        this.UsagesLeft = this.MaximumUsages;
    }

    public addToInventory(amountOfItems: number = 1, resetUsages: boolean = true): void {
        if (resetUsages) {
            this.resetUsages();
        }

        for (let i = 0; i < amountOfItems; i++) {
            this.OnItemAddedToInventoryEvent.emit(this);
        }
    }

    public removeFromInventory(amountOfItems: number = 1) {
        for (let i = 0; i < amountOfItems; i++) {
            this.OnItemRemovedFromInventoryEvent.emit(this);
        }
    }

    public isContainedInInventory(): boolean {
        return true;
    }
}
