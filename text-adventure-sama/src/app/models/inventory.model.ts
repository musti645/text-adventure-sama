import { InGameItem } from './Item.model';
import { ItemEventService } from '../services/item-event.service';
import { IItemConsumingEventListener, ItemConsumingActionEvent } from '../models/events/item-consuming-action.event';
import { IItemRemovingEventListener, ItemRemovingActionEvent } from '../models/events/item-removing-action.event';
import { IItemYieldingEventListener, ItemYieldingActionEvent } from '../models/events/item-yielding-action.event';

export class Inventory implements IItemConsumingEventListener,
    IItemRemovingEventListener,
    IItemYieldingEventListener {
    private Items: InGameItem[];

    constructor() {
        this.Items = [];

        ItemEventService.getInstance().ItemYieldingActionEvent$.subscribe((event) => this.OnItemYield(event));
        ItemEventService.getInstance().ItemRemovingActionEvent$.subscribe((event) => this.OnItemRemove(event));
        ItemEventService.getInstance().ItemConsumingActionEvent$.subscribe((event) => this.OnItemConsume(event));
    }

    OnItemYield(event: ItemYieldingActionEvent) {
        if (event.ResetItemUsagesToMaximum) {
            event.Item.resetUsages();
        }

        for (let i = 0; i < event.AmountOfItems; i++) {
            // create a shallow copy of the item (ES6 only)
            this.addItem(Object.assign({}, event.Item));
        }
    }

    OnItemRemove(event: ItemRemovingActionEvent) {
        this.removeItemFromInventory(event.Item.getID());
    }

    OnItemConsume(event: ItemConsumingActionEvent) {
        const items = this.findItemsById(event.Item.getID());
        items[0].use();
    }

    public findItemsById(id: number): InGameItem[] {
        return this.Items.filter(o => o.getID() === id);
    }

    public findItemsByName(name: string): InGameItem[] {
        return this.Items.filter(o => o.getName() === name);
    }

    public removeItemFromInventory(id: number): void {
        this.Items = this.Items.filter(o => o.getID() !== id);
    }

    public getItemCount(): number {
        return this.Items.length;
    }

    public addItem(toAdd: InGameItem): void {
        toAdd.WasPickedUp = true;
        this.Items.push(toAdd);
    }

    public getItems(): InGameItem[] {
        return this.Items;
    }

}
