import { Action } from './action.model';

/**
 * A MultiTimeAction can be activated multiple times.
 * The class allows you to pass an array of responses,
 * which will be returned one by one until the maximum usage count is reached.
 */
export class MultiTimeAction extends Action {
    UsagesLeft: number;
    MaximumUsages: number;
    Responses: string[];


    constructor() {
        super();
    }

    public trigger(): string {
        if (this.UsagesLeft <= this.MaximumUsages) {
            const responseString =  this.Responses[this.UsagesLeft];
            this.UsagesLeft++;
            return responseString;
        }

        return this.Response;
    }

    public reset() {
        this.UsagesLeft = 0;
    }
}
