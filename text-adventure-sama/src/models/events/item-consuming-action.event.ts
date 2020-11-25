import { InGameItem } from '../item.model';
import { ItemConsumingAction } from '../actions/item-consuming-action.model';

export class ItemConsumingActionEvent {
    Item: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;


    constructor(action: ItemConsumingAction){
        this.Item = action.getItem();
        this.Response = action.getResponse();
        this.ResponseAfterUse = action.getResponseAfterUse();
        this.WasTriggered = action.getWasTriggered();
    }
}


export interface IItemConsumingEventService {
    consumeItem(event: ItemConsumingActionEvent): void;
}


export interface IItemConsumingEventListener {
    OnItemConsume(event: ItemConsumingActionEvent): void;
}
