import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Inventory } from '../models/inventory.model';
import { InGameItem } from '../models/Item.model';
import { BaseBuilder } from './base.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { ItemBuilder } from './item.builder';
export declare class InventoryBuilder extends BaseBuilder implements ItemContainingBuilder {
    private GameBuilder;
    private Game;
    protected Inventory: Inventory;
    constructor(gameBuilder: GameBuilder, game: Game);
    addItem(item?: InGameItem): ItemBuilder<InventoryBuilder>;
    addItemToBuilder(item: InGameItem): void;
    finish(): GameBuilder;
}
