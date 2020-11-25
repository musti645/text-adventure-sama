import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { RandomResponseAction } from '../../models/actions/random-response-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
export declare class RandomResponseActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<RandomResponseAction, ReturnBuilderType> {
    constructor(builder: ReturnBuilderType);
    setResponses(responses: string[]): this;
    setInteractionType(type: InteractionType): this;
    onFinish(): void;
}
