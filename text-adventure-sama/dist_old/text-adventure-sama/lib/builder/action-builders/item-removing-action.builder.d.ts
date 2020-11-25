import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';
import { ItemRemovingAction } from '../../models/actions/item-removing-action.model';
import { InGameItem } from '../../models/Item.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
export declare class ItemRemovingActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<ItemRemovingAction, ReturnBuilderType> implements ItemContainingBuilder {
    constructor(builder: ReturnBuilderType);
    addItemToBuilder(item: InGameItem): void;
    setWasTrigered(wasTriggered: boolean): this;
    setResponseAfterUse(response: string): this;
    setInteractionType(type: InteractionType): this;
    addItem(item?: InGameItem): ItemBuilder<ItemRemovingActionBuilder<ReturnBuilderType>>;
    onFinish(): void;
}
