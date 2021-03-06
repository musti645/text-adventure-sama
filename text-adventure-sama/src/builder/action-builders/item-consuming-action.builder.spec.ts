import { BuilderError } from '../../models/errors/builder.error';
import { TestActionBuilder } from './test-action.builder';
import { ItemConsumingAction } from '../../models/actions/item-consuming-action.model';
import { ItemBuilder } from '../item.builder';
import { InGameItem } from '../../models/item.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { ItemConsumingActionBuilder } from './item-consuming-action.builder';

describe('ItemConsumingActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: ItemConsumingActionBuilderChild;
    let testAction: ItemConsumingAction;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new ItemConsumingActionBuilderChild(parentBuilder);

        testAction = new ItemConsumingAction();
        testAction.setTrigger('testtrigger');
        testAction.setResponse('testresponse');
        testAction.setResponseAfterUse('testresponseafteruse');
        testAction.setWasTriggered(false);
        testAction.setInteractionType(InteractionType.DO);
        testAction.setItem(new InGameItem());
    });

    // InteractionType
    it('#setInteractionType should throw an error when trying to set a null InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.USE);
    });

    it('#setInteractionType should throw an error when trying to set an undefined InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.USE);
    });

    it('#setInteractionType should throw an error when trying to set a non-existent InteractionType'
        + ' AND not set the InteractionType.', () => {
            expect(() => testBuilder.setInteractionType(6)).toThrowError(EvalError);
            expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.USE);
        });

    it('#setInteractionType should set the InteractionType to the passed value', () => {
        const type = InteractionType.GO_TO;
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.setInteractionType(type);
        expect(testBuilder.getAction().getInteractionType()).toBe(type);
    });

    // WasTriggered
    it('#setWasTriggered should throw an error when trying to set a null WasTriggered Attribute.', () => {
        testBuilder.getAction().setWasTriggered(true);
        expect(() => testBuilder.setWasTrigered(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getWasTriggered()).toBeTrue();
    });

    it('#setWasTriggered should throw an error when trying to set an undefined WasTriggered Attribute.', () => {
        testBuilder.getAction().setWasTriggered(true);
        expect(() => testBuilder.setWasTrigered(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getWasTriggered()).toBeTrue();
    });

    it('#setWasTriggered should set WasTriggered to the passed value', () => {
        const wasTriggered = false;
        testBuilder.getAction().setWasTriggered(testAction.getWasTriggered());
        testBuilder.setWasTrigered(wasTriggered);
        expect(testBuilder.getAction().getWasTriggered()).toBe(wasTriggered);
    });

    // ResponseAfterUse
    it('#setResponseAfterUse should throw an error when trying to set an undefined ResponseAfterUse AND not set the property.', () => {
        testBuilder.getAction().setResponseAfterUse(testAction.getResponseAfterUse());
        expect(() => testBuilder.setResponseAfterUse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponseAfterUse()).toBe(testAction.getResponseAfterUse());
    });

    it('#setResponseAfterUse should throw an error when trying to set an empty ResponseAfterUse AND not set the property.', () => {
        expect(() => testBuilder.setResponseAfterUse('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponseAfterUse()).toBeUndefined();
    });

    it('#setResponseAfterUse should throw an error when trying to set a null ResponseAfterUse AND not set the property.', () => {
        expect(() => testBuilder.setResponseAfterUse(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponseAfterUse()).toBeUndefined();
    });

    it('#setResponseAfterUse should set ResponseAfterUse to the passed value', () => {
        const response = 'someotherresponse';
        testBuilder.getAction().setResponseAfterUse(testAction.getResponseAfterUse());
        testBuilder.setResponseAfterUse(response);
        expect(testBuilder.getAction().getResponseAfterUse()).toBe(response);
    });

    // addItemToBuilder
    it('#addItemToBuilder should throw an error when trying to add an undefined Item to the action AND not add it.', () => {
        testBuilder.getAction().setItem(testAction.getItem());
        expect(() => testBuilder.addItemToBuilder(undefined)).toThrowError(BuilderError);
        expect(testBuilder.getAction().getItem()).toBeDefined();
    });

    it('#addItemToBuilder should throw an error when trying to add a null Item to the action AND not add it.', () => {
        testBuilder.getAction().setItem(testAction.getItem());
        expect(() => testBuilder.addItemToBuilder(null)).toThrowError(BuilderError);
        expect(testBuilder.getAction().getItem()).toBeDefined();
    });

    it('#addItemToBuilder should add the passed item to the action', () => {
        const item = new InGameItem(239);
        item.setName('item');

        testBuilder.getAction().setItem(testAction.getItem());
        testBuilder.addItemToBuilder(item);

        expect(testBuilder.getAction().getItem()).toEqual(item);
    });

    // addItem
    it('#addItem should return an ItemBuilder when calling addItem.', () => {
        const itemBuilder = testBuilder.addItem();
        expect(itemBuilder).toBeInstanceOf(ItemBuilder);
    });

    // finish
    it('#finish should throw a builder error when trying to finish creation, due to missing item'
        + ' AND not finish the building process.', () => {
            testBuilder.setTrigger(testAction.getTrigger())
                .setResponse(testAction.getResponse())
                .setInteractionType(testAction.getInteractionType())
                .setResponseAfterUse(testAction.getResponseAfterUse())
                .setWasTrigered(testAction.getWasTriggered());

            expect(() => testBuilder.finish()).toThrowError(BuilderError);
            expect(parentBuilder.Actions.length).toBe(0);
        });

    it('#finish should throw a builder error when trying to finish creation, due to missing ResponseAfterUse '
        + ' AND not finish the building process.', () => {
            testBuilder.setTrigger(testAction.getTrigger())
                .setResponse(testAction.getResponse())
                .setInteractionType(testAction.getInteractionType())
                .setWasTrigered(testAction.getWasTriggered());
            testBuilder.addItemToBuilder(testAction.getItem());

            expect(() => testBuilder.finish()).toThrowError(BuilderError);
            expect(parentBuilder.Actions.length).toBe(0);
        });


    it('#finish should add the action to the parent builder with everything set.', () => {
        testBuilder.setTrigger(testAction.getTrigger())
            .setResponse(testAction.getResponse())
            .setInteractionType(testAction.getInteractionType())
            .setResponseAfterUse(testAction.getResponseAfterUse())
            .setWasTrigered(testAction.getWasTriggered());
        testBuilder.addItemToBuilder(testAction.getItem());
        testBuilder.finish();

        expect(parentBuilder.Actions.length).toBe(1);

        expect(testBuilder.getAction()).toEqual(testAction);
    });

});

class ItemConsumingActionBuilderChild extends ItemConsumingActionBuilder<TestActionBuilder> {
    public getAction(): ItemConsumingAction {
        return this.Action;
    }
}
