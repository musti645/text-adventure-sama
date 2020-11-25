import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { OneTimeAction } from '../../models/actions/one-time-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
export declare class OneTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<OneTimeAction, ReturnBuilderType> {
    constructor(builder: ReturnBuilderType);
    setWasTrigered(wasTriggered: boolean): this;
    setResponseAfterUse(response: string): this;
    setInteractionType(type: InteractionType): this;
    onFinish(): void;
}
