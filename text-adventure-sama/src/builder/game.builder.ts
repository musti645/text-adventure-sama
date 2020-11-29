import { Game } from '../models/game.model';
import { InventoryBuilder } from './inventory.builder';
import { BuilderError } from '../models/errors/builder.error';
import { SceneBuilder } from './scene.builder';
import { BaseBuilder } from './base.builder';
import { IDGeneratorService } from '../services/id-generator.service';
import { Command } from '../models/command.model';
import { CommandContainingBuilder } from './interfaces/command-containing.builder';
import { CommandBuilder } from './command.builder';

/**
 * Use this class to chain the game building process.
 * Once your Game is build completely, call the 'build' method.
 */
export class GameBuilder extends BaseBuilder implements CommandContainingBuilder {
    protected Game: Game;
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

    public addCommand(): CommandBuilder<GameBuilder> {
        return new CommandBuilder(this);
    }

    addCommandToBuilder(command: Command): this {
        if (!command) {
            throw new BuilderError('Command was undefined');
        }

        this.Game.getCommands().push(command);
        return this;
    }

    public removeExistingCommands(): this {
        this.Game.setCommands([]);
        return this;
    }

    public setTitle(title: string): this {
        if (!title) {
            throw new EvalError('Title was undefined.');
        }

        this.Game.setTitle(title.trim());
        return this;
    }

    public setIntroduction(intro: string): this {
        if (!intro) {
            throw new EvalError('Introduction was undefined.');
        }

        this.Game.setIntroduction(intro.trim());
        return this;
    }

    public setItemNotFoundInInventoryResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemNotFoundInInventoryResponse was undefined.');
        }

        this.Game.setItemNotFoundInInventoryResponse(response.trim());
        return this;
    }

    public setItemAddedToInventoryResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemAddedToInventoryResponse was undefined.');
        }

        this.Game.setItemAddedToInventoryResponse(response.trim());
        return this;
    }

    public setGatewayTargetNotFoundResponse(response: string): this {
        if (!response) {
            throw new EvalError('GatewayTargetNotFoundResponse was undefined.');
        }

        this.Game.setGatewayTargetNotFoundResponse(response.trim());
        return this;
    }

    public setInventoryEmptyResponse(response: string): this {
        if (!response) {
            throw new EvalError('InventoryEmptyResponse was undefined.');
        }

        this.Game.setInventoryEmptyResponse(response.trim());
        return this;
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


    protected generateUnassignedIds(): void {
        this.IdGeneratorService.generateIDs(this.Game);
    }
}
