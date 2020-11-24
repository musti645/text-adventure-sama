import { InGameItem } from '../Item.model';
import { ItemRemovingAction } from '../actions/item-removing-action.model';

export class ItemRemovingActionEvent {
    Item: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;

    constructor(action: ItemRemovingAction){
        this.Item = action.getItem();
        this.Response = action.getResponse();
        this.ResponseAfterUse = action.getResponseAfterUse();
        this.WasTriggered = action.getWasTriggered();
    }
}

export interface IItemRemovingEventService {
    removeItem(event: ItemRemovingActionEvent): void;
}

export interface IItemRemovingEventListener {
    OnItemRemove(event: ItemRemovingActionEvent): void;
}
