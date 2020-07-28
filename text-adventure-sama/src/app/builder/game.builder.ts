import { Game } from '../models/game.model';
import { InventoryBuilder } from './inventory.builder';
import { BuilderError } from '../errors/builder.error';
import { SceneBuilder } from './scene.builder';
import { BaseBuilder } from './base.builder';
import { ItemEventService } from '../services/item-event.service';
import { SceneEventService } from '../services/scene-event.service';

/**
 * Use this class to chain the game building process.
 * Once your Game is build completely, call the 'build' method.
 */
export class GameBuilder extends BaseBuilder{
    private Game: Game;

    constructor(itemEventService: ItemEventService,
                sceneEventService: SceneEventService) {
        super();
        this.Game = new Game(itemEventService, sceneEventService);
    }

    public addInventory(): InventoryBuilder {
        if (this.Game.Inventory) {
            throw new BuilderError('Multiple Inventories are not allowed.');
        }

        return new InventoryBuilder(this, this.Game);
    }

    public addScene(id?: number): SceneBuilder {
        return new SceneBuilder(this, this.Game, id);
    }

    public reset(){
        this.Game.reset();
    }

    public finish(): Game {
        return this.Game;
    }
}
