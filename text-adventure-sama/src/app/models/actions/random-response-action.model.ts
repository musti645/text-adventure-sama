import { Action } from './action.model';

/**
 * RandomResponseAction allows the use of multiple Responses.
 * Each time this Action is triggered, the response will be selected randomly out of the passed array.
 */
export class RandomResponseAction extends Action {
    Responses: string[];

    constructor(id?: number) {
        super(id);
    }

    public trigger(): string {
        const rndm = Math.floor(Math.random() * this.Responses.length);
        return this.Responses[rndm];
    }

    public reset() {
    }
}
