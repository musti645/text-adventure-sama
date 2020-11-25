import { InGameItem } from './Item.model';
import { IItemConsumingEventListener, ItemConsumingActionEvent } from '../models/events/item-consuming-action.event';
import { IItemRemovingEventListener, ItemRemovingActionEvent } from '../models/events/item-removing-action.event';
import { IItemYieldingEventListener, ItemYieldingActionEvent } from '../models/events/item-yielding-action.event';
export declare class Inventory implements IItemConsumingEventListener, IItemRemovingEventListener, IItemYieldingEventListener {
    private Items;
    constructor();
    OnItemYield(event: ItemYieldingActionEvent): void;
    OnItemRemove(event: ItemRemovingActionEvent): void;
    OnItemConsume(event: ItemConsumingActionEvent): void;
    findItemsById(id: number): InGameItem[];
    findItemsByName(name: string): InGameItem[];
    removeItemFromInventory(id: number): void;
    getItemCount(): number;
    addItem(toAdd: InGameItem): void;
    getItems(): InGameItem[];
}
