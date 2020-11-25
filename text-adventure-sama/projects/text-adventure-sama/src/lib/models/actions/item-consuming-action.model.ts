import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../item.model';
import { ItemConsumingActionEvent } from '../events/item-consuming-action.event';
import { InteractionType } from '../interactions/interaction-type.enum';
import { ItemEventService } from '../../services/item-event.service';

/**
 * An ItemConsumingAction is only triggered once and uses an Item (once) in the players inventory.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export class ItemConsumingAction extends OneTimeAction {
    private Item: InGameItem;

    constructor() {
        super();
        this.setInteractionType(InteractionType.USE);
    }

    public trigger(): string {
        if (this.getWasTriggered()) {
            return this.getResponseAfterUse();
        }

        ItemEventService.getInstance().consumeItem(new ItemConsumingActionEvent(this));

        this.setWasTriggered(true);
        return this.getResponse();
    }

    public reset(): void {
        this.setWasTriggered(false);
    }

    public getItem(): InGameItem {
        return this.Item;
    }

    public setItem(item: InGameItem): void {
        this.Item = item;
    }
}
