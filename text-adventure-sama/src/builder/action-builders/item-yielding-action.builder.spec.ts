import { BuilderError } from 'src/models/errors/builder.error';
import { TestActionBuilder } from 'src/tests/test-action-builder';
import { ItemBuilder } from 'src/builder/item.builder';
import { InGameItem } from 'src/models/item.model';
import { InteractionType } from 'src/models/interactions/interaction-type.enum';
import { ItemYieldingAction } from 'src/models/actions/item-yielding-action.model';
import { ItemYieldingActionBuilder } from 'src/builder/action-builders/item-yielding-action.builder';


describe('ItemYieldingActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: ItemYieldingActionBuilderChild;
    let testAction: ItemYieldingAction;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new ItemYieldingActionBuilderChild(parentBuilder);

        testAction = new ItemYieldingAction();
        testAction.setTrigger('testtrigger');
        testAction.setResponse('testresponse');
        testAction.setResponseAfterUse('testresponseafteruse');
        testAction.setWasTriggered(false);
        testAction.setInteractionType(InteractionType.DO);
        testAction.setItem(new InGameItem());
        testAction.setResetItemUsagesToMaximum(false);
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

    // AmountOfItems
    it('#setAmountOfItems should throw an error when trying to set an undefined AmountOfItems AND not set the Property.', () => {
        expect(() => testBuilder.setAmountOfItems(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getAmountOfItems()).toBe(1);
    });

    it('#setAmountOfItems should throw an error when trying to set a null AmountOfItems AND not set the Property.', () => {
        expect(() => testBuilder.setAmountOfItems(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getAmountOfItems()).toBe(1);
    });

    it('#setAmountOfItems should throw an error when trying to set an invalid AmountOfItems AND not set the Property.', () => {
        expect(() => testBuilder.setAmountOfItems(0)).toThrowError(EvalError);
        expect(testBuilder.getAction().getAmountOfItems()).toBe(1);
    });

    it('#setAmountOfItems should set AmountOfItems to the passed value', () => {
        const amount = 12;
        testBuilder.getAction().setAmountOfItems(testAction.getAmountOfItems());
        testBuilder.setAmountOfItems(amount);
        expect(testBuilder.getAction().getAmountOfItems()).toBe(amount);
    });

    // ResetItemUsagesToMaximum
    it('#setResetItemUsagesToMaximum should throw an error when trying to set undefined ResetItemUsagesToMaximum Property.', () => {
        testBuilder.getAction().setResetItemUsagesToMaximum(true);
        expect(() => testBuilder.setResetItemUsagesToMaximum(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResetItemUsagesToMaximum()).toBeTrue();
    });

    it('#setResetItemUsagesToMaximum should throw an error when trying to set null ResetItemUsagesToMaximum Property.', () => {
        testBuilder.getAction().setResetItemUsagesToMaximum(true);
        expect(() => testBuilder.setResetItemUsagesToMaximum(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResetItemUsagesToMaximum()).toBeTrue();
    });

    it('#setResetItemUsagesToMaximum should set ResetItemUsagesToMaximum to the passed value', () => {
        const reset = true;
        testBuilder.getAction().setResetItemUsagesToMaximum(testAction.getResetItemUsagesToMaximum());
        testBuilder.setResetItemUsagesToMaximum(reset);
        expect(testBuilder.getAction().getResetItemUsagesToMaximum()).toBe(reset);
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

    it('#finish should throw a builder error when trying to finish creation, due to missing ResponseAfterUse'
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
            .setWasTrigered(testAction.getWasTriggered())
            .setResetItemUsagesToMaximum(testAction.getResetItemUsagesToMaximum());
        testBuilder.addItemToBuilder(testAction.getItem());
        testBuilder.finish();

        expect(parentBuilder.Actions.length).toBe(1);

        expect(parentBuilder.Actions[0]).toEqual(testAction);
    });
});

class ItemYieldingActionBuilderChild extends ItemYieldingActionBuilder<TestActionBuilder> {
    public getAction(): ItemYieldingAction {
        return this.Action;
    }
}
