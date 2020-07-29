import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
import { ItemYieldingActionEvent } from '../events/item-yielding-action.event';
import { ItemEventService } from 'src/app/services/item-event.service';

/**
 * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
 */
export class ItemYieldingAction extends OneTimeAction {
    ItemToYield: InGameItem;
    AmountOfItems: number;
    ResetItemUsagesToMaximum: boolean;

    constructor(id?: number) {
        super(id);
    }

    public trigger(): string {
        // trigger addition of item to inventory
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }

        ItemEventService.Instance.yieldItem(new ItemYieldingActionEvent(this));

        this.WasTriggered = true;
        return this.Response;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
