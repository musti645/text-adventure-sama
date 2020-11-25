import { InGameItem } from '../models/Item.model';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { Scene } from '../models/scene.model';
import { Inventory } from '../models/inventory.model';
export declare class ItemBuilder<ReturnBuilderType extends ItemContainingBuilder> extends BaseBuilder {
    protected Item: InGameItem;
    private Builder;
    private RequireInSceneDescription;
    private IsCanUseFunctionReplaced;
    constructor(builder: ReturnBuilderType, item?: InGameItem, requireInSceneDescription?: boolean);
    setName(name: string): this;
    setDescription(description: string): this;
    setMaximumUsages(maxUsages: number): this;
    setUsagesLeft(usagesLeft: number): this;
    setItemUsedResponse(response: string): this;
    setNoUsagesLeftResponse(response: string): this;
    setCanPickUp(value: boolean): this;
    setCannotPickUpResponse(response: string): this;
    setInSceneDescription(descr: string): this;
    setCanUseFunction(func: (item: InGameItem, currentScene: Scene, inventory: Inventory) => boolean): this;
    setCannotUseItemResponse(response: string): this;
    finish(): ReturnBuilderType;
}
