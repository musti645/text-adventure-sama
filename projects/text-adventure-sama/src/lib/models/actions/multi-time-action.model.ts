import { InteractionType } from '../interactions/interaction-type.enum';
import { Action } from './action.model';

/**
 * A MultiTimeAction can be activated multiple times.
 * The class allows you to pass an array of responses,
 * which will be returned one by one until the maximum usage count is reached.
 */
export class MultiTimeAction extends Action {
    private UsagesLeft: number;
    private MaximumUsages: number;
    private Responses: string[];


    constructor() {
        super();
        this.setInteractionType(InteractionType.DO);
    }

    public trigger(): string {
        if (this.UsagesLeft <= this.MaximumUsages) {
            const responseString =  this.Responses[this.UsagesLeft];
            this.UsagesLeft++;
            return responseString;
        }

        return this.getResponse();
    }

    public reset(): void {
        this.UsagesLeft = 0;
    }

    public getUsagesLeft(): number {
        return this.UsagesLeft;
    }

    public setUsagesLeft(usages: number): void {
        this.UsagesLeft = usages;
    }

    public getMaximumUsages(): number {
        return this.MaximumUsages;
    }

    public setMaximumUsages(usages: number): void {
        this.MaximumUsages = usages;
    }

    public getResponses(): string[] {
        return this.Responses;
    }

    public setResponses(responses: string[]): void {
        this.Responses = responses;
    }


}
