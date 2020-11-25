import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { OneTimeAction } from '../../models/actions/one-time-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { BuilderError } from '../../models/errors/builder.error';


export class OneTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<OneTimeAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType) {
        super(builder, new OneTimeAction());
    }

    public setWasTrigered(wasTriggered: boolean): this {
        if (wasTriggered === undefined || wasTriggered === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setWasTriggered(wasTriggered);
        return this;
    }

    public setResponseAfterUse(response: string): this {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.setResponseAfterUse(response);
        return this;
    }

    public setInteractionType(type: InteractionType): this {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.setInteractionType(type);
        return this;
    }

    public onFinish(): void {
        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }

        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }
}

