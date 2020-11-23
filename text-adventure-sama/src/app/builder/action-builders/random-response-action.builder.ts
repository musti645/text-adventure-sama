import { RandomResponseAction } from 'src/app/models/actions/random-response-action.model';
import { BuilderError } from 'src/app/models/errors/builder.error';
import { InteractionType } from 'src/app/models/interactions/interaction-type.enum';
import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';



export class RandomResponseActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<RandomResponseAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType) {
        super(builder, new RandomResponseAction());
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

    public setInteractionType(type: InteractionType): this {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.setInteractionType(type);
        return this;
    }

    public onFinish() {
        if (!this.Action.getResponses()) {
            throw new BuilderError('Action creation could not be finished. Responses Array was not set.');
        }

        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }
}
