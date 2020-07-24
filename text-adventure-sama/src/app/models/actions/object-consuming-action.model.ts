import { OneTimeAction } from './one-time-action.model';
import { InGameObject } from '../object.model';

/**
 * An ObjectConsumingAction is only triggered once and uses an object (once) in the players inventory.
 * It can only be triggered, if the user has got the object in her inventory.
 */
export class ObjectConsumingAction extends OneTimeAction {
    ObjectToConsume: InGameObject;
    ObjectNotFoundResponse: string;

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();

        if (this.WasTriggered) {
            return this.Response;
        }

        if (!this.ObjectToConsume.isContainedInInventory()) {
            return this.ObjectNotFoundResponse;
        }

        this.ObjectToConsume.use();

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
