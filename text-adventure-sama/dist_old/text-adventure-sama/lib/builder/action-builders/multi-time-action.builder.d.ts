import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { MultiTimeAction } from '../../models/actions/multi-time-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
export declare class MultiTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<MultiTimeAction, ReturnBuilderType> {
    constructor(builder: ReturnBuilderType);
    setUsagesLeft(count: number): this;
    setInteractionType(type: InteractionType): this;
    setMaximumUsages(count: number): this;
    setResponses(responses: string[]): this;
    onFinish(): void;
}
