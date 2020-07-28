import { InGameItem } from '../models/Item.model';
import { ItemConsumingAction } from '../models/actions/item-consuming-action.model';

export class ItemConsumingActionEvent {
    ItemToConsume: InGameItem;

    constructor(action: ItemConsumingAction){
        this.ItemToConsume = action.ItemToConsume;
    }
}


export interface IItemConsumingEventService {
    consumeItem(event: ItemConsumingActionEvent);
}


export interface IItemConsumingEventListener {
    OnItemConsume(event: ItemConsumingActionEvent);
}
