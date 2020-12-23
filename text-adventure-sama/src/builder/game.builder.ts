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

    /**
     * Allows you to customize the inventory the user starts with.
     * Begins the Inventory creation process with the help of an InventoryBuilder.
     */
    public addInventory(): InventoryBuilder {
        return new InventoryBuilder(this, this.Game);
    }

    /**
     * Add a scene to the game.
     * Note, that the first scene added to the game is also the one with which the game starts.
     */
    public addScene(id?: number): SceneBuilder {
        return new SceneBuilder(this, this.Game, id);
    }

    /**
     * Add a global command to the game.
     * Commands may be used anywhere at any time and are evaluated before everything else.
     * 
     * Do not create too many commands, as this may worsen the performance.
     */
    public addCommand(): CommandBuilder<GameBuilder> {
        return new CommandBuilder(this);
    }

    /**
     * Used by the CommandBuilder to add a command to the game.
     * 
     * DO NOT use this function, as the necessary checks have not been performed on the command.
     */
    addCommandToBuilder(command: Command): this {
        if (!command) {
            throw new BuilderError('Command was undefined');
        }

        this.Game.getCommands().push(command);
        return this;
    }

    /**
     * Clears all commands in the game.
     * Use this, when you don't want, or need, the predefined commands.
     */
    public removeExistingCommands(): this {
        this.Game.setCommands([]);
        return this;
    }

    /**
     * Sets the title of the game.
     * The title is printed at the beginning of the game.
     */
    public setTitle(title: string): this {
        if (!title) {
            throw new EvalError('Title was undefined.');
        }

        this.Game.setTitle(title.trim());
        return this;
    }

    /**
     * Sets the introduction of the game.
     * The Introduction is printed after the title.
     * 
     * Use the introductin to:
     * - give the user the necessary information to navigate through the game
     * - try to answer the five W`s and one H: When, Where, Who, Why, What, How
     * - give the user a outline of the story and an intro to your writing style
     */
    public setIntroduction(intro: string): this {
        if (!intro) {
            throw new EvalError('Introduction was undefined.');
        }

        this.Game.setIntroduction(intro.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when an item could not be found in the inventory
     */
    public setItemNotFoundInInventoryResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemNotFoundInInventoryResponse was undefined.');
        }

        this.Game.setItemNotFoundInInventoryResponse(response.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when an item was added to the inventory
     */
    public setItemAddedToInventoryResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemAddedToInventoryResponse was undefined.');
        }

        this.Game.setItemAddedToInventoryResponse(response.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when the Gateway was not found.
     * E.g. the user wrote "go to house", but there is no gateway called house.
     */
    public setGatewayTargetNotFoundResponse(response: string): this {
        if (!response) {
            throw new EvalError('GatewayTargetNotFoundResponse was undefined.');
        }

        this.Game.setGatewayTargetNotFoundResponse(response.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when the inventory is empty.
     * This is used by the predefined inventory command.
     */
    public setInventoryEmptyResponse(response: string): this {
        if (!response) {
            throw new EvalError('InventoryEmptyResponse was undefined.');
        }

        this.Game.setInventoryEmptyResponse(response.trim());
        return this;
    }


    /**
     * The finish method makes all the necessary checks on the current creation process 
     * and throws errors, if something is undefined or falsy.
     * 
     * Returns the game.
     */
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
