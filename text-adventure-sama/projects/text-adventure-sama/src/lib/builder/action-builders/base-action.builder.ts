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

    public setTrigger(trigger: string): this {
        if (!trigger || trigger === '') {
            throw new EvalError('No Trigger found.');
        }

        this.Action.setTrigger(trigger);
        return this;
    }

    public setResponse(response: string): this {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.setResponse(response);
        return this;
    }

    public setEndGameAction(): this {
        this.Action.setIsEndGameAction(true);
        return this;
    }

    public onFinish(): void {
    }

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
