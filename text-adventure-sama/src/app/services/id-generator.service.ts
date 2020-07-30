import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { Action } from '../models/actions/action.model';
import { ItemRemovingAction } from '../models/actions/item-removing-action.model';
import { ItemConsumingAction } from '../models/actions/item-consuming-action.model';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';

/**
 * Assigns IDs to Objects by counting the amount of distinct types
 */
export class IDGeneratorService {
    // What happens if the generator comes across an id, after having assigned the same one already?
    // Solution 1: Track the IDs assigned by the generator and track the conflicts and, once having finished,
    // reitare through all elements get the ones with the conflicted IDs and replace them accordingly with non assigned ones
    // Solution 2: iterate through all objects once, gathering the IDs and types, then reiterate once more and assign the IDs
    // Solution 3: Let the Builders Keep Track of the IDs
    // Solution 4: Use the IDGenerator in the Builders to assign IDs on the go
    private typeArray: TypeCountContainer[] = [];

    public generateIDs(game: Game): void {
        this.processScenes(game.Stage.getScenes());
        this.typeArray = [];
    }


    private processScenes(scenes: Scene[]): void {
        scenes.forEach(element => {
            if (!element.getID) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            } else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }

            this.processActions(element.getActions());
            this.processItems(element.getItems());
        });
    }

    private processActions(actions: Action[]): void {
        actions.forEach(element => {
            if (!element.getID) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            } else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }

            if ((element instanceof ItemRemovingAction ||
                element instanceof ItemConsumingAction ||
                element instanceof ItemYieldingAction)
                && !element.Item.getID()) {
                element.Item.setID(this.getIdFromTypeName(element.constructor.name));
            }
        });
    }

    private processItems(items: InGameItem[]): void {
        items.forEach(element => {
            if (!element.getID()) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            } else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }
        });
    }

    private getIdFromTypeName(name: string): number {
        const index = this.typeArray.findIndex(element => {
            return element.Name === name;
        });

        if (index !== -1) {
            return this.typeArray[index].getAndIncrementCount();
        }


        return this.createTypeCountContainer(name).getAndIncrementCount();
    }

    /**
     * Add the passed id to the corresponding typeNameContainer's usedID Array
     */
    private setUsedIdForTypeName(name: string, id: number): void {
        const index = this.typeArray.findIndex(element => {
            return element.Name === name;
        });

        if (index !== -1) {
            this.typeArray[index].addUsedID(id);
        }

        this.createTypeCountContainer(name).addUsedID(id);
    }

    private createTypeCountContainer(name: string): TypeCountContainer{
        const container = new TypeCountContainer(name);
        this.typeArray.push(container);
        return container;
    }

}

class TypeCountContainer {
    public Name: string;
    public Count: number;
    // keep track of the used ids for each type
    public UsedIDs: number[];

    constructor(name: string) {
        this.Name = name;
        this.Count = 0;
        this.UsedIDs = [];
    }

    getAndIncrementCount(): number {
        this.Count++;
        while (this.isCurrentCountUsed) {
            this.Count++;
        }
        return this.Count;
    }

    addUsedID(usedId: number) {
        this.UsedIDs.push(usedId);
    }

    isCurrentCountUsed(): boolean {
        return this.UsedIDs.filter(element => element === this.Count).length > 0;
    }
}
