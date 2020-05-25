import { Action } from './action.model';

export class OneTimeAction extends Action {
    WasTriggered: boolean;
    ResponseAfterUse: string;

    constructor() {
        super();
    }

    public use(): string {
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
