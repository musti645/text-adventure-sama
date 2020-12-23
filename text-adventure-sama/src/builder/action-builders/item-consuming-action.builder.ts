import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';
import { ItemConsumingAction } from '../../models/actions/item-consuming-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { InGameItem } from '../../models/item.model';
import { BuilderError } from '../../models/errors/builder.error';

export class ItemConsumingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemConsumingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemConsumingAction());
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
    public addItem(item?: InGameItem): ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>>(this, item);
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
