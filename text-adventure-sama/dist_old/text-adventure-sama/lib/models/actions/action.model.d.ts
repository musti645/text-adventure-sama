import { InteractionType } from '../interactions/interaction-type.enum';
/**
 * Abstract Base class for all actions.
 */
export declare abstract class Action {
    private Trigger;
    private Response;
    private InteractionType;
    private IsEndGameAction;
    constructor();
    abstract trigger(): string;
    abstract reset(): void;
    setTrigger(trigger: string): void;
    setInteractionType(type: InteractionType): void;
    setResponse(response: string): void;
    setIsEndGameAction(endGameAction: boolean): void;
    getTrigger(): string;
    getIsEndGameAction(): boolean;
    getInteractionType(): InteractionType;
    getResponse(): string;
}
