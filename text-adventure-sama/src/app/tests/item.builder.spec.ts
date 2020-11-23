import { TestBed } from '@angular/core/testing';
import { BaseBuilder } from '../builder/base.builder';
import { ItemContainingBuilder } from '../builder/interfaces/item-containing.builder';
import { ItemBuilder } from '../builder/item.builder';
import { InGameItem } from '../models/Item.model';
import * as _ from 'lodash';
import { BuilderError } from '../models/errors/builder.error';

describe('ItemBuilder.', () => {
    let parentBuilder: TestItemBuilder;
    let testBuilder: ItemBuilderChild;
    let testItem: InGameItem;

    beforeEach(() => {
        parentBuilder = new TestItemBuilder();
        testBuilder = new ItemBuilderChild(parentBuilder, undefined, true);

        testItem = new InGameItem();
        testItem.setCanPickUp(true);
        testItem.setCanUseFunction((item, currentScene) => true);
        testItem.setCannotPickUpResponse('cannotpickup');
        testItem.setCannotUseItemResponse('cannotuseitem');
        testItem.setDescription('description');
        testItem.setID(undefined);
        testItem.setInSceneDescription('inscenedescription');
        testItem.setItemUsedResponse('itemused');
        testItem.setMaximumUsages(3);
        testItem.setName('name');
        testItem.setNoUsagesLeftResponse('nousagesleft');
        testItem.setUsagesLeft(2);

        TestBed.configureTestingModule({
            providers: [
            ]
        });
    });

    // CanUseFunction
    it('should set the CanUseFunction of the Scene to the passed Value', () => {
        testBuilder.setCanUseFunction(testItem.getCanUseFunction());
        expect(testItem.getCanUseFunction()).toBe(testItem.getCanUseFunction());
    });

    // CannotPickUpResponse
    it('should set the CannotPickUpResponse of the Scene to the passed Value', () => {
        testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
        expect(testItem.getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
    });

    it('should throw an error when trying to set an undefined ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
        expect(() => testBuilder.setCannotPickUpResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
    });

    it('should throw an error when trying to set a null ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
        expect(() => testBuilder.setCannotPickUpResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
    });

    it('should throw an error when trying to set an empty ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
        expect(() => testBuilder.setCannotPickUpResponse('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
    });

    // CannotUseItemResponse
    it('should set the CannotUseItemResponse of the Scene to the passed Value', () => {
        testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
        expect(testItem.getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
    });

    it('should throw an error when trying to set an undefined ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
        expect(() => testBuilder.setCannotUseItemResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
    });

    it('should throw an error when trying to set a null ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
        expect(() => testBuilder.setCannotUseItemResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
    });

    it('should throw an error when trying to set an empty ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
        expect(() => testBuilder.setCannotUseItemResponse('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
    });

    // Description
    it('should set the Description of the Scene to the passed Value', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(testItem.getDescription()).toBe(testItem.getDescription());
    });

    it('should throw an error when trying to set an undefined Description AND not set the Property.', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(() => testBuilder.setDescription(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getDescription()).toBe(testItem.getDescription());
    });

    it('should throw an error when trying to set a null Description AND not set the Property.', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(() => testBuilder.setDescription(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getDescription()).toBe(testItem.getDescription());
    });

    it('should throw an error when trying to set an empty Description AND not set the Property.', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(() => testBuilder.setDescription('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getDescription()).toBe(testItem.getDescription());
    });


    // InSceneDescription
    it('should set the InSceneDescription of the Scene to the passed Value', () => {
        testBuilder.setInSceneDescription(testItem.getInSceneDescription());
        expect(testItem.getInSceneDescription()).toBe(testItem.getInSceneDescription());
    });

    it('should throw an error when trying to set an undefined ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setInSceneDescription(testItem.getInSceneDescription());
        expect(() => testBuilder.setInSceneDescription(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getInSceneDescription()).toBe(testItem.getInSceneDescription());
    });

    it('should throw an error when trying to set a null ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setInSceneDescription(testItem.getInSceneDescription());
        expect(() => testBuilder.setInSceneDescription(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getInSceneDescription()).toBe(testItem.getInSceneDescription());
    });

    it('should throw an error when trying to set an empty ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setInSceneDescription(testItem.getInSceneDescription());
        expect(() => testBuilder.setInSceneDescription('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getInSceneDescription()).toBe(testItem.getInSceneDescription());
    });

    // ItemUsedResponse
    it('should set the ItemUsedResponse of the Scene to the passed Value', () => {
        testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
        expect(testItem.getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
    });

    it('should throw an error when trying to set an undefined ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
        expect(() => testBuilder.setItemUsedResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
    });

    it('should throw an error when trying to set a null ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
        expect(() => testBuilder.setItemUsedResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
    });

    it('should throw an error when trying to set an empty ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
        expect(() => testBuilder.setItemUsedResponse('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
    });

    // MaximumUsages
    it('should set the MaximumUsages of the Scene to the passed Value', () => {
        testBuilder.setMaximumUsages(testItem.getMaximumUsages());
        expect(testItem.getMaximumUsages()).toBe(testItem.getMaximumUsages());
    });

    it('should throw an error when trying to set a null MaximumUsages Value AND not set the Property.', () => {
        testBuilder.getItem().setMaximumUsages(testItem.getMaximumUsages());
        expect(() => testBuilder.setMaximumUsages(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBe(testItem.getMaximumUsages());
    });

    it('should throw an error when trying to set an undefined MaximumUsages Value AND not set the Property.', () => {
        testBuilder.getItem().setMaximumUsages(testItem.getMaximumUsages());
        expect(() => testBuilder.setMaximumUsages(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBe(testItem.getMaximumUsages());
    });

    it('should throw an error when trying to set a MaximumUsages Value less than the UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getItem().setUsagesLeft(testItem.getUsagesLeft());
        expect(() => testBuilder.setMaximumUsages(testItem.getUsagesLeft() - 1)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBeUndefined();
    });

    it('should throw an error when trying to set an invalid MaximumUsages Value AND not set the Property.', () => {
        expect(() => testBuilder.setMaximumUsages(-29)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBeUndefined();
    });


    // Name
    it('should set the Name of the Scene to the passed Value', () => {
        testBuilder.setName(testItem.getName());
        expect(testItem.getName()).toBe(testItem.getName());
    });


    it('should throw an error when trying to set an undefined Name AND not set the Property.', () => {
        testBuilder.setName(testItem.getName());
        expect(() => testBuilder.setName(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getName()).toBe(testItem.getName());
    });

    it('should throw an error when trying to set a null Name AND not set the Property.', () => {
        testBuilder.setName(testItem.getName());
        expect(() => testBuilder.setName(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getName()).toBe(testItem.getName());
    });

    it('should throw an error when trying to set an empty Name AND not set the Property.', () => {
        testBuilder.setName(testItem.getName());
        expect(() => testBuilder.setName('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getName()).toBe(testItem.getName());
    });

    // NoUsagesLeftResponse
    it('should set the NoUsagesLeftResponse of the Scene to the passed Value', () => {
        testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
        expect(testItem.getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
    });

    it('should throw an error when trying to set an undefined ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
        expect(() => testBuilder.setNoUsagesLeftResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
    });

    it('should throw an error when trying to set a null ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
        expect(() => testBuilder.setNoUsagesLeftResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
    });

    it('should throw an error when trying to set an empty ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
        expect(() => testBuilder.setNoUsagesLeftResponse('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
    });

    // UsagesLeft
    it('should set the UsagesLeft of the Scene to the passed Value', () => {
        testBuilder.setUsagesLeft(testItem.getUsagesLeft());
        expect(testItem.getUsagesLeft()).toBe(testItem.getUsagesLeft());
    });

    it('should throw an error when trying to set an invalid UsagesLeft Value AND not set the Property.', () => {
        expect(() => testBuilder.setUsagesLeft(-29)).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBeUndefined();
    });

    it('should throw an error when trying to set an undefined UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getItem().setUsagesLeft(testItem.getUsagesLeft());
        expect(() => testBuilder.setUsagesLeft(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBe(testItem.getUsagesLeft());
    });

    it('should throw an error when trying to set a null UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getItem().setUsagesLeft(testItem.getUsagesLeft());
        expect(() => testBuilder.setUsagesLeft(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBe(testItem.getUsagesLeft());
    });

    it('should throw an error when trying to set a UsagesLeft Value greater than the MaximumUsages Value.', () => {
        testBuilder.getItem().setMaximumUsages(testItem.getUsagesLeft() - 1);
        expect(() => testBuilder.setUsagesLeft(testItem.getUsagesLeft())).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBeUndefined();
    });

    // finish
    it('should throw a builder error when trying to finish creation process of an scene without a Name AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotPickUpResponse(testItem.getCannotPickUpResponse())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setDescription(testItem.getDescription())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a Description AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotPickUpResponse(testItem.getCannotPickUpResponse())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a CannotPickUpResponse AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(false)
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setDescription(testItem.getDescription())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a InSceneDescription AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setDescription(testItem.getDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());


        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a ItemUsedResponse AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setDescription(testItem.getDescription())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a NoUsagesLeftResponse AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setDescription(testItem.getDescription())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a CannotUseItemResponse AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotPickUpResponse(testItem.getCannotPickUpResponse())
            .setDescription(testItem.getDescription())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(0);
    });


    it('should throw a builder error when trying to finish creation process of an scene without a CannotUseItemResponse AND not add the scene to the parent builder.', () => {
        testBuilder
            .setCanPickUp(testItem.getCanPickUp())
            .setCanUseFunction(testItem.getCanUseFunction())
            .setCannotPickUpResponse(testItem.getCannotPickUpResponse())
            .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
            .setDescription(testItem.getDescription())
            .setInSceneDescription(testItem.getInSceneDescription())
            .setItemUsedResponse(testItem.getItemUsedResponse())
            .setMaximumUsages(testItem.getMaximumUsages())
            .setName(testItem.getName())
            .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse())
            .setUsagesLeft(testItem.getUsagesLeft());

        expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
        expect(parentBuilder.Items.length).toBe(1);

        const areEqual = _.isEqual(parentBuilder.Items[0], testItem);
        expect(areEqual).toBeTrue();
    });
});

class ItemBuilderChild extends ItemBuilder<TestItemBuilder> {
    public getItem(): InGameItem {
        return this.Item;
    }
}


class TestItemBuilder extends BaseBuilder implements ItemContainingBuilder {
    public Items: InGameItem[] = [];

    addItemToBuilder(item: InGameItem): void {
        this.Items.push(item);
    }

    addItem(item?: InGameItem): ItemBuilder<ItemContainingBuilder> {
        return new ItemBuilder<TestItemBuilder>(this, undefined, true);
    }

    public finish() {
    }
}
