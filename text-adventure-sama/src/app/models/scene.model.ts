import { InGameItem } from './Item.model';
import { Action } from './actions/action.model';

/**
 * A Scene is a container of actions and Items.
 * The player can only be inside one scene at a time.
 */
export class Scene {
    private ID: number;
    private Name: string;
    private Description: string;

    private ActionNotRecognizedResponse: string;
    private ItemNotFoundResponse: string;
    private InvalidInputResponse: string;

    private Items: InGameItem[];
    private Actions: Action[];

    constructor(id?: number) {
        this.ID = id;

        this.Items = [];
        this.Actions = [];
    }

    public setID(id: number) {
        this.ID = id;
    }

    public getID(): number {
        return this.ID;
    }

    public getName(): string {
        return this.Name;
    }

    public setName(name: string): void {
        this.Name = name;
    }

    public getDescription(): string {
        return this.Description;
    }

    public setDescription(descr: string): void {
        this.Description = descr;
    }

    public getActionNotRecognizedResponse(): string {
        return this.ActionNotRecognizedResponse;
    }

    public setActionNotRecognizedResponse(response: string): void {
        this.ActionNotRecognizedResponse = response;
    }

    public getItemNotFoundResponse(): string {
        return this.ItemNotFoundResponse;
    }

    public setItemNotFoundResponse(response: string): void {
        this.ItemNotFoundResponse = response;
    }

    public getInvalidInputResponse(): string {
        return this.InvalidInputResponse;
    }

    public setInvalidInputResponse(response: string): void {
        this.InvalidInputResponse = response;
    }

    public getActions(): Action[] {
        return this.Actions;
    }

    public getItems(): InGameItem[] {
        return this.Items;
    }

    public removeItemFromScene(item: InGameItem) {
        const index = this.Items.indexOf(item);
        if (index > -1) {
            this.Items.splice(index, 1);
        }
    }
}
