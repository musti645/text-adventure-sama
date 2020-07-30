import { InGameItem } from '../Item.model';
import { ItemConsumingAction } from '../actions/item-consuming-action.model';

export class ItemConsumingActionEvent {
    Item: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;


    constructor(action: ItemConsumingAction){
        this.Item = action.Item;
        this.Response = action.Response;
        this.ResponseAfterUse = action.ResponseAfterUse;
        this.WasTriggered = action.WasTriggered;
    }
}


export interface IItemConsumingEventService {
    consumeItem(event: ItemConsumingActionEvent);
}


export interface IItemConsumingEventListener {
    OnItemConsume(event: ItemConsumingActionEvent);
}
