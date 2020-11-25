import { Action } from './actions/action.model';
import { Command } from './command.model';
import { Inventory } from './inventory.model';
import { InGameItem } from './Item.model';
import { Stage } from './stage.model';
/**
 * Represents the Game.
 */
export declare class Game {
    private Title;
    private Introduction;
    private ItemNotFoundInInventoryResponse;
    private ItemAddedToInventoryResponse;
    private GatewayTargetNotFoundResponse;
    private InventoryEmptyResponse;
    private Stage;
    private Inventory;
    private Commands;
    constructor();
    private initializeCommands;
    getStage(): Stage;
    getInventory(): Inventory;
    setInventory(inventory: Inventory): void;
    getScenesCount(): number;
    getTitle(): string;
    setTitle(title: string): void;
    getIntroduction(): string;
    setIntroduction(intro: string): void;
    getCommands(): Command[];
    setCommands(commands: Command[]): void;
    getItemNotFoundResponse(): string;
    getInvalidInputResponse(): string;
    getActionNotRecognizedResponse(): string;
    getSceneDescription(): string;
    getItemNotFoundInInventoryResponse(): string;
    setItemNotFoundInInventoryResponse(response: string): void;
    getActionsInScene(): Action[];
    getItemsInScene(): InGameItem[];
    getItemsInInventory(): InGameItem[];
    removeItemFromScene(item: InGameItem): void;
    addItemToInventory(item: InGameItem): void;
    removeItemFromInventory(item: InGameItem): void;
    getItemAddedToInventoryResponse(): string;
    setItemAddedToInventoryResponse(response: string): void;
    getGatewayTargetNotFoundResponse(): string;
    setGatewayTargetNotFoundResponse(response: string): void;
    getInventoryEmptyResponse(): string;
    setInventoryEmptyResponse(response: string): void;
}
