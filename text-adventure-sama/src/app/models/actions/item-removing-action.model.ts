import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';

/**
 * An ItemRemovingAction is only triggered once and removes an Item out of the players inventory without using it.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export class ItemRemovingAction extends OneTimeAction {
    ItemToRemove: InGameItem;
    ItemNotFoundResponse: string;

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();

        if (this.WasTriggered) {
            return this.Response;
        }

        if (!this.ItemToRemove.isContainedInInventory()) {
            return this.ItemNotFoundResponse;
        }

        this.ItemToRemove.removeFromInventory();

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
