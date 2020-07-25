import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';

/**
 * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
 */
export class ItemYieldingAction extends OneTimeAction {
    ItemToYield: InGameItem;
    AmountOfItems: number;
    ItemHasMaximumUsages: boolean;

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();
        if (this.WasTriggered) {
            return this.Response;
        }

        this.ItemToYield.addToInventory(this.AmountOfItems, this.ItemHasMaximumUsages);

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
