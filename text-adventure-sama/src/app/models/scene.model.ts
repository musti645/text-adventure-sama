import { InGameItem } from './Item.model';
import { Action } from './actions/action.model';

/**
 * A Scene is a container of actions and Items.
 */
export class Scene {
    ID: number;
    Name: string;
    Description: string;

    ActionNotRecognizedResponse: string;
    ItemNotFoundResponse: string;
    InvalidInputResponse: string;

    Items: InGameItem[];
    Actions: Action[];

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
