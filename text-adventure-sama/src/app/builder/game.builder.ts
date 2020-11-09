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

    public setTitle(title: string): this {
        this.Game.Title = title;
        return this;
    }

    public setIntroduction(intro: string): this {
        this.Game.Introduction = intro;
        return this;
    }

    public setItemNotFoundInInventoryResponse(response: string): this {
        this.Game.ItemNotFoundInInventoryResponse = response;
        return this;
    }

    public setItemAddedToInventoryResponse(response: string): this {
        this.Game.ItemAddedToInventoryResponse = response;
        return this;
    }

    public setGatewayTargetNotFoundResponse(response: string): this {
        this.Game.GatewayTargetNotFoundResponse = response;
        return this;
    }

    public reset(): GameBuilder {
        this.Game.reset();
        return this;
    }

    generateUnassignedIds(): void {
        this.IdGeneratorService.generateIDs(this.Game);
    }

    public finish(): Game {

        if (!this.Game.Title) {
            throw new BuilderError('Game creation could not be finished. Title was not set.');
        }

        if (!this.Game.Introduction) {
            throw new BuilderError('Game creation could not be finished. Introduction was not set.');
        }

        if (!this.Game.ItemAddedToInventoryResponse) {
            throw new BuilderError('Game creation could not be finished. ItemAddedToInventoryResponse was not set.');
        }

        if (!this.Game.ItemNotFoundInInventoryResponse) {
            throw new BuilderError('Game creation could not be finished. ItemNotFoundInInventoryResponse was not set.');
        }

        if (!this.Game.GatewayTargetNotFoundResponse) {
            throw new BuilderError('Game creation could not be finished. GatewayTargetNotFoundResponse was not set.');
        }
        // TODO: A game has to have scenes

        this.generateUnassignedIds();
        return this.Game;
    }
}
