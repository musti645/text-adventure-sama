import { InGameItem } from '../Item.model';
import { ItemYieldingAction } from '../actions/item-yielding-action.model';

export class ItemYieldingActionEvent {
    Item: InGameItem;
    AmountOfItems: number;
    ResetItemUsagesToMaximum: boolean;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;

    constructor(action: ItemYieldingAction){
        this.Item = action.Item;
        this.AmountOfItems = action.AmountOfItems;
        this.ResetItemUsagesToMaximum = action.ResetItemUsagesToMaximum;
        this.Response = action.Response;
        this.ResponseAfterUse = action.ResponseAfterUse;
        this.WasTriggered = action.WasTriggered;
    }
}


export interface IItemYieldingEventService {
    yieldItem(event: ItemYieldingActionEvent): void;
}

export interface IItemYieldingEventListener {
    OnItemYield(event: ItemYieldingActionEvent): void;
}
