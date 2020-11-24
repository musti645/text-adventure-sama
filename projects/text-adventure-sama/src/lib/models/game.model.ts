import { Action } from './actions/action.model';
import { Command } from './command.model';
import { Inventory } from './inventory.model';
import { InGameItem } from './Item.model';
import { Stage } from './stage.model';

/**
 * Represents the Game.
 */
export class Game {
    private Title: string;
    private Introduction: string;
    private ItemNotFoundInInventoryResponse: string;
    private ItemAddedToInventoryResponse: string;
    private GatewayTargetNotFoundResponse: string;
    private InventoryEmptyResponse: string;
    private Stage: Stage;
    private Inventory: Inventory;
    private Commands: Command[];

    constructor() {
        this.Stage = new Stage();
        this.Inventory = new Inventory();
        this.Commands = [];
        this.initializeCommands();
    }

    private initializeCommands(): void {
        const helpCommand = new Command();
        helpCommand.setTrigger('help');
        helpCommand.setDescription('A list of all global commands');
        helpCommand.setUseTypeWritingAnimation(false);
        helpCommand.setResponseFunction(() => {
            let commandsHelp = '';
            this.Commands.forEach(command => {
                commandsHelp += `${command.getTrigger()} - ${command.getDescription()} \r\n `;
            });
            return commandsHelp;
        });
        this.Commands.push(helpCommand);


        const inventoryCommand = new Command();
        inventoryCommand.setTrigger('inventory');
        inventoryCommand.setDescription('List all items in your inventory.');
        inventoryCommand.setUseTypeWritingAnimation(false);
        inventoryCommand.setResponseFunction(() => {
            if (this.Inventory.getItemCount() <= 0) {
                return this.InventoryEmptyResponse;
            }
            let inventoryContents = 'Items in Inventory: \r\n ';
            this.Inventory.getItems().forEach(item => {
                inventoryContents += `${item.getName()} \r\n `;
            });
            return inventoryContents;
        });
        this.Commands.push(inventoryCommand);


        const sceneCommand = new Command();
        sceneCommand.setTrigger('look around');
        sceneCommand.setDescription('Get a description of the scene you\'re in');
        sceneCommand.setUseTypeWritingAnimation(true);
        sceneCommand.setResponseFunction(() => {
            let description = this.Stage.getCurrentScene().getDescription();
            for (const item of this.Stage.getCurrentScene().getItems()) {
                description += ` ${item.getInSceneDescription()}`;
            }
            return description;
        });

        this.Commands.push(sceneCommand);
    }

    public getStage(): Stage {
        return this.Stage;
    }

    public getInventory(): Inventory {
        return this.Inventory;
    }

    public setInventory(inventory: Inventory): void {
        this.Inventory = inventory;
    }

    public getScenesCount(): number {
        return this.Stage.getScenesCount();
    }

    public getTitle(): string {
        return this.Title;
    }

    public setTitle(title: string): void {
        this.Title = title;
    }

    public getIntroduction(): string {
        return this.Introduction;
    }

    public setIntroduction(intro: string): void {
        this.Introduction = intro;
    }

    public getCommands(): Command[] {
        return this.Commands;
    }

    public setCommands(commands: Command[]): void {
        this.Commands = commands;
    }

    public getItemNotFoundResponse(): string {
        return this.Stage.getCurrentScene().getItemNotFoundResponse();
    }

    public getInvalidInputResponse(): string {
        return this.Stage.getCurrentScene().getInvalidInputResponse();
    }

    public getActionNotRecognizedResponse(): string {
        return this.Stage.getCurrentScene().getActionNotRecognizedResponse();
    }

    public getSceneDescription(): string {
        return this.Stage.getCurrentScene().getDescription();
    }

    public getItemNotFoundInInventoryResponse(): string {
        return this.ItemNotFoundInInventoryResponse;
    }

    public setItemNotFoundInInventoryResponse(response: string): void {
        this.ItemNotFoundInInventoryResponse = response;
    }

    public getActionsInScene(): Action[] {
        return this.Stage.getCurrentScene().getActions();
    }

    public getItemsInScene(): InGameItem[] {
        return this.Stage.getCurrentScene().getItems();
    }

    public getItemsInInventory(): InGameItem[] {
        return this.Inventory.getItems();
    }

    public removeItemFromScene(item: InGameItem): void {
        this.Stage.getCurrentScene().removeItemFromScene(item);
    }

    public addItemToInventory(item: InGameItem): void {
        this.Inventory.addItem(item);
    }

    public removeItemFromInventory(item: InGameItem): void {
        this.Inventory.removeItemFromInventory(item.getID());
    }

    public getItemAddedToInventoryResponse(): string {
        return this.ItemAddedToInventoryResponse;
    }

    public setItemAddedToInventoryResponse(response: string): void {
        this.ItemAddedToInventoryResponse = response;
    }

    public getGatewayTargetNotFoundResponse(): string {
        return this.GatewayTargetNotFoundResponse;
    }

    public setGatewayTargetNotFoundResponse(response: string): void {
        this.GatewayTargetNotFoundResponse = response;
    }

    public getInventoryEmptyResponse(): string {
        return this.InventoryEmptyResponse;
    }

    public setInventoryEmptyResponse(response: string): void {
        this.InventoryEmptyResponse = response;
    }
}
