import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';

/**
 * An ItemConsumingAction is only triggered once and uses an Item (once) in the players inventory.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export class ItemConsumingAction extends OneTimeAction {
    ItemToConsume: InGameItem;
    ItemNotFoundResponse: string;

    constructor(id: number) {
        super(id);
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();

        if (this.WasTriggered) {
            return this.Response;
        }

        if (!this.ItemToConsume.isContainedInInventory()) {
            return this.ItemNotFoundResponse;
        }

        this.ItemToConsume.use();

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
