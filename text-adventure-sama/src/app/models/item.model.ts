/**
 * This class represents an Item in the game.
 */
export abstract class InGameItem {
    ID: number;
    Name: string;
    Description: string;
    MaximumUsages: number;

    UsagesLeft: number;

    constructor(id?: number) {
        this.ID = id;
    }

    public use(): void {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
        }
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
