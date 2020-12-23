import { Action } from '../../models/actions/action.model';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { BaseBuilder } from '../base.builder';
import { BuilderError } from '../../models/errors/builder.error';

export class BaseActionBuilder<T extends Action, ReturnBuilderType extends ActionContainingBuilder> extends BaseBuilder {
    protected Action: T;
    protected Builder: ReturnBuilderType;

    constructor(builder: ReturnBuilderType, action: T) {
        super();
        this.Action = action;
        this.Builder = builder;
    }

    /**
     * Sets the trigger of the action. 
     * The trigger has to be matched exactly to trigger/activate this action.
     */
    public setTrigger(trigger: string): this {
        if (!trigger || trigger === '') {
            throw new EvalError('No Trigger found.');
        }

        this.Action.setTrigger(trigger.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when the action has been triggered.
     * 
     * Note: This is may be ignored for a RandomResponseAction
     */
    public setResponse(response: string): this {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.setResponse(response.trim());
        return this;
    }

    /**
     * Determines if the action ends the game when triggered
     */
    public setEndGameAction(): this {
        this.Action.setIsEndGameAction(true);
        return this;
    }

    /**
     * Sets the list of alternative strings, that help to trigger this action.
     * E.g.
     * The trigger of the action is "use key"
     * The alternative triggers could then look like ["open door with key", "use skeleton", "open door"]
     */
    public setAlternativeTriggers(triggers: string[]): this {
        if (!triggers || triggers.length <= 0) {
            throw new EvalError('No AlternativeTriggers found.');
        }

        triggers.map(val => val = val.trim());

        this.Action.setAlternativeTriggers(triggers);
        return this;
    }

    /**
     * To be overridden by child builders.
     */
    public onFinish(): void {
    }

    /**
     * The finish method makes all the necessary checks on the current creation process 
     * and throws errors, if something is undefined or falsy.
     * 
     * It returns the builder, that started this creation process.
     */
    public finish(): ReturnBuilderType {
        if (!this.Action.getTrigger()) {
            throw new BuilderError('Action creation could not be finished. Trigger was not set.');
        }

        if (!this.Action.getResponse()) {
            throw new BuilderError('Action creation could not be finished. Response was not set.');
        }

        this.onFinish();

        this.Builder.addActionToBuilder(this.Action);
        return this.Builder;
    }

}
