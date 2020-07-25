import { InGameItem } from '../../models/Item.model';
import { ItemBuilder } from '../item.builder';

export interface ItemContainingBuilder {
    addItemToBuilder(item: InGameItem): void;

    addItem<T extends InGameItem>(item: T): ItemBuilder<T, ItemContainingBuilder>;
}
