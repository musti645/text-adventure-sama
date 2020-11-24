import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
import { ItemRemovingActionEvent } from '../events/item-removing-action.event';
import { InteractionType } from '../interactions/interaction-type.enum';
import { ItemEventService } from '../../services/item-event.service';

/**
 * An ItemRemovingAction is only triggered once and removes an Item out of the players inventory without using it.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export class ItemRemovingAction extends OneTimeAction {
    private Item: InGameItem;

    constructor() {
        super();
        this.setInteractionType(InteractionType.USE);
    }

    public trigger(): string {
        if (this.getWasTriggered()) {
            return this.getResponseAfterUse();
        }

        ItemEventService.getInstance().removeItem(new ItemRemovingActionEvent(this));

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
