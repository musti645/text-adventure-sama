import { InGameItem } from './Item.model';

export class Inventory {
    private Items: InGameItem[];

    constructor(StartingInventory: InGameItem[] = []) {
        this.Items = StartingInventory;
    }

    public findItemsById(id: number): InGameItem[] {
        return this.Items.filter(o => o.ID === id);
    }

    public removeItemFromInventory(id: number): void {
        this.Items = this.Items.filter(o => o.ID !== id);
    }

    public getItemCount(): number {
        return this.Items.length;
    }

    public addItem(toAdd: InGameItem): void {
        this.Items.push(toAdd);
    }

}
