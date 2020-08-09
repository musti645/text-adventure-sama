import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
import { ItemYieldingActionEvent } from '../events/item-yielding-action.event';
import { ItemEventService } from 'src/app/services/item-event.service';
import { InteractionType } from '../interactions/interaction-type.enum';

/**
 * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
 */
export class ItemYieldingAction extends OneTimeAction {
    Item: InGameItem;
    AmountOfItems: number;
    ResetItemUsagesToMaximum: boolean;

    constructor() {
        super();
        this.InteractionType = InteractionType.PICK_UP;
    }

    public trigger(): string {
        // trigger addition of item to inventory
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }

        ItemEventService.getInstance().yieldItem(new ItemYieldingActionEvent(this));

        this.WasTriggered = true;
        return this.Response;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
