import { InGameItem } from '../models/item.model';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { BuilderError } from '../models/errors/builder.error';
import { Scene } from '../models/scene.model';
import { Inventory } from '../models/inventory.model';

export class ItemBuilder<ReturnBuilderType extends ItemContainingBuilder> extends BaseBuilder {
    protected Item: InGameItem;
    private Builder: ReturnBuilderType;
    private RequireInSceneDescription: boolean;
    private IsCanUseFunctionReplaced: boolean;
    private ItemCannotBeUsed: boolean;

    constructor(builder: ReturnBuilderType, item: InGameItem = new InGameItem(), requireInSceneDescription: boolean = false) {
        super();
        this.Item = item;
        this.Builder = builder;
        this.RequireInSceneDescription = requireInSceneDescription;
    }

    /**
     * Sets the name of item. The name is used to interact with it.
     */
    public setName(name: string): this {
        if (!name) {
            throw new EvalError('Name was undefined');
        }

        this.Item.setName(name.trim());
        return this;
    }

    /**
     * Sets the description of the item, which is returned when the user "looks at" the item.
     */
    public setDescription(description: string): this {
        if (!description) {
            throw new EvalError('Description was undefined');
        }

        this.Item.setDescription(description.trim());
        return this;
    }

    /**
     * Sets the maximum number of usages, that the item may be used.
     */
    public setMaximumUsages(maxUsages: number): this {
        if (maxUsages === undefined || maxUsages <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }

        if (this.Item.getUsagesLeft() && this.Item.getUsagesLeft() > maxUsages) {
            throw new EvalError('MaximumUsages Value has to be greater or equal to the UsagesLeft Value');
        }

        this.Item.setMaximumUsages(maxUsages);
        return this;
    }

    /**
     * Sets the number of usages left.
     */
    public setUsagesLeft(usagesLeft: number): this {
        if (usagesLeft === undefined || usagesLeft === null || usagesLeft < 0) {
            throw new EvalError('UsagesLeft Value has to be greater than or equal to 0.');
        }

        if (this.Item.getMaximumUsages() && usagesLeft > this.Item.getMaximumUsages()) {
            throw new EvalError('UsagesLeft Value has to be less or equal to the MaximumUsages Value.');
        }

        this.Item.setUsagesLeft(usagesLeft);
        return this;
    }

    /**
     * Sets the response that is returned, each time the item is used
     */
    public setItemUsedResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemUsedResponse was undefined.');
        }

        this.Item.setItemUsedResponse(response.trim());
        return this;
    }


    /**
     * Sets the response that is returned, once the item has no usages left.
     */
    public setNoUsagesLeftResponse(response: string): this {
        if (!response) {
            throw new EvalError('NoUsagesLeftResponse was undefined.');
        }

        this.Item.setNoUsagesLeftResponse(response.trim());
        return this;
    }


    /**
     * Determines if the item can be picked up into the inventory.
     */
    public setCanPickUp(value: boolean): this {
        this.Item.setCanPickUp(value);
        return this;
    }

    /**
     * Sets the response, that is returned, when the item can't be picked up, i.e. when CanPickUp is set to false.
     */
    public setCannotPickUpResponse(response: string): this {
        if (!response) {
            throw new EvalError('CannotPickUpResponse was undefined.');
        }

        this.Item.setCannotPickUpResponse(response.trim());
        return this;
    }

    /**
     * Sets the InSceneDescription of an item. The InSceneDescription is used, when an item is contained in a scene 
     * and the user gets the description of the scene. 
     * All InSceneDescriptions of the items in that scene are concatenated to the scenes description.
     */
    public setInSceneDescription(descr: string): this {
        if (!descr) {
            throw new EvalError('InSceneDescription was undefined.');
        }

        this.Item.setInSceneDescription(descr.trim());
        return this;
    }

    /**
     * Doesn't allow the item to be used.
     * When this is set the NoUsagesLeftResponse does not have to be set.
     */
    public setCannotUse(): this {
        this.Item.setCanUseFunction(() => false);
        this.ItemCannotBeUsed = true;
        return this;
    }

    /**
     * Set the function, that determines if the item can be used in the current context by using the passed parameters.
     * If you don't want the item to be usable, use the setCannotUse method of the builder.
     * @param func Function, that returns a boolean. May have 3 parameters: the current item, the current scene and the inventory
     */
    public setCanUseFunction(func: (item: InGameItem, currentScene: Scene, inventory: Inventory) => boolean): this {
        if (!func) {
            throw new EvalError('CanUseFunction was undefined.');
        }

        this.ItemCannotBeUsed = false;
        this.IsCanUseFunctionReplaced = true;
        this.Item.setCanUseFunction(func);
        return this;
    }

    /**
     * Sets the response, that is returned when the item can't be used, i.e. when the CanUseFunction returns false
     * @param response string that is returned, when the item cannot be used
     */
    public setCannotUseItemResponse(response: string): this {
        if (!response) {
            throw new EvalError('CannotUseItemResponse was undefined');
        }

        this.Item.setCannotUseItemResponse(response.trim());
        return this;
    }

    /**
     * The finish method makes all the necessary checks on the current creation process 
     * and throws errors, if something is undefined or falsy.
     * 
     * It returns the builder, that started this creation process.
     */
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

        if (!this.ItemCannotBeUsed && !this.Item.getNoUsagesLeftResponse()) {
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
