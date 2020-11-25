import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { ItemContainingBuilder } from '../interfaces/item-containing.builder';
import { ItemBuilder } from '../item.builder';
import { ItemYieldingAction } from '../../models/actions/item-yielding-action.model';
import { InGameItem } from '../../models/Item.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
export declare class ItemYieldingActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<ItemYieldingAction, ReturnBuilderType> implements ItemContainingBuilder {
    constructor(builder: ReturnBuilderType);
    addItemToBuilder(item: InGameItem): void;
    addItem(item?: InGameItem): ItemBuilder<ItemYieldingActionBuilder<ReturnBuilderType>>;
    setWasTrigered(wasTriggered: boolean): this;
    setResponseAfterUse(response: string): this;
    setAmountOfItems(amount: number): this;
    setInteractionType(type: InteractionType): this;
    setResetItemUsagesToMaximum(reset: boolean): this;
    onFinish(): void;
}
