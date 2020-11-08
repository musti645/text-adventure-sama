import { Action } from './actions/action.model';
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
    Stage: Stage;
    Inventory: Inventory;

    constructor() {
        this.Stage = new Stage();
        this.Inventory = new Inventory();
    }

    reset() {
        this.Stage.reset();
        this.Inventory.reset();
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
