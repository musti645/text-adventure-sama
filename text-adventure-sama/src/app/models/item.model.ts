import { InteractionType } from './interactions/interaction-type.enum';

/**
 * This class represents an Item in the game.
 */
export class InGameItem {
    ID: number;
    Name: string;
    Description: string;
    MaximumUsages: number;

    UsagesLeft: number;

    ItemUsedResponse: string;
    NoUsagesLeftResponse: string;

    /**
     * There are different ways to interact with different items, therefore we need the interaction type
     * For example: 'open door' instead of 'use door'
     */
    InteractionType: InteractionType;

    constructor(id?: number) {
        this.ID = id;
    }

    public use(): string {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
            return this.ItemUsedResponse;
        }
        return this.NoUsagesLeftResponse;
    }

    public resetUsages(): void {
        this.UsagesLeft = this.MaximumUsages;
    }

    public setID(id: number): void {
        this.ID = id;
    }

    public getID(): number {
        return this.ID;
    }
}
