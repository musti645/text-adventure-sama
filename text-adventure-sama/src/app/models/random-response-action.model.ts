import { Action } from './action.model';

export class RandomResponseAction extends Action {
    Responses: string[];

    constructor() {
        super();
    }

    public use(): string {
        this.OnActionTriggeredEvent.emit();
        const rndm = Math.floor(Math.random() * this.Responses.length);
        return this.Responses[rndm];
    }

    public reset() {
    }
}
