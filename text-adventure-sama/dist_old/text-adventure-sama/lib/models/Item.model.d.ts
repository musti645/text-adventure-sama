import { Inventory } from './inventory.model';
import { Scene } from './scene.model';
/**
 * This class represents an Item in the game.
 */
export declare class InGameItem {
    private ID;
    private Name;
    private Description;
    private MaximumUsages;
    private UsagesLeft;
    private ItemUsedResponse;
    private NoUsagesLeftResponse;
    private CanPickUp;
    private CannotPickUpResponse;
    WasPickedUp: boolean;
    private InSceneDescription;
    private CannotUseItemResponse;
    CanUseFunction(item: this, currentScene: Scene, inventory: Inventory): boolean;
    constructor(id?: number);
    use(): string;
    resetUsages(): void;
    setID(id: number): void;
    getID(): number;
    setName(name: string): void;
    getName(): string;
    setDescription(desc: string): void;
    getDescription(): string;
    setMaximumUsages(usages: number): void;
    getMaximumUsages(): number;
    setUsagesLeft(usages: number): void;
    getUsagesLeft(): number;
    setItemUsedResponse(response: string): void;
    getItemUsedResponse(): string;
    setNoUsagesLeftResponse(response: string): void;
    getNoUsagesLeftResponse(): string;
    getCanPickUp(): boolean;
    setCanPickUp(value: boolean): void;
    setCannotPickUpResponse(response: string): void;
    getCannotPickUpResponse(): string;
    getInSceneDescription(): string;
    setInSceneDescription(descr: string): void;
    setCanUseFunction(func: (item: this, currentScene: Scene, inventory: Inventory) => boolean): void;
    setCannotUseItemResponse(response: string): void;
    getCannotUseItemResponse(): string;
    getCanUseFunction(): (item: this, currentScene: Scene, inventory: Inventory) => boolean;
}
