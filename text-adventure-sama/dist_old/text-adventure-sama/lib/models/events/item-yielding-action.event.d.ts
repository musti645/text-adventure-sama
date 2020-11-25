import { InGameItem } from '../Item.model';
import { ItemYieldingAction } from '../actions/item-yielding-action.model';
export declare class ItemYieldingActionEvent {
    Item: InGameItem;
    AmountOfItems: number;
    ResetItemUsagesToMaximum: boolean;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;
    constructor(action: ItemYieldingAction);
}
export interface IItemYieldingEventService {
    yieldItem(event: ItemYieldingActionEvent): void;
}
export interface IItemYieldingEventListener {
    OnItemYield(event: ItemYieldingActionEvent): void;
}
