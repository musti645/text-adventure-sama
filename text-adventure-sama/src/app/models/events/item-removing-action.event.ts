import { InGameItem } from '../Item.model';
import { ItemRemovingAction } from '../actions/item-removing-action.model';

export class ItemRemovingActionEvent {
    ItemToRemove: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;

    constructor(action: ItemRemovingAction){
        this.ItemToRemove = action.ItemToRemove;
        this.ItemNotFoundResponse = action.ItemNotFoundResponse;
        this.Response = action.Response;
        this.ResponseAfterUse = action.ResponseAfterUse;
        this.WasTriggered = action.WasTriggered;
    }
}

export interface IItemRemovingEventService {
    removeItem(event: ItemRemovingActionEvent);
}

export interface IItemRemovingEventListener {
    OnItemRemove(event: ItemRemovingActionEvent);
}
