/**
 * This class represents an Item in the game.
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

    private InSceneDescription: string;

    // TODO: Function to check, if item is usable in the current context function(scene, item) => bool

    constructor(id?: number) {
        this.ID = id;
        this.CanPickUp = true;
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

}
