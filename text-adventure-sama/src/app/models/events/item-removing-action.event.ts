import { InGameItem } from '../Item.model';
import { ItemRemovingAction } from '../actions/item-removing-action.model';

export class ItemRemovingActionEvent {
    Item: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;

    constructor(action: ItemRemovingAction){
        this.Item = action.Item;
        this.Response = action.Response;
        this.ResponseAfterUse = action.ResponseAfterUse;
        this.WasTriggered = action.WasTriggered;
    }
}

export interface IItemRemovingEventService {
    removeItem(event: ItemRemovingActionEvent): void;
}

export interface IItemRemovingEventListener {
    OnItemRemove(event: ItemRemovingActionEvent): void;
}
