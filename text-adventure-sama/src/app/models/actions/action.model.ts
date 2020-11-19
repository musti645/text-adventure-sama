import { InteractionType } from '../interactions/interaction-type.enum';

/**
 * Abstract Base class for all actions.
 */
// Note: Actions don't have IDs, since they are triggered via their InteractionType and their Trigger
export abstract class Action {
    private Trigger: string;
    private Response: string;
    private InteractionType: InteractionType;
    private IsEndGameAction: boolean;

    constructor() {
    }

    public abstract trigger(): string;

    public abstract reset(): void;

    public setTrigger(trigger: string): void {
        this.Trigger = trigger;
    }

    public setInteractionType(type: InteractionType): void {
        this.InteractionType = type;
    }

    public setResponse(response: string): void {
        this.Response = response;
    }

    public setIsEndGameAction(endGameAction: boolean): void {
        this.IsEndGameAction = endGameAction;
    }

    public getTrigger(): string {
        return this.Trigger;
    }

    public getIsEndGameAction(): boolean {
        return this.IsEndGameAction;
    }

    public getInteractionType(): InteractionType {
        return this.InteractionType;
    }

    public getResponse(): string {
        return this.Response;
    }
}
