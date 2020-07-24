import { OneTimeAction } from './one-time-action.model';
import { InGameObject } from '../object.model';

/**
 * An ObjectRemovingAction is only triggered once and removes an object out of the players inventory without using it.
 * It can only be triggered, if the user has got the object in her inventory.
 */
export class ObjectRemovingAction extends OneTimeAction {
    ObjectToRemove: InGameObject;
    ObjectNotFoundResponse: string;

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();

        if (this.WasTriggered) {
            return this.Response;
        }

        if (!this.ObjectToRemove.isContainedInInventory()) {
            return this.ObjectNotFoundResponse;
        }

        this.ObjectToRemove.removeFromInventory();

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
