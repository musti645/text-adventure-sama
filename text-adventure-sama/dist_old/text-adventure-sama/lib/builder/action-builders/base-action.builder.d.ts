import { Action } from '../../models/actions/action.model';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { BaseBuilder } from '../base.builder';
export declare class BaseActionBuilder<T extends Action, ReturnBuilderType extends ActionContainingBuilder> extends BaseBuilder {
    protected Action: T;
    protected Builder: ReturnBuilderType;
    constructor(builder: ReturnBuilderType, action: T);
    setTrigger(trigger: string): this;
    setResponse(response: string): this;
    setEndGameAction(): this;
    onFinish(): void;
    finish(): ReturnBuilderType;
}
