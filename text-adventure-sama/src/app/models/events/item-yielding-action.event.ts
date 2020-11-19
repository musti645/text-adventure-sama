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
        this.Item = action.getItem();
        this.Response = action.getResponse();
        this.ResponseAfterUse = action.getResponseAfterUse();
        this.WasTriggered = action.getWasTriggered();
        this.AmountOfItems = action.getAmountOfItems();
        this.ResetItemUsagesToMaximum = action.getResetItemUsagesToMaximum();
    }
}


export interface IItemYieldingEventService {
    yieldItem(event: ItemYieldingActionEvent): void;
}

export interface IItemYieldingEventListener {
    OnItemYield(event: ItemYieldingActionEvent): void;
}
