import { Action } from './action.model';

/**
 * A MultiTimeAction can be activated multiple times.
 * The class allows you to pass an array of responses,
 * which will be returned one by one until the maximum usage count is reached.
 */
export class MultiTimeAction extends Action {
    UsageCount: number;
    MaximumUsages: number;
    Responses: string[];

    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();
        if (this.UsageCount <= this.MaximumUsages) {
            const responseString =  this.Responses[this.UsageCount];
            this.UsageCount++;
            return responseString;
        }

        return this.Response;
    }

    public reset() {
        this.UsageCount = 0;
    }
}
