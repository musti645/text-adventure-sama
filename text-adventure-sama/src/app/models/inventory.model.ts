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

        ItemEventService.getInstance().ItemYieldingActionEvent$.subscribe(this.OnItemYield);
        ItemEventService.getInstance().ItemRemovingActionEvent$.subscribe(this.OnItemRemove);
        ItemEventService.getInstance().ItemConsumingActionEvent$.subscribe(this.OnItemConsume);
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
        this.removeItemFromInventory(event.Item.ID);
    }

    OnItemConsume(event: ItemConsumingActionEvent) {
        const items = this.findItemsById(event.Item.ID);
        items[0].use();
    }

    public findItemsById(id: number): InGameItem[] {
        return this.Items.filter(o => o.ID === id);
    }

    public findItemsByName(name: string): InGameItem[] {
        return this.Items.filter(o => o.Name === name);
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

    public reset(): void {
        this.Items = [];
    }

}
