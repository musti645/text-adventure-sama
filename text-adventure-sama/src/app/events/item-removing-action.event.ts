import { InGameItem } from '../models/Item.model';
import { ItemRemovingAction } from '../models/actions/item-removing-action.model';

export class ItemRemovingActionEvent {
    ItemToRemove: InGameItem;

    constructor(action: ItemRemovingAction){
        this.ItemToRemove = action.ItemToRemove;
    }
}

export interface IItemRemovingEventService {
    removeItem(event: ItemRemovingActionEvent);
}

export interface IItemRemovingEventListener {
    OnItemRemove(event: ItemRemovingActionEvent);
}
