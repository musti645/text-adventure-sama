import { GameBuilder } from './game.builder';
import { InventoryBuilder } from './inventory.builder';
import { Game } from '../models/game.model';
import { Inventory } from '../models/inventory.model';
import { ItemBuilder } from './item.builder';
import { BuilderError } from '../models/errors/builder.error';
import { InGameItem } from '../models/item.model';

describe('InventoryBuilder.', () => {
    let parentBuilder: GameBuilderChild;
    let testBuilder: InventoryBuilderChild;
    let testGame: Game;

    beforeEach(() => {
        parentBuilder = new GameBuilderChild();
        testGame = new Game();
        testBuilder = new InventoryBuilderChild(parentBuilder, testGame);
    });

    
    afterEach(() => {
        testGame.getStage().unsubscribe();
        testGame.getInventory().unsubscribe();
        parentBuilder.getGame().getInventory().unsubscribe();
        parentBuilder.getGame().getStage().unsubscribe();
        testBuilder.getInventory().unsubscribe();
    });

    it('#addItem should return an ItemBuilder upon calling addItem.', () => {
        expect(testBuilder.addItem()).toBeInstanceOf(ItemBuilder);
    });

    it('#addItemToBuilder should throw a builder error when trying to add an undefined Item', () => {
        expect(() => testBuilder.addItemToBuilder(undefined)).toThrowError(BuilderError);
        testBuilder.finish();
        expect(testGame.getInventory().getItemCount()).toBe(0);
    });

    it('#addItemToBuilder should throw a builder error when trying to add an null Item', () => {
        expect(() => testBuilder.addItemToBuilder(null)).toThrowError(BuilderError);
        testBuilder.finish();
        expect(testGame.getInventory().getItemCount()).toBe(0);
    });

    it('#addItemToBuilder should add item to inventory', () => {
        expect(() => testBuilder.addItemToBuilder(new InGameItem())).not.toThrow();
        testBuilder.finish();
        expect(testBuilder.getInventory().getItemCount()).toBe(1);
    });

});

class GameBuilderChild extends GameBuilder {
    public getGame(): Game {
        return this.Game;
    }
}

class InventoryBuilderChild extends InventoryBuilder {

    public getInventory(): Inventory {
        return this.Inventory;
    }
}
