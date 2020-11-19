import { Game } from '../models/game.model';
import { InventoryBuilder } from './inventory.builder';
import { BuilderError } from '../models/errors/builder.error';
import { SceneBuilder } from './scene.builder';
import { BaseBuilder } from './base.builder';
import { IDGeneratorService } from '../services/id-generator.service';
import { Command } from '../models/command.model';

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

    public addGlobalCommand(command: Command): this {
        if (!command) {
            throw new EvalError('Command was not set.');
        }

        if (!command.getResponse() && !command.getResponseFunction()) {
            throw new EvalError('Either Command response or response function have to be set.');
        }

        this.Game.getCommands().push(command);
        return this;
    }

    public removeExistingCommands(): this {
        this.Game.setCommands([]);
        return this;
    }

    public setTitle(title: string): this {
        this.Game.setTitle(title);
        return this;
    }

    public setIntroduction(intro: string): this {
        this.Game.setIntroduction(intro);
        return this;
    }

    public setItemNotFoundInInventoryResponse(response: string): this {
        this.Game.setItemNotFoundInInventoryResponse(response);
        return this;
    }

    public setItemAddedToInventoryResponse(response: string): this {
        this.Game.setItemAddedToInventoryResponse(response);
        return this;
    }

    public setGatewayTargetNotFoundResponse(response: string): this {
        this.Game.setGatewayTargetNotFoundResponse(response);
        return this;
    }

    public setInventoryEmptyResponse(response: string): this {
        this.Game.setInventoryEmptyResponse(response);
        return this;
    }

    generateUnassignedIds(): void {
        this.IdGeneratorService.generateIDs(this.Game);
    }

    public finish(): Game {

        if (!this.Game.getTitle()) {
            throw new BuilderError('Game creation could not be finished. Title was not set.');
        }

        if (!this.Game.getIntroduction()) {
            throw new BuilderError('Game creation could not be finished. Introduction was not set.');
        }

        if (!this.Game.getItemAddedToInventoryResponse()) {
            throw new BuilderError('Game creation could not be finished. ItemAddedToInventoryResponse was not set.');
        }

        if (!this.Game.getItemNotFoundInInventoryResponse()) {
            throw new BuilderError('Game creation could not be finished. ItemNotFoundInInventoryResponse was not set.');
        }

        if (!this.Game.getGatewayTargetNotFoundResponse()) {
            throw new BuilderError('Game creation could not be finished. GatewayTargetNotFoundResponse was not set.');
        }

        if (!this.Game.getInventoryEmptyResponse()) {
            throw new BuilderError('Game creation could not be finished. InventoryEmptyResponse was not set.');
        }

        if (this.Game.getScenesCount() <= 0) {
            throw new BuilderError('Game creation could not be finished. No Scenes were found.');
        }

        this.generateUnassignedIds();
        return this.Game;
    }
}
