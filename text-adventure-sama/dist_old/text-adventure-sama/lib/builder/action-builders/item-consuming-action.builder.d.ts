import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';
import { ItemConsumingAction } from '../../models/actions/item-consuming-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { InGameItem } from '../../models/Item.model';
export declare class ItemConsumingActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<ItemConsumingAction, ReturnBuilderType> implements ItemContainingBuilder {
    constructor(builder: ReturnBuilderType);
    setWasTrigered(wasTriggered: boolean): this;
    setResponseAfterUse(response: string): this;
    setInteractionType(type: InteractionType): this;
    addItemToBuilder(item: InGameItem): void;
    addItem(item?: InGameItem): ItemBuilder<ItemConsumingActionBuilder<ReturnBuilderType>>;
    onFinish(): void;
}
