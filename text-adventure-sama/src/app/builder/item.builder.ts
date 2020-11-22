import { InGameItem } from '../models/Item.model';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { BuilderError } from '../models/errors/builder.error';
import { Scene } from '../models/scene.model';
import { Inventory } from '../models/inventory.model';

export class ItemBuilder<ReturnBuilderType extends ItemContainingBuilder> extends BaseBuilder {
    private Item: InGameItem;
    private Builder: ReturnBuilderType;
    private RequireInSceneDescription: boolean;
    private IsCanUseFunctionReplaced: boolean;

    constructor(builder: ReturnBuilderType, item: InGameItem = new InGameItem(), requireInSceneDescription: boolean = false) {
        super();
        this.Item = item;
        this.Builder = builder;
        this.RequireInSceneDescription = requireInSceneDescription;
    }

    public setName(name: string): this {
        this.Item.setName(name);
        return this;
    }

    public setDescription(description: string): this {
        this.Item.setDescription(description);
        return this;
    }

    public setMaximumUsages(maxUsages: number): this {
        if (maxUsages <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }

        if (this.Item.getUsagesLeft() && this.Item.getUsagesLeft() > maxUsages) {
            throw new EvalError('MaximumUsages Value has to be greater or equal to the UsagesLeft Value');
        }

        this.Item.setMaximumUsages(maxUsages);
        return this;
    }

    public setUsagesLeft(usagesLeft: number): this {
        if (usagesLeft < 0) {
            throw new EvalError('UsagesLeft Value has to be greater than or equal to 0.');
        }

        if (this.Item.getMaximumUsages() && usagesLeft > this.Item.getMaximumUsages()) {
            throw new EvalError('UsagesLeft Value has to be less or equal to the MaximumUsages Value.');
        }

        this.Item.setUsagesLeft(usagesLeft);
        return this;
    }

    public setItemUsedResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemUsedResponse was undefined.');
        }

        this.Item.setItemUsedResponse(response);
        return this;
    }


    public setNoUsagesLeftResponse(response: string): this {
        if (!response) {
            throw new EvalError('NoUsagesLeftResponse was undefined.');
        }

        this.Item.setNoUsagesLeftResponse(response);
        return this;
    }

    public setCanPickUp(value: boolean): this {
        this.Item.setCanPickUp(value);
        return this;
    }

    public setCannotPickUpResponse(response: string): this {
        if (!response) {
            throw new EvalError('CannotPickUpResponse was undefined.');
        }

        this.Item.setCannotPickUpResponse(response);
        return this;
    }

    public setInSceneDescription(descr: string): this {
        if (!descr) {
            throw new EvalError('InSceneDescription was undefined.');
        }

        this.Item.setInSceneDescription(descr);
        return this;
    }

    public setCanUseFunction(func: (item: InGameItem, currentScene: Scene, inventory: Inventory) => boolean): this {
        if (!func) {
            throw new EvalError('CanUseFunction was undefined.');
        }

        this.IsCanUseFunctionReplaced = true;
        this.Item.setCanUseFunction(func);
        return this;
    }

    public setCannotUseItemResponse(response: string): this {
        if (!response) {
            throw new EvalError('CannotUseItemResponse was undefined');
        }

        this.Item.setCannotUseItemResponse(response);
        return this;
    }

    public finish(): ReturnBuilderType {
        if (!this.Item.getName()) {
            throw new BuilderError('Item creation could not be finished. Name was not set.');
        }

        if (!this.Item.getDescription()) {
            throw new BuilderError('Item creation could not be finished. Description was not set.');
        }

        if (this.Item.getUsagesLeft() > 0 && !this.Item.getItemUsedResponse()) {
            throw new BuilderError('Item creation could not be finished. ItemUsedResponse was not set.');
        }

        if (!this.Item.getNoUsagesLeftResponse()) {
            throw new BuilderError('Item creation could not be finished. NoUsagesLeftResponse was not set.');
        }

        if (!this.Item.getCanPickUp() && !this.Item.getCannotPickUpResponse()) {
            throw new BuilderError('Item creation could not be finished. CannotPickUpResponse was not set.');
        }

        // if this item is added to a scene, instead of the inventory or an action, the InSceneDescription has to be set.
        if (this.RequireInSceneDescription && !this.Item.getInSceneDescription()) {
            throw new BuilderError('Item creation could not be finished. InSceneDescription was not set.');
        }

        if (this.IsCanUseFunctionReplaced && !this.Item.getCannotUseItemResponse()) {
            throw new BuilderError('Item creation could not be finished. CannotUseItemResponse was not set.');
        }

        if (this.Item.getMaximumUsages() < 0) {
            this.Item.setMaximumUsages(1);
        }

        if (this.Item.getUsagesLeft() < 0) {
            this.Item.setUsagesLeft(1);
        }

        this.Builder.addItemToBuilder(this.Item);
        return this.Builder;
    }
}
