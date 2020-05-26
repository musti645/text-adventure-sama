import { InGameObject } from './object.model';
import { Action } from './actions/action.model';

/**
 * A Scene is a container of actions and objects.
 */
export class Scene {
    ID: number;
    Name: string;

    Objects: InGameObject[];
    Actions: Action[];
}
