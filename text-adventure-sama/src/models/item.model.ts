import { Inventory } from './inventory.model';
import { Scene } from './scene.model';

/**
 * This class represents an Item in the game.
 * 
 * Use an ItemBuilder to create an Item step by step.
 */
export class InGameItem {
    private ID: number;
    private Name: string;
    private Description: string;
    private MaximumUsages: number;

    private UsagesLeft: number;

    private ItemUsedResponse: string;
    private NoUsagesLeftResponse: string;

    private CanPickUp: boolean;
    private CannotPickUpResponse: string;
    public WasPickedUp: boolean;

    private InSceneDescription: string;

    private CannotUseItemResponse: string;
    public CanUseFunction(item: this, currentScene: Scene, inventory: Inventory): boolean {
        return true;
    }


    constructor(id?: number) {
        this.ID = id;
        this.CanPickUp = true;
        this.UsagesLeft = -1;
        this.MaximumUsages = -1;
    }

    public use(): string {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
            return this.ItemUsedResponse;
        }
        return this.NoUsagesLeftResponse;
    }


    public resetUsages(): void {
        this.UsagesLeft = this.MaximumUsages;
    }

    public setID(id: number): void {
        this.ID = id;
    }

    public getID(): number {
        return this.ID;
    }

    public setName(name: string): void {
        this.Name = name;
    }

    public getName(): string {
        return this.Name;
    }

    public setDescription(desc: string): void {
        this.Description = desc;
    }

    public getDescription(): string {
        return this.Description;
    }

    public setMaximumUsages(usages: number): void {
        this.MaximumUsages = usages;
    }

    public getMaximumUsages(): number {
        return this.MaximumUsages;
    }

    public setUsagesLeft(usages: number): void {
        this.UsagesLeft = usages;
    }

    public getUsagesLeft(): number {
        return this.UsagesLeft;
    }

    public setItemUsedResponse(response: string): void {
        this.ItemUsedResponse = response;
    }

    public getItemUsedResponse(): string {
        return this.ItemUsedResponse;
    }

    public setNoUsagesLeftResponse(response: string): void {
        this.NoUsagesLeftResponse = response;
    }

    public getNoUsagesLeftResponse(): string {
        return this.NoUsagesLeftResponse;
    }

    public getCanPickUp(): boolean {
        return this.CanPickUp;
    }

    public setCanPickUp(value: boolean): void {
        this.CanPickUp = value;
    }

    public setCannotPickUpResponse(response: string): void {
        this.CannotPickUpResponse = response;
    }

    public getCannotPickUpResponse(): string {
        return this.CannotPickUpResponse;
    }

    public getInSceneDescription(): string {
        return this.InSceneDescription;
    }

    public setInSceneDescription(descr: string): void {
        this.InSceneDescription = descr;
    }

    public setCanUseFunction(func: (item: this, currentScene: Scene, inventory: Inventory) => boolean): void {
        this.CanUseFunction = func;
    }

    public setCannotUseItemResponse(response: string): void {
        this.CannotUseItemResponse = response;
    }

    public getCannotUseItemResponse(): string {
        return this.CannotUseItemResponse;
    }

    public getCanUseFunction(): (item: this, currentScene: Scene, inventory: Inventory) => boolean {
        return this.CanUseFunction;
    }

}
