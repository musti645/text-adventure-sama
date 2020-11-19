import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { Action } from '../models/actions/action.model';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';
import { Injectable } from '@angular/core';

/**
 * Assigns IDs to Objects by counting the amount of distinct types
 */
@Injectable({
    providedIn: 'root'
})
export class IDGeneratorService {
    private typeArray: TypeCountContainer[] = [];

    constructor() {

    }

    public generateIDs(game: Game): void {
        this.processScenes(game.getStage().getScenes());
        this.typeArray = [];
    }


    protected processScenes(scenes: Scene[]): void {
        scenes.forEach(element => {
            if (!element.getID()) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            } else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }

            this.processActions(element.getActions());
            this.processItems(element.getItems());
        });
    }

    protected processActions(actions: Action[]): void {
        actions.forEach(element => {
            if ((element instanceof ItemYieldingAction)
                && !element.getItem().getID()) {
                element.getItem().setID(this.getIdFromTypeName(element.constructor.name));
            }
        });
    }

    protected processItems(items: InGameItem[]): void {
        items.forEach(element => {
            if (!element.getID()) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            } else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }
        });
    }

    protected getIdFromTypeName(name: string): number {
        const index = this.typeArray.findIndex(element => {
            return element.Name === name;
        });

        if (index !== -1) {
            return this.typeArray[index].getAndIncrementCount();
        }


        return this.createTypeCountContainer(name).getAndIncrementCount();
    }

    public addItemId(item: InGameItem): void {
        this.setUsedIdForTypeName(item.constructor.name, item.getID());
    }

    public addSceneId(scene: Scene): void {
        this.setUsedIdForTypeName(scene.constructor.name, scene.getID());
    }

    public addActionItemId(action: ItemYieldingAction): void {
        this.setUsedIdForTypeName(action.getItem().constructor.name, action.getItem().getID());
    }

    /**
     * Add the passed id to the corresponding typeNameContainer's usedID Array
     */
    protected setUsedIdForTypeName(name: string, id: number): void {
        const index = this.typeArray.findIndex(element => {
            return element.Name === name;
        });

        if (index !== -1) {
            this.typeArray[index].addUsedID(id);
            return;
        }

        this.createTypeCountContainer(name).addUsedID(id);
    }

    protected createTypeCountContainer(name: string): TypeCountContainer {
        const container = new TypeCountContainer(name);
        this.typeArray.push(container);
        return container;
    }

    protected getTypeCountContainers(): TypeCountContainer[] {
        return this.typeArray;
    }

}

export class TypeCountContainer {
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
        while (this.isCurrentCountUsed()) {
            this.Count++;
        }
        this.addUsedID(this.Count);
        return this.Count;
    }

    addUsedID(usedId: number) {
        if (this.isIdUsed(usedId)) {
            throw new EvalError('Id is already being used.');
        }
        this.UsedIDs.push(usedId);
    }

    isCurrentCountUsed(): boolean {
        return this.UsedIDs.filter(element => element === this.Count).length > 0;
    }

    isIdUsed(id: number): boolean {
        return !(!this.UsedIDs.find(element => element === id));
    }
}
