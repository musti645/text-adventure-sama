import { Action } from './action.model';
/**
 * A MultiTimeAction can be activated multiple times.
 * The class allows you to pass an array of responses,
 * which will be returned one by one until the maximum usage count is reached.
 */
export declare class MultiTimeAction extends Action {
    private UsagesLeft;
    private MaximumUsages;
    private Responses;
    constructor();
    trigger(): string;
    reset(): void;
    getUsagesLeft(): number;
    setUsagesLeft(usages: number): void;
    getMaximumUsages(): number;
    setMaximumUsages(usages: number): void;
    getResponses(): string[];
    setResponses(responses: string[]): void;
}
