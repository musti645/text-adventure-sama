import { InteractionType } from '../interactions/interaction-type.enum';

/**
 * Abstract Base class for all actions.
 */
// Note: Actions don't have IDs, since they are triggered via their InteractionType and their Trigger
export abstract class Action {
    Trigger: string;
    Response: string;
    WrongInteractionTypeResponse: string;
    InteractionType: InteractionType;

    constructor() {
    }

    public abstract trigger(): string;

    public abstract reset(): void;
}
