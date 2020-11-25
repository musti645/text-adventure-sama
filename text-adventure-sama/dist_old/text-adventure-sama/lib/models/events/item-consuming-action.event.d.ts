import { InGameItem } from '../Item.model';
import { ItemConsumingAction } from '../actions/item-consuming-action.model';
export declare class ItemConsumingActionEvent {
    Item: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;
    constructor(action: ItemConsumingAction);
}
export interface IItemConsumingEventService {
    consumeItem(event: ItemConsumingActionEvent): void;
}
export interface IItemConsumingEventListener {
    OnItemConsume(event: ItemConsumingActionEvent): void;
}
