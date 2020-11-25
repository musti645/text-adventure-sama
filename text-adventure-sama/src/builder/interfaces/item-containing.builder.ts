import { InGameItem } from '../../models/item.model';
import { ItemBuilder } from '../item.builder';

export interface ItemContainingBuilder {
    addItemToBuilder(item: InGameItem): void;

    addItem(item?: InGameItem): ItemBuilder<ItemContainingBuilder>;
}
