import { Action } from './action.model';
/**
 * RandomResponseAction allows the use of multiple Responses.
 * Each time this Action is triggered, the response will be selected randomly out of the passed array.
 */
export declare class RandomResponseAction extends Action {
    private Responses;
    constructor();
    trigger(): string;
    reset(): void;
    getResponses(): string[];
    setResponses(responses: string[]): void;
}
