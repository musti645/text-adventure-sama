import { InteractionType } from '../interactions/interaction-type.enum';
import { Action } from './action.model';

/**
 * A OneTimeAction is only triggered once
 * Each subsequent trigger returns the same response.
 */
export class OneTimeAction extends Action {
    private WasTriggered: boolean;
    private ResponseAfterUse: string;

    constructor() {
        super();
        this.setInteractionType(InteractionType.DO);
    }

    public trigger(): string {
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }

        this.WasTriggered = true;
        return this.getResponse();
    }

    public reset(): void {
        this.WasTriggered = false;
    }

    public getWasTriggered(): boolean {
        return this.WasTriggered;
    }

    public setWasTriggered(triggered: boolean): void {
        this.WasTriggered = triggered;
    }

    public getResponseAfterUse(): string {
        return this.ResponseAfterUse;
    }

    public setResponseAfterUse(response: string): void {
        this.ResponseAfterUse = response;
    }
}
