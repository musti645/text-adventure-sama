import { InGameItem } from './Item.model';
import { Action } from './actions/action.model';
/**
 * A Scene is a container of actions and Items.
 * The player can only be inside one scene at a time.
 */
export declare class Scene {
    private ID;
    private Name;
    private Description;
    private ActionNotRecognizedResponse;
    private ItemNotFoundResponse;
    private InvalidInputResponse;
    private Items;
    private Actions;
    constructor(id?: number);
    setID(id: number): void;
    getID(): number;
    getName(): string;
    setName(name: string): void;
    getDescription(): string;
    setDescription(descr: string): void;
    getActionNotRecognizedResponse(): string;
    setActionNotRecognizedResponse(response: string): void;
    getItemNotFoundResponse(): string;
    setItemNotFoundResponse(response: string): void;
    getInvalidInputResponse(): string;
    setInvalidInputResponse(response: string): void;
    getActions(): Action[];
    getItems(): InGameItem[];
    removeItemFromScene(item: InGameItem): void;
}
