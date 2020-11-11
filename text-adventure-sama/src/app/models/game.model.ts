import { Action } from './actions/action.model';
import { Command } from './command.model';
import { Inventory } from './inventory.model';
import { InGameItem } from './Item.model';
import { Stage } from './stage.model';

/**
 * Represents the Game.
 */
export class Game {
    Title: string;
    Introduction: string;
    ItemNotFoundInInventoryResponse: string;
    ItemAddedToInventoryResponse: string;
    GatewayTargetNotFoundResponse: string;
    InventoryEmptyResponse: string;
    Stage: Stage;
    Inventory: Inventory;
    Commands: Command[];

    constructor() {
        this.Stage = new Stage();
        this.Inventory = new Inventory();
        this.Commands = [];
        this.initializeCommands();
    }

    private initializeCommands(): void {
        const helpCommand = new Command();
        helpCommand.Trigger = 'help';
        helpCommand.Description = 'A list of all global commands';
        helpCommand.ResponseFunction = () => {
            let commandsHelp = '';
            this.Commands.forEach(command => {
                commandsHelp += `${command.Trigger} - ${command.Description} \r\n `;
            });
            return commandsHelp;
        };
        this.Commands.push(helpCommand);


        const inventoryCommand = new Command();
        inventoryCommand.Trigger = 'inventory';
        inventoryCommand.ResponseFunction = () => {
            if (this.Inventory.getItemCount() <= 0) {
                return this.InventoryEmptyResponse;
            }
            let inventoryContents = 'Items in Inventory: \r\n ';
            this.Inventory.getItems().forEach(item => {
                inventoryContents += `${item.Name} \r\n `;
            });
            return inventoryContents;
        };
        inventoryCommand.Description = 'List all items in your inventory.';
        this.Commands.push(inventoryCommand);


        const sceneCommand = new Command();
        sceneCommand.Trigger = 'look around';
        sceneCommand.ResponseFunction = () => {
            return this.Stage.getCurrentScene().Description;
        };

        sceneCommand.Description = 'Get a description of the scene you\'re in';

        this.Commands.push(sceneCommand);
    }

    public getCommands(): Command[] {
        return this.Commands;
    }

    public getItemNotFoundResponse(): string {
        return this.Stage.getCurrentScene().ItemNotFoundResponse;
    }

    public getInvalidInputResponse(): string {
        return this.Stage.getCurrentScene().InvalidInputResponse;
    }

    public getActionNotRecognizedResponse(): string {
        return this.Stage.getCurrentScene().ActionNotRecognizedResponse;
    }

    public getSceneDescription(): string {
        return this.Stage.getCurrentScene().Description;
    }

    public getItemNotFoundInInventoryResponse(): string {
        return this.ItemNotFoundInInventoryResponse;
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

    public removeItemFromScene(item: InGameItem) {
        this.Stage.getCurrentScene().removeItemFromScene(item);
    }

    public addItemToInventory(item: InGameItem) {
        this.Inventory.addItem(item);
    }


}
