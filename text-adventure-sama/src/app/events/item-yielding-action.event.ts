import { InGameItem } from '../models/Item.model';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';

export class ItemYieldingActionEvent {
    ItemToYield: InGameItem;
    AmountOfItems: number;
    ResetItemUsagesToMaximum: boolean;

    constructor(action: ItemYieldingAction){
        this.ItemToYield = action.ItemToYield;
        this.AmountOfItems = action.AmountOfItems;
        this.ResetItemUsagesToMaximum = action.ResetItemUsagesToMaximum;
    }
}


export interface IItemYieldingEventService {
    yieldItem(event: ItemYieldingActionEvent);
}

export interface IItemYieldingEventListener {
    OnItemYield(event: ItemYieldingActionEvent);
}
