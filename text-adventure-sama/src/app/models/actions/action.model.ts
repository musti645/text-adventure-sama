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

    public abstract reset(): void;

    public setID(id: number): void {
        this.ID = id;
    }

    public getID(): number {
        return this.ID;
    }
}
