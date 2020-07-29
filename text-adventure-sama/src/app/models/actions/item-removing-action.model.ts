import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
import { ItemRemovingActionEvent } from '../events/item-removing-action.event';
import { ItemEventService } from 'src/app/services/item-event.service';

/**
 * An ItemRemovingAction is only triggered once and removes an Item out of the players inventory without using it.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export class ItemRemovingAction extends OneTimeAction {
    ItemToRemove: InGameItem;

    constructor(id?: number) {
        super(id);
    }

    public trigger(): string {
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }

        ItemEventService.Instance.removeItem(new ItemRemovingActionEvent(this));

        this.WasTriggered = true;
        return this.Response;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
