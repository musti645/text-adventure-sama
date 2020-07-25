import { Action } from '../models/actions/action.model';
import { ActionContainingBuilder } from './interfaces/action-containing.builder';
import { BaseBuilder } from './base.builder';

export class ActionBuilder<T extends Action, ReturnBuilderType extends ActionContainingBuilder> extends BaseBuilder {
    private Action: T;
    private Builder: ReturnBuilderType;

    constructor(action: T, builder: ReturnBuilderType) {
        super();
        this.Action = action;
        this.Builder = builder;
    }

    public setTrigger(trigger: string): this {
        this.Action.Trigger = trigger;
        return this;
    }

    public setResponse(response: string): this {
        this.Action.Response = response;
        return this;
    }

    public finish(): ActionContainingBuilder {
        this.Builder.addActionToBuilder(this.Action);
        return this.Builder;
    }
}
