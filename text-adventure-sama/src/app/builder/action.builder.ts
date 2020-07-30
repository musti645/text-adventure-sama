import { Action } from '../models/actions/action.model';
import { ActionContainingBuilder } from './interfaces/action-containing.builder';
import { BaseBuilder } from './base.builder';
import { GatewayAction } from '../models/actions/gateway-action.model';
import { ItemConsumingAction } from '../models/actions/item-consuming-action.model';
import { ItemRemovingAction } from '../models/actions/item-removing-action.model';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';
import { MultiTimeAction } from '../models/actions/multi-time-action.model';
import { OneTimeAction } from '../models/actions/one-time-action.model';
import { RandomResponseAction } from '../models/actions/random-response-action.model';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { InGameItem } from '../models/Item.model';
import { ItemBuilder } from './item.builder';

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

        this.Action.Trigger = trigger;
        return this;
    }

    public setResponse(response: string): this {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.Response = response;
        return this;
    }

    public finish(): ReturnBuilderType {
        this.Builder.addActionToBuilder(this.Action);
        return this.Builder;
    }
}

export class GatewayActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<GatewayAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new GatewayAction(id));
    }

    public setTargetSceneId(id?: number): this {
        if (id <= 0) {
            throw new EvalError('TargetSceneId Value has to be greater than 0.');
        }

        this.Action.SceneId = id;
        return this;
    }

    public setTargetSceneName(name: string): this {
        if (!name) {
            throw new EvalError('TargetSceneName Value is invalid.');
        }

        this.Action.TargetSceneName = name;
        return this;
    }

}

export class ItemConsumingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemConsumingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new ItemConsumingAction(id));
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.Item = item;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder> {
        return new ItemBuilder<T, ItemContainingBuilder>(item, this);
    }

}


export class ItemRemovingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemRemovingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new ItemRemovingAction(id));
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.Item = item;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder> {
        return new ItemBuilder<T, ItemContainingBuilder>(item, this);
    }

}


export class ItemYieldingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemYieldingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new ItemYieldingAction(id));
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.Item = item;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder> {
        return new ItemBuilder<T, ItemContainingBuilder>(item, this);
    }

    public setAmountOfItems(amount: number): this {
        if (amount <= 0) {
            throw new EvalError('AmountOfItems Value has to be greater than 0.');
        }

        this.Action.AmountOfItems = amount;
        return this;
    }

    public setResetItemUsagesToMaximum(reset: boolean): this {
        this.Action.ResetItemUsagesToMaximum = reset;
        return this;
    }

}


export class MultiTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<MultiTimeAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new MultiTimeAction(id));
    }

    public setUsagesLeft(count: number): this {
        if (count <= 0) {
            throw new EvalError('UsagesLeft Value has to be greater than 0.');
        }

        if (this.Action.MaximumUsages && this.Action.MaximumUsages < count) {
            throw new EvalError('UsagesLeft Value has to be less than or equal to MaximumUsages Value.');
        }

        this.Action.UsagesLeft = count;
        return this;
    }

    public setMaximumUsages(count: number): this {
        if (count <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }

        if (this.Action.UsagesLeft && this.Action.UsagesLeft > count) {
            throw new EvalError('MaximumUsages Value has to be greater than or equal to UsagesLeft Value.');
        }

        if (this.Action.Responses && this.Action.Responses.length !== count) {
            throw new EvalError('MaximumUsages Value has to match the Amount of Responses.');
        }

        this.Action.MaximumUsages = count;
        return this;
    }

    public setResponses(responses: string[]): this {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }

        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }

        this.Action.Responses = responses;
        return this;
    }

}


export class OneTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<OneTimeAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new OneTimeAction(id));
    }

    public setWasTrigered(wasTriggered: boolean): this {
        this.Action.WasTriggered = wasTriggered;
        return this;
    }

    public setResponseAfterUse(response: string): this {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.ResponseAfterUse = response;
        return this;
    }

}


export class RandomResponseActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<RandomResponseAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType, id?: number) {
        super(builder, new RandomResponseAction(id));
    }

    public setResponses(responses: string[]): this {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }

        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }

        this.Action.Responses = responses;
        return this;
    }


}
