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
import { InteractionType } from '../models/interactions/interaction-type.enum';

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

    constructor(builder: ReturnBuilderType) {
        super(builder, new GatewayAction());
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

    // TODO: check that either scene name or scene id was set
}

export class ItemConsumingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemConsumingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemConsumingAction());
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.Item = item;
    }

    public addItem(item?: InGameItem): ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>>(this, item);
    }

    // TODO: check that item was attached upon finish
}


export class ItemRemovingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemRemovingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemRemovingAction());
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.Item = item;
    }

    public addItem(item?: InGameItem): ItemBuilder<ItemRemovingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemRemovingActionBuilder<ReturnBuilderType>>(this, item);
    }

    // TODO: check that item was attached upon finish

}


export class ItemYieldingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemYieldingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemYieldingAction());
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.Item = item;
    }

    public addItem(item?: InGameItem): ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>>(this, item);
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

    // TODO: check that item was attached upon finish
}


export class MultiTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<MultiTimeAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType) {
        super(builder, new MultiTimeAction());
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

    constructor(builder: ReturnBuilderType) {
        super(builder, new OneTimeAction());
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

    public setInteractionType(type: InteractionType): this {
        if (!type) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.InteractionType = type;
        return this;
    }

}


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

        this.Action.Responses = responses;
        return this;
    }


}
