import { InGameItem } from '../Item.model';
import { ItemRemovingAction } from '../actions/item-removing-action.model';
export declare class ItemRemovingActionEvent {
    Item: InGameItem;
    ItemNotFoundResponse: string;
    Response: string;
    ResponseAfterUse: string;
    WasTriggered: boolean;
    constructor(action: ItemRemovingAction);
}
export interface IItemRemovingEventService {
    removeItem(event: ItemRemovingActionEvent): void;
}
export interface IItemRemovingEventListener {
    OnItemRemove(event: ItemRemovingActionEvent): void;
}
