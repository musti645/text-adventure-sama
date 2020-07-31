import { Game } from '../models/game.model';
import { InventoryBuilder } from './inventory.builder';
import { BuilderError } from '../models/errors/builder.error';
import { SceneBuilder } from './scene.builder';
import { BaseBuilder } from './base.builder';
import { IDGeneratorService } from '../services/id-generator.service';

/**
 * Use this class to chain the game building process.
 * Once your Game is build completely, call the 'build' method.
 */
export class GameBuilder extends BaseBuilder {
    private Game: Game;
    public IdGeneratorService: IDGeneratorService;

    constructor() {
        super();
        this.Game = new Game();
        this.IdGeneratorService = new IDGeneratorService();
    }

    public addInventory(): InventoryBuilder {
        return new InventoryBuilder(this, this.Game);
    }

    public addScene(id?: number): SceneBuilder {
        return new SceneBuilder(this, this.Game, id);
    }

    public reset() {
        this.Game.reset();
    }

    generateUnassignedIds(): void {
        this.IdGeneratorService.generateIDs(this.Game);
    }

    public finish(): Game {
        this.generateUnassignedIds();
        return this.Game;
    }
}
