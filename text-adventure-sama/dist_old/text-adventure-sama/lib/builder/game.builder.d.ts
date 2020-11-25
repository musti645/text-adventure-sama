import { Game } from '../models/game.model';
import { InventoryBuilder } from './inventory.builder';
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
export declare class GameBuilder extends BaseBuilder implements CommandContainingBuilder {
    protected Game: Game;
    IdGeneratorService: IDGeneratorService;
    constructor();
    addInventory(): InventoryBuilder;
    addScene(id?: number): SceneBuilder;
    addCommand(): CommandBuilder<GameBuilder>;
    addCommandToBuilder(command: Command): this;
    removeExistingCommands(): this;
    setTitle(title: string): this;
    setIntroduction(intro: string): this;
    setItemNotFoundInInventoryResponse(response: string): this;
    setItemAddedToInventoryResponse(response: string): this;
    setGatewayTargetNotFoundResponse(response: string): this;
    setInventoryEmptyResponse(response: string): this;
    finish(): Game;
    protected generateUnassignedIds(): void;
}
