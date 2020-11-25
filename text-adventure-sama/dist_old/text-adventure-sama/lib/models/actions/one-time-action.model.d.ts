import { Action } from './action.model';
/**
 * A OneTimeAction is only triggered once
 * Each subsequent trigger returns the same response.
 */
export declare class OneTimeAction extends Action {
    private WasTriggered;
    private ResponseAfterUse;
    constructor();
    trigger(): string;
    reset(): void;
    getWasTriggered(): boolean;
    setWasTriggered(triggered: boolean): void;
    getResponseAfterUse(): string;
    setResponseAfterUse(response: string): void;
}
