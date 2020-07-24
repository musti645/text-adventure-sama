import { OneTimeAction } from './one-time-action.model';
import { InGameObject } from '../object.model';

/**
 * An ObjectYieldingAction is only triggered once and adds an object to the players inventory.
 */
export class ObjectYieldingAction extends OneTimeAction {
    ObjectToYield: InGameObject;
    AmountOfObjects: number;
    ObjectHasMaximumUsages: boolean;

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();
        if (this.WasTriggered) {
            return this.Response;
        }

        this.ObjectToYield.addToInventory(this.AmountOfObjects, this.ObjectHasMaximumUsages);

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
