import { ItemYieldingAction } from 'src/app/models/actions/item-yielding-action.model';
import { BuilderError } from 'src/app/models/errors/builder.error';
import { InteractionType } from 'src/app/models/interactions/interaction-type.enum';
import { InGameItem } from 'src/app/models/Item.model';
import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';


export class ItemYieldingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemYieldingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemYieldingAction());
    }

    public addItemToBuilder(item: InGameItem): void {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
    }

    public addItem(item?: InGameItem): ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>>(this, item);
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

    public setAmountOfItems(amount: number): this {
        if (amount === undefined || amount <= 0) {
            throw new EvalError('AmountOfItems Value has to be greater than 0.');
        }

        this.Action.setAmountOfItems(amount);
        return this;
    }

    public setInteractionType(type: InteractionType): this {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.setInteractionType(type);
        return this;
    }

    public setResetItemUsagesToMaximum(reset: boolean): this {
        if (reset === undefined || reset === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setResetItemUsagesToMaximum(reset);
        return this;
    }

    public onFinish() {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }
    }
}
