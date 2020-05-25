import { Action } from './action.model';

export class MultiTimeAction extends Action {
    UsageCount: number;
    MaximumUsages: number;
    Responses: string[];

    constructor() {
        super();
    }

    public use(): string {
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
