import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';
import { ItemRemovingAction } from '../../models/actions/item-removing-action.model';
import { InGameItem } from '../../models/item.model';
import { BuilderError } from '../../models/errors/builder.error';
import { InteractionType } from '../../models/interactions/interaction-type.enum';


export class ItemRemovingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemRemovingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemRemovingAction());
    }

    public addItemToBuilder(item: InGameItem): void {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
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

    public setInteractionType(type: InteractionType): this {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }

        this.Action.setInteractionType(type);
        return this;
    }

    public addItem(item?: InGameItem): ItemBuilder<ItemRemovingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemRemovingActionBuilder<ReturnBuilderType>>(this, item);
    }

    public onFinish(): void {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }

        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }
    }

}

