import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Inventory } from '../models/inventory.model';
import { InGameItem } from '../models/item.model';
import { BaseBuilder } from './base.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { ItemBuilder } from './item.builder';
import { BuilderError } from '../models/errors/builder.error';

export class InventoryBuilder extends BaseBuilder implements ItemContainingBuilder {
    private GameBuilder: GameBuilder;
    private Game: Game;
    protected Inventory: Inventory;

    constructor(gameBuilder: GameBuilder, game: Game) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Inventory = new Inventory();
    }

    public addItem(item?: InGameItem): ItemBuilder<InventoryBuilder> {
        return new ItemBuilder<InventoryBuilder>(this, item);
    }

    addItemToBuilder(item: InGameItem): void {
        if (!item) {
            throw new BuilderError('Could not add Item to Inventory. Item was not set.');
        }
        this.Inventory.addItem(item);
        if (item.getID()) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }


    public finish(): GameBuilder {
        this.Game.setInventory(this.Inventory);
        return this.GameBuilder;
    }
}
