import { Action } from './action.model';

/**
 * A OneTimeAction is only triggered once
 * Each subsequent trigger returns the same response.
 */
export class OneTimeAction extends Action {
    WasTriggered: boolean;
    ResponseAfterUse: string;

    constructor(id?: number) {
        super(id);
    }

    public trigger(): string {
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }

        this.WasTriggered = true;
        return this.Response;
    }

    public reset() {
        this.WasTriggered = false;
    }
}
