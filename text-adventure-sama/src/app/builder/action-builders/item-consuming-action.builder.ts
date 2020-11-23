import { BuilderError } from 'src/app/models/errors/builder.error';
import { InteractionType } from 'src/app/models/interactions/interaction-type.enum';
import { InGameItem } from 'src/app/models/Item.model';
import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';

import { ItemConsumingAction } from 'src/app/models/actions/item-consuming-action.model';

export class ItemConsumingActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<ItemConsumingAction, ReturnBuilderType> implements ItemContainingBuilder {

    constructor(builder: ReturnBuilderType) {
        super(builder, new ItemConsumingAction());
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

    public addItemToBuilder(item: InGameItem): void {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
    }

    public addItem(item?: InGameItem): ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>> {
        return new ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>>(this, item);
    }

    public onFinish() {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }
    }
}