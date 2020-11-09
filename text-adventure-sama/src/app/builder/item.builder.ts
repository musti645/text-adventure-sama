import { InGameItem } from '../models/Item.model';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { BuilderError } from '../models/errors/builder.error';

export class ItemBuilder<ReturnBuilderType extends ItemContainingBuilder> extends BaseBuilder {
    private Item: InGameItem;
    private Builder: ReturnBuilderType;

    constructor(builder: ReturnBuilderType, item: InGameItem = new InGameItem()) {
        super();
        this.Item = item;
        this.Builder = builder;
    }

    public setName(name: string): this {
        this.Item.Name = name;
        return this;
    }

    public setDescription(description: string): this {
        this.Item.Description = description;
        return this;
    }

    public setMaximumUsages(maxUsages: number): this {
        if (maxUsages <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }

        if (this.Item.UsagesLeft && this.Item.UsagesLeft > maxUsages) {
            throw new EvalError('MaximumUsages Value has to be greater or equal to the UsagesLeft Value');
        }

        this.Item.MaximumUsages = maxUsages;
        return this;
    }

    public setUsagesLeft(usagesLeft: number): this {
        if (usagesLeft <= 0) {
            throw new EvalError('UsagesLeft Value has to be greater than 0.');
        }

        if (this.Item.MaximumUsages && usagesLeft > this.Item.MaximumUsages) {
            throw new EvalError('UsagesLeft Value has to be less or equal to the MaximumUsages Value.');
        }

        this.Item.UsagesLeft = usagesLeft;
        return this;
    }

    public setItemUsedResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemUsedResponse was undefined.');
        }

        this.Item.ItemUsedResponse = response;
        return this;
    }


    public setNoUsagesLeftResponse(response: string): this {
        if (!response) {
            throw new EvalError('NoUsagesLeftResponse was undefined.');
        }

        this.Item.NoUsagesLeftResponse = response;
        return this;
    }

    public finish(): ReturnBuilderType {
        if (!this.Item.Name) {
            throw new BuilderError('Item creation could not be finished. Name was not set.');
        }

        if (!this.Item.Description) {
            throw new BuilderError('Item creation could not be finished. Description was not set.');
        }


        if (!this.Item.ItemUsedResponse) {
            throw new BuilderError('Item creation could not be finished. ItemUsedResponse was not set.');
        }

        if (!this.Item.NoUsagesLeftResponse) {
            throw new BuilderError('Item creation could not be finished. NoUsagesLeftResponse was not set.');
        }

        if (!this.Item.MaximumUsages) {
            this.Item.MaximumUsages = 1;
        }

        if (!this.Item.UsagesLeft) {
            this.Item.UsagesLeft = 1;
        }

        this.Builder.addItemToBuilder(this.Item);
        return this.Builder;
    }
}
