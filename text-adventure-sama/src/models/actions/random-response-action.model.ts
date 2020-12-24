import { InteractionType } from '../interactions/interaction-type.enum';
import { Action } from './action.model';

/**
 * RandomResponseAction allows the use of multiple Responses.
 * Each time this Action is triggered, the response will be selected randomly out of the passed array.
 * 
 * Use the corresponding builder to create this action.
 */
export class RandomResponseAction extends Action {
    private Responses: string[];

    constructor() {
        super();
        // set normal response to avoid errors during build
        this.setResponse(' ');
        this.setInteractionType(InteractionType.DO);
    }

    public trigger(): string {
        const rndm = Math.floor(Math.random() * this.Responses.length);
        return this.Responses[rndm];
    }

    public reset(): void {
    }

    public getResponses(): string[] {
        return this.Responses;
    }

    public setResponses(responses: string[]): void {
        this.Responses = responses;
    }
}
