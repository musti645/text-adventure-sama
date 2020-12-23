import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';
import { ItemYieldingAction } from '../../models/actions/item-yielding-action.model';
import { InGameItem } from '../../models/item.model';
import { BuilderError } from '../../models/errors/builder.error';
import { InteractionType } from '../../models/interactions/interaction-type.enum';


export class ItemYieldingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemYieldingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemYieldingAction());
    }

    /**
     * Called by the ItemBuilder, that adds a finished item to this action.
     * 
     * DO NOT use this function, as the necessary checks have not been performed on the item.
     */
    public addItemToBuilder(item: InGameItem): void {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
    }

    /**
     * Add an item to the inventory.
     * 
     * Returns an ItemBuilder.
     */
    public addItem(item?: InGameItem): ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>>(this, item);
    }

    /**
     * Determines if the action was triggered yet.
     */
    public setWasTrigered(wasTriggered: boolean): this {
        if (wasTriggered === undefined || wasTriggered === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setWasTriggered(wasTriggered);
        return this;
    }

    /**
     * Sets the response, that is returned when after the action was triggered.
     */
    public setResponseAfterUse(response: string): this {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }

        this.Action.setResponseAfterUse(response.trim());
        return this;
    }

    /**
     * Set the amount of items, that this action will add to the inventory.
     * @param amount 
     */
    public setAmountOfItems(amount: number): this {
        if (amount === undefined || amount <= 0) {
            throw new EvalError('AmountOfItems Value has to be greater than 0.');
        }

        this.Action.setAmountOfItems(amount);
        return this;
    }

    /**
     * Set the interaction type of the action.
     */
    public setInteractionType(type: InteractionType): this {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.setInteractionType(type);
        return this;
    }

    /**
     * Determine if the item should reset its usages left to its maximum amount of usages 
     */
    public setResetItemUsagesToMaximum(reset: boolean): this {
        if (reset === undefined || reset === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setResetItemUsagesToMaximum(reset);
        return this;
    }

    /**
     * Called by the finish method.
     * 
     * DO NOT call this manually.
     */
    public onFinish(): void {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }

        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }
    }
}
