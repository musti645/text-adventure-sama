import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { MultiTimeAction } from '../../models/actions/multi-time-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { BuilderError } from '../../models/errors/builder.error';


export class MultiTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<MultiTimeAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType) {
        super(builder, new MultiTimeAction());
    }

    public setUsagesLeft(count: number): this {
        if (count === undefined || count <= 0) {
            throw new EvalError('UsagesLeft Value has to be greater than 0.');
        }

        if (this.Action.getMaximumUsages() && this.Action.getMaximumUsages() < count) {
            throw new EvalError('UsagesLeft Value has to be less than or equal to MaximumUsages Value.');
        }

        this.Action.setUsagesLeft(count);
        return this;
    }


    public setInteractionType(type: InteractionType): this {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.setInteractionType(type);
        return this;
    }

    public setMaximumUsages(count: number): this {
        if (count === undefined || count <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }

        if (this.Action.getUsagesLeft() !== undefined &&
            this.Action.getUsagesLeft() > count) {
            throw new EvalError('MaximumUsages Value has to be greater than or equal to UsagesLeft Value.');
        }

        if (this.Action.getResponses() &&
            this.Action.getResponses().length !== count) {
            throw new EvalError('MaximumUsages Value has to match the Amount of Responses.');
        }

        this.Action.setMaximumUsages(count);
        return this;
    }

    public setResponses(responses: string[]): this {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }

        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }

        this.Action.setResponses(responses);
        return this;
    }

    public onFinish(): void {
        if (!this.Action.getUsagesLeft()) {
            throw new BuilderError('Action creation could not be finished. UsagesLeft was not set.');
        }

        if (!this.Action.getMaximumUsages()) {
            throw new BuilderError('Action creation could not be finished. MaximumUsages was not set.');
        }

        if (!this.Action.getResponses()) {
            throw new BuilderError('Action creation could not be finished. Responses Array was not set.');
        }

        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }

}
