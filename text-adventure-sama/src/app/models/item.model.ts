import { InteractionType } from './interactions/interaction-type.enum';

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

    constructor(id?: number) {
        this.ID = id;
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
}
