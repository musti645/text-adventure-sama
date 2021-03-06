import { BaseBuilder } from './base.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { ItemBuilder } from './item.builder';
import { InGameItem } from '../models/item.model';
import { BuilderError } from '../models/errors/builder.error';
import { Scene } from '../models/scene.model';
import { Inventory } from '../models/inventory.model';
import { setMaxListeners } from 'process';

describe('ItemBuilder.', () => {
    let parentBuilder: TestItemBuilder;
    let testBuilder: ItemBuilderChild;
    let testItem: InGameItem;
    let inventory: Inventory;

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
    });

    afterEach(() => {
        if(inventory) {
            inventory.unsubscribe();
        }
    })

    // CanUseFunction
    it('#setCanUseFunction should set the CanUseFunction of the Scene to the passed Value', () => {
        testBuilder.setCanUseFunction(testItem.getCanUseFunction());
        expect(testItem.getCanUseFunction()).toBe(testItem.getCanUseFunction());
    });

    // setCannotUse
    it('#setCannotUse should set the CanUseFunction to return false each time and should allow to NOT set the NoUsagesLeftResponse', () => {
        testBuilder.setCannotUse();
        expect(testBuilder.getItem().getCanUseFunction()).toBeDefined();
        const canUseFunction = testBuilder.getItem().getCanUseFunction();
        inventory = new Inventory();
        const result = canUseFunction(testItem, new Scene(), inventory);
        expect(result).toBeFalse();
    });

    // CannotPickUpResponse
    it('#setCannotPickUpResponse should set the CannotPickUpResponse of the Scene to the passed Value', () => {
        testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
        expect(testItem.getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
    });

    it('#setCannotPickUpResponse should throw an error when trying to set an undefined ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
            expect(() => testBuilder.setCannotPickUpResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getItem().getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
        });

    it('#setCannotPickUpResponse should throw an error when trying to set a null ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
            expect(() => testBuilder.setCannotPickUpResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getItem().getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
        });

    it('#setCannotPickUpResponse should throw an error when trying to set an empty ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setCannotPickUpResponse(testItem.getCannotPickUpResponse());
            expect(() => testBuilder.setCannotPickUpResponse('')).toThrowError(EvalError);
            expect(testBuilder.getItem().getCannotPickUpResponse()).toBe(testItem.getCannotPickUpResponse());
        });

    // CannotUseItemResponse
    it('#setCannotUseItemResponse should set the CannotUseItemResponse of the Scene to the passed Value', () => {
        testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
        expect(testItem.getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
    });

    it('#setCannotUseItemResponse should throw an error when trying to set an undefined ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
            expect(() => testBuilder.setCannotUseItemResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getItem().getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
        });

    it('#setCannotUseItemResponse should throw an error when trying to set a null ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
            expect(() => testBuilder.setCannotUseItemResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getItem().getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
        });

    it('#setCannotUseItemResponse should throw an error when trying to set an empty ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setCannotUseItemResponse(testItem.getCannotUseItemResponse());
            expect(() => testBuilder.setCannotUseItemResponse('')).toThrowError(EvalError);
            expect(testBuilder.getItem().getCannotUseItemResponse()).toBe(testItem.getCannotUseItemResponse());
        });

    // Description
    it('#setDescription should set the Description of the Scene to the passed Value', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(testItem.getDescription()).toBe(testItem.getDescription());
    });

    it('#setDescription should throw an error when trying to set an undefined Description AND not set the Property.', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(() => testBuilder.setDescription(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getDescription()).toBe(testItem.getDescription());
    });

    it('#setDescription should throw an error when trying to set a null Description AND not set the Property.', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(() => testBuilder.setDescription(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getDescription()).toBe(testItem.getDescription());
    });

    it('#setDescription should throw an error when trying to set an empty Description AND not set the Property.', () => {
        testBuilder.setDescription(testItem.getDescription());
        expect(() => testBuilder.setDescription('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getDescription()).toBe(testItem.getDescription());
    });


    // InSceneDescription
    it('#setInSceneDescription should set the InSceneDescription of the Scene to the passed Value', () => {
        testBuilder.setInSceneDescription(testItem.getInSceneDescription());
        expect(testItem.getInSceneDescription()).toBe(testItem.getInSceneDescription());
    });

    it('#setInSceneDescription should throw an error when trying to set an undefined ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setInSceneDescription(testItem.getInSceneDescription());
            expect(() => testBuilder.setInSceneDescription(undefined)).toThrowError(EvalError);
            expect(testBuilder.getItem().getInSceneDescription()).toBe(testItem.getInSceneDescription());
        });

    it('#setInSceneDescription should throw an error when trying to set a null ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setInSceneDescription(testItem.getInSceneDescription());
            expect(() => testBuilder.setInSceneDescription(null)).toThrowError(EvalError);
            expect(testBuilder.getItem().getInSceneDescription()).toBe(testItem.getInSceneDescription());
        });

    it('#setInSceneDescription should throw an error when trying to set an empty ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setInSceneDescription(testItem.getInSceneDescription());
            expect(() => testBuilder.setInSceneDescription('')).toThrowError(EvalError);
            expect(testBuilder.getItem().getInSceneDescription()).toBe(testItem.getInSceneDescription());
        });

    // ItemUsedResponse
    it('#setItemUsedResponse should set the ItemUsedResponse of the Scene to the passed Value', () => {
        testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
        expect(testItem.getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
    });

    it('#setItemUsedResponse should throw an error when trying to set an undefined ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
            expect(() => testBuilder.setItemUsedResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getItem().getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
        });

    it('#setItemUsedResponse should throw an error when trying to set a null ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
            expect(() => testBuilder.setItemUsedResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getItem().getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
        });

    it('#setItemUsedResponse should throw an error when trying to set an empty ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setItemUsedResponse(testItem.getItemUsedResponse());
            expect(() => testBuilder.setItemUsedResponse('')).toThrowError(EvalError);
            expect(testBuilder.getItem().getItemUsedResponse()).toBe(testItem.getItemUsedResponse());
        });

    // MaximumUsages
    it('#setMaximumUsages should set the MaximumUsages of the Scene to the passed Value', () => {
        testBuilder.setMaximumUsages(testItem.getMaximumUsages());
        expect(testItem.getMaximumUsages()).toBe(testItem.getMaximumUsages());
    });

    it('#setMaximumUsages should throw an error when trying to set a null MaximumUsages Value AND not set the Property.', () => {
        testBuilder.getItem().setMaximumUsages(testItem.getMaximumUsages());
        expect(() => testBuilder.setMaximumUsages(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBe(testItem.getMaximumUsages());
    });

    it('#setMaximumUsages should throw an error when trying to set an undefined MaximumUsages Value AND not set the Property.', () => {
        testBuilder.getItem().setMaximumUsages(testItem.getMaximumUsages());
        expect(() => testBuilder.setMaximumUsages(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBe(testItem.getMaximumUsages());
    });

    it('#setMaximumUsages should throw an error when trying to set a MaximumUsages Value less than the UsagesLeft Value'
        + ' AND not set the Property.', () => {
            testBuilder.getItem().setUsagesLeft(testItem.getUsagesLeft());
            expect(() => testBuilder.setMaximumUsages(testItem.getUsagesLeft() - 1)).toThrowError(EvalError);
            expect(testBuilder.getItem().getMaximumUsages()).toBe(-1);
        });

    it('#setMaximumUsages should throw an error when trying to set an invalid MaximumUsages Value AND not set the Property.', () => {
        expect(() => testBuilder.setMaximumUsages(-29)).toThrowError(EvalError);
        expect(testBuilder.getItem().getMaximumUsages()).toBe(-1);
    });


    // Name
    it('#setName should set the Name of the Scene to the passed Value', () => {
        testBuilder.setName(testItem.getName());
        expect(testItem.getName()).toBe(testItem.getName());
    });


    it('#setName should throw an error when trying to set an undefined Name AND not set the Property.', () => {
        testBuilder.setName(testItem.getName());
        expect(() => testBuilder.setName(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getName()).toBe(testItem.getName());
    });

    it('#setName should throw an error when trying to set a null Name AND not set the Property.', () => {
        testBuilder.setName(testItem.getName());
        expect(() => testBuilder.setName(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getName()).toBe(testItem.getName());
    });

    it('#setName should throw an error when trying to set an empty Name AND not set the Property.', () => {
        testBuilder.setName(testItem.getName());
        expect(() => testBuilder.setName('')).toThrowError(EvalError);
        expect(testBuilder.getItem().getName()).toBe(testItem.getName());
    });

    // NoUsagesLeftResponse
    it('#setNoUsagesLeftResponse should set the NoUsagesLeftResponse of the Scene to the passed Value', () => {
        testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
        expect(testItem.getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
    });

    it('#setNoUsagesLeftResponse should throw an error when trying to set an undefined ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
            expect(() => testBuilder.setNoUsagesLeftResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getItem().getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
        });

    it('#setNoUsagesLeftResponse should throw an error when trying to set a null ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
            expect(() => testBuilder.setNoUsagesLeftResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getItem().getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
        });

    it('#setNoUsagesLeftResponse should throw an error when trying to set an empty ActionNotRecognizedResponse'
        + ' AND not set the Property.', () => {
            testBuilder.setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());
            expect(() => testBuilder.setNoUsagesLeftResponse('')).toThrowError(EvalError);
            expect(testBuilder.getItem().getNoUsagesLeftResponse()).toBe(testItem.getNoUsagesLeftResponse());
        });

    // UsagesLeft
    it('#setUsagesLeft should set the UsagesLeft of the Scene to the passed Value', () => {
        testBuilder.setUsagesLeft(testItem.getUsagesLeft());
        expect(testItem.getUsagesLeft()).toBe(testItem.getUsagesLeft());
    });

    it('#setUsagesLeft should throw an error when trying to set an invalid UsagesLeft Value AND not set the Property.', () => {
        expect(() => testBuilder.setUsagesLeft(-29)).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBe(-1);
    });

    it('#setUsagesLeft should throw an error when trying to set an undefined UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getItem().setUsagesLeft(testItem.getUsagesLeft());
        expect(() => testBuilder.setUsagesLeft(undefined)).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBe(testItem.getUsagesLeft());
    });

    it('#setUsagesLeft should throw an error when trying to set a null UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getItem().setUsagesLeft(testItem.getUsagesLeft());
        expect(() => testBuilder.setUsagesLeft(null)).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBe(testItem.getUsagesLeft());
    });

    it('#setUsagesLeft should throw an error when trying to set a UsagesLeft Value greater than the MaximumUsages Value.', () => {
        testBuilder.getItem().setMaximumUsages(testItem.getUsagesLeft() - 1);
        expect(() => testBuilder.setUsagesLeft(testItem.getUsagesLeft())).toThrowError(EvalError);
        expect(testBuilder.getItem().getUsagesLeft()).toBe(-1);
    });

    // finish
    it('#finish should throw a builder error when trying to finish creation process of an item without a Name'
        + ' AND not add the item to the parent builder.', () => {
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

    it('#finish should throw a builder error when trying to finish creation process of an item without a Description'
        + ' AND not add the item to the parent builder.', () => {
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

    it('#finish should throw a builder error when trying to finish creation process of an item without a CannotPickUpResponse'
        + ' AND not add the item to the parent builder.', () => {
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

    it('#finish should throw a builder error when trying to finish creation process of an item without a InSceneDescription'
        + ' AND not add the item to the parent builder.', () => {
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

    it('#finish should throw a builder error when trying to finish creation process of an item without a ItemUsedResponse'
        + ' AND not add the item to the parent builder.', () => {
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

    it('#finish should throw a builder error when trying to finish creation process of an item without a NoUsagesLeftResponse'
        + ' AND not add the item to the parent builder.', () => {
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

    it('#finish should throw a builder error when trying to finish creation process of an item without a CannotUseItemResponse'
        + ' AND not add the item to the parent builder.', () => {
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


    it('#finish should create an item with setCannotUse function called but NoUsagesLeftResponse not set'
        + ' AND add it to the parent builder', () => {
            testBuilder
                .setCanPickUp(testItem.getCanPickUp())
                .setCannotPickUpResponse(testItem.getCannotPickUpResponse())
                .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
                .setDescription(testItem.getDescription())
                .setInSceneDescription(testItem.getInSceneDescription())
                .setItemUsedResponse(testItem.getItemUsedResponse())
                .setMaximumUsages(testItem.getMaximumUsages())
                .setName(testItem.getName())
                .setCannotUse()
                .setUsagesLeft(testItem.getUsagesLeft());

            expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
            expect(parentBuilder.Items.length).toBe(1);

            delete (testItem as any).NoUsagesLeftResponse;
            delete (testItem as any).CanUseFunction;
            delete (parentBuilder.Items[0] as any).CanUseFunction;

            expect(parentBuilder.Items[0]).toEqual(testItem);
        });

        it('#finish should create an item with an unset UsagesLeft value AND an unset MaximumUsages value and set both to 1'
        + ' AND add the item to the parent builder', () => {
            testBuilder
                .setCanPickUp(testItem.getCanPickUp())
                .setCanUseFunction(testItem.getCanUseFunction())
                .setCannotPickUpResponse(testItem.getCannotPickUpResponse())
                .setCannotUseItemResponse(testItem.getCannotUseItemResponse())
                .setDescription(testItem.getDescription())
                .setInSceneDescription(testItem.getInSceneDescription())
                .setItemUsedResponse(testItem.getItemUsedResponse())
                .setName(testItem.getName())
                .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());

            expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
            expect(parentBuilder.Items.length).toBe(1);

            testItem.setMaximumUsages(1);
            testItem.setUsagesLeft(1);

            expect(parentBuilder.Items[0]).toEqual(testItem);
        });

        
        it('#finish should create an item with an unset UsagesLeft value and set it to the MaximumUsages value'
        + ' AND add the item to the parent builder', () => {
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
                .setNoUsagesLeftResponse(testItem.getNoUsagesLeftResponse());

            expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
            expect(parentBuilder.Items.length).toBe(1);

            testItem.setUsagesLeft(testItem.getMaximumUsages());

            expect(parentBuilder.Items[0]).toEqual(testItem);
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

    public finish(): void {
    }
}
