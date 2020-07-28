import { InGameItem } from './Item.model';
import { ItemEventService } from '../services/item-event.service';
import { IItemConsumingEventListener, ItemConsumingActionEvent } from '../events/item-consuming-action.event';
import { IItemRemovingEventListener, ItemRemovingActionEvent } from '../events/item-removing-action.event';
import { IItemYieldingEventListener, ItemYieldingActionEvent } from '../events/item-yielding-action.event';

export class Inventory implements IItemConsumingEventListener,
    IItemRemovingEventListener,
    IItemYieldingEventListener {
    private Items: InGameItem[];

    constructor(private itemEventService: ItemEventService) {
        this.Items = [];

        itemEventService.ItemYieldingActionEvent$.subscribe(this.OnItemYield);
        itemEventService.ItemRemovingActionEvent$.subscribe(this.OnItemRemove);
        itemEventService.ItemConsumingActionEvent$.subscribe(this.OnItemConsume);
    }

    OnItemYield(event: ItemYieldingActionEvent) {
        if (event.ResetItemUsagesToMaximum) {
            event.ItemToYield.resetUsages();
        }

        for (let i = 0; i < event.AmountOfItems; i++) {
            // create a shallow copy of the item (ES6 only)
            this.addItem(Object.assign({}, event.ItemToYield));
        }
    }

    OnItemRemove(event: ItemRemovingActionEvent) {
        this.removeItemFromInventory(event.ItemToRemove.ID);
    }

    OnItemConsume(event: ItemConsumingActionEvent) {
        const items = this.findItemsById(event.ItemToConsume.ID);
        items[0].use();
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

    public reset(): void {
        this.Items = [];
    }

}
