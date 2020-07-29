import { InteractionType } from '../interactions/interaction-type.enum';

/**
 * Abstract Base class for all actions
 */
export abstract class Action {
    ID: number;
    Trigger: string;
    Response: string;
    WrongInteractionTypeResponse: string;
    InteractionType: InteractionType;

    constructor(id?: number) {
        this.ID = id;
    }

    public abstract trigger(): string;

    public abstract reset();

    public setID(id: number){
        this.ID = id;
    }
}
