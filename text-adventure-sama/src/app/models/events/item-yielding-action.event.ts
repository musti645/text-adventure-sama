import { InGameItem } from '../Item.model';
import { ItemYieldingAction } from '../actions/item-yielding-action.model';

export class ItemYieldingActionEvent {
    ItemToYield: InGameItem;
    AmountOfItems: number;
    ResetItemUsagesToMaximum: boolean;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;

    constructor(action: ItemYieldingAction){
        this.ItemToYield = action.ItemToYield;
        this.AmountOfItems = action.AmountOfItems;
        this.ResetItemUsagesToMaximum = action.ResetItemUsagesToMaximum;
        this.Response = action.Response;
        this.ResponseAfterUse = action.ResponseAfterUse;
        this.WasTriggered = action.WasTriggered;
    }
}


export interface IItemYieldingEventService {
    yieldItem(event: ItemYieldingActionEvent);
}

export interface IItemYieldingEventListener {
    OnItemYield(event: ItemYieldingActionEvent);
}
