import { Action } from './action.model';

/**
 * A OneTimeAction is only triggered once
 * Each subsequent trigger returns the same response.
 */
export class OneTimeAction extends Action {
    WasTriggered: boolean;
    ResponseAfterUse: string;

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();
        if (this.WasTriggered) {
            return this.Response;
        }

        this.WasTriggered = true;
        return this.ResponseAfterUse;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
