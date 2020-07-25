import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Inventory } from '../models/inventory.model';
import { InGameItem } from '../models/Item.model';
import { BaseBuilder } from './base.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { ItemBuilder } from './item.builder';

export class InventoryBuilder extends BaseBuilder implements ItemContainingBuilder {
    private GameBuilder: GameBuilder;
    private Game: Game;
    private Inventory: Inventory;

    constructor(gameBuilder: GameBuilder, game: Game) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, InventoryBuilder> {
        return new ItemBuilder<T, InventoryBuilder>(item, this);
    }

    addItemToBuilder(item: InGameItem) {
        this.Inventory.addItem(item);
    }


    public finish(): GameBuilder {
        this.Game.Inventory = this.Inventory;
        return this.GameBuilder;
    }
}
