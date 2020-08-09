import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
import { ItemConsumingActionEvent } from '../events/item-consuming-action.event';
import { ItemEventService } from 'src/app/services/item-event.service';
import { InteractionType } from '../interactions/interaction-type.enum';

/**
 * An ItemConsumingAction is only triggered once and uses an Item (once) in the players inventory.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export class ItemConsumingAction extends OneTimeAction {
    Item: InGameItem;

    constructor() {
        super();
        this.InteractionType = InteractionType.USE;
    }

    public trigger(): string {
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }

        ItemEventService.getInstance().consumeItem(new ItemConsumingActionEvent(this));

        this.WasTriggered = true;
        return this.Response;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
