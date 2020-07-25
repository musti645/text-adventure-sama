import { InGameItem } from './Item.model';
import { Action } from './actions/action.model';

/**
 * A Scene is a container of actions and Items.
 */
export class Scene {
    ID: number;
    Name: string;
    Description: string;

    Items: InGameItem[];
    Actions: Action[];

    constructor(){
        this.Items = [];
        this.Actions = [];
    }
}
