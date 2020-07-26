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

    constructor(action: T, builder: ReturnBuilderType) {
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

    constructor(id: number, builder: ReturnBuilderType) {
        super(new GatewayAction(id), builder);
    }

    public setTargetSceneId(id: number) {
        if (id <= 0) {
            throw new EvalError('TargetSceneId Value has to be greater than 0.');
        }

        this.Action.SceneId = id;
    }

}

export class ItemConsumingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemConsumingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(id: number, builder: ReturnBuilderType) {
        super(new ItemConsumingAction(id), builder);
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.ItemToConsume = item;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder> {
        return new ItemBuilder<T, ItemContainingBuilder>(item, this);
    }

    public setItemNotFoundResponse(response: string) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.ItemNotFoundResponse = response;
    }

}


export class ItemRemovingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemRemovingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(id: number, builder: ReturnBuilderType) {
        super(new ItemRemovingAction(id), builder);
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.ItemToRemove = item;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder> {
        return new ItemBuilder<T, ItemContainingBuilder>(item, this);
    }

    public setItemNotFoundResponse(response: string) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.ItemNotFoundResponse = response;
    }

}


export class ItemYieldingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemYieldingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(id: number, builder: ReturnBuilderType) {
        super(new ItemYieldingAction(id), builder);
    }

    addItemToBuilder(item: InGameItem): void {
        this.Action.ItemToYield = item;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder> {
        return new ItemBuilder<T, ItemContainingBuilder>(item, this);
    }

    public setAmountOfItems(amount: number) {
        if (amount <= 0) {
            throw new EvalError('AmountOfItems Value has to be greater than 0.');
        }

        this.Action.AmountOfItems = amount;
    }

    public setResetItemUsagesToMaximum(reset: boolean) {
        this.Action.ResetItemUsagesToMaximum = reset;
    }

}


export class MultiTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<MultiTimeAction, ReturnBuilderType> {

    constructor(id: number, builder: ReturnBuilderType) {
        super(new MultiTimeAction(id), builder);
    }

    public setUsagesLeft(count: number) {
        if (count <= 0) {
            throw new EvalError('UsagesLeft Value has to be greater than 0.');
        }

        if (this.Action.MaximumUsages && this.Action.MaximumUsages < count) {
            throw new EvalError('UsagesLeft Value has to be less than or equal to MaximumUsages Value.');
        }

        this.Action.UsagesLeft = count;
    }

    public setMaximumUsages(count: number) {
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
    }

    public setResponses(responses: string[]) {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }

        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }

        this.Action.Responses = responses;
    }

}


export class OneTimeActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<OneTimeAction, ReturnBuilderType> {

    constructor(id: number, builder: ReturnBuilderType) {
        super(new OneTimeAction(id), builder);
    }

    public setWasTrigered(wasTriggered: boolean) {
        this.Action.WasTriggered = wasTriggered;
    }

    public setResponseAfterUse(response: string) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.ResponseAfterUse = response;
    }

}


export class RandomResponseActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<RandomResponseAction, ReturnBuilderType> {

    constructor(id: number, builder: ReturnBuilderType) {
        super(new RandomResponseAction(id), builder);
    }

    public setResponses(responses: string[]) {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }

        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }

        this.Action.Responses = responses;
    }


}
