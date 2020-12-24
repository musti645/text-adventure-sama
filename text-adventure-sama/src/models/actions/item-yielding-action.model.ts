import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../item.model';
import { ItemYieldingActionEvent } from '../events/item-yielding-action.event';
import { InteractionType } from '../interactions/interaction-type.enum';
import { ItemEventService } from '../../services/item-event.service';

/**
 * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
 * 
 * Use the corresponding builder to create this action.
 */
export class ItemYieldingAction extends OneTimeAction {
    private Item: InGameItem;
    private AmountOfItems: number;
    private ResetItemUsagesToMaximum: boolean;

    constructor() {
        super();
        this.AmountOfItems = 1;
        this.setInteractionType(InteractionType.USE);
    }

    public trigger(): string {
        // trigger addition of item to inventory
        if (this.getWasTriggered()) {
            return this.getResponseAfterUse();
        }

        ItemEventService.getInstance().yieldItem(new ItemYieldingActionEvent(this));

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

    public setAmountOfItems(amount: number): void {
        this.AmountOfItems = amount;
    }

    public getAmountOfItems(): number {
        return this.AmountOfItems;
    }

    public getResetItemUsagesToMaximum(): boolean {
        return this.ResetItemUsagesToMaximum;
    }

    public setResetItemUsagesToMaximum(reset: boolean): void {
        this.ResetItemUsagesToMaximum = reset;
    }
}
