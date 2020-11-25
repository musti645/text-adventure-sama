import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { Action } from '../models/actions/action.model';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';
/**
 * Assigns IDs to Objects by counting the amount of distinct types
 */
export declare class IDGeneratorService {
    private typeArray;
    constructor();
    generateIDs(game: Game): void;
    protected processScenes(scenes: Scene[]): void;
    protected processActions(actions: Action[]): void;
    protected processItems(items: InGameItem[]): void;
    protected getIdFromTypeName(name: string): number;
    addItemId(item: InGameItem): void;
    addSceneId(scene: Scene): void;
    addActionItemId(action: ItemYieldingAction): void;
    /**
     * Add the passed id to the corresponding typeNameContainer's usedID Array
     */
    protected setUsedIdForTypeName(name: string, id: number): void;
    protected createTypeCountContainer(name: string): TypeCountContainer;
    protected getTypeCountContainers(): TypeCountContainer[];
}
export declare class TypeCountContainer {
    Name: string;
    Count: number;
    UsedIDs: number[];
    constructor(name: string);
    getAndIncrementCount(): number;
    addUsedID(usedId: number): void;
    isCurrentCountUsed(): boolean;
    isIdUsed(id: number): boolean;
}
