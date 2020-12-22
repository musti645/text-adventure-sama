import { BuilderError } from '../../models/errors/builder.error';
import { TestActionBuilder } from './test-action.builder';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { MultiTimeAction } from '../../models/actions/multi-time-action.model';
import { MultiTimeActionBuilder } from './multi-time-action.builder';


describe('MultiTimeActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: MultiTimeActionBuilderChild;
    let testAction: MultiTimeAction;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new MultiTimeActionBuilderChild(parentBuilder);

        testAction = new MultiTimeAction();
        testAction.setTrigger('testtrigger');
        testAction.setResponse('testresponse');
        testAction.setUsagesLeft(2);
        testAction.setMaximumUsages(3);
        testAction.setResponses(['response1', 'response2']);
    });


    // InteractionType
    it('#setInteractionType should throw an error when trying to set a null InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.DO);
    });

    it('#setInteractionType should throw an error when trying to set an undefined InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.DO);
    });

    it('#setInteractionType should throw an error when trying to set a non-existent InteractionType'
        + ' AND not set the InteractionType.', () => {
            expect(() => testBuilder.setInteractionType(6)).toThrowError(EvalError);
            expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.DO);
        });

    it('#setInteractionType should set the InteractionType to the passed value', () => {
        const type = InteractionType.GO_TO;
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.setInteractionType(type);
        expect(testBuilder.getAction().getInteractionType()).toBe(type);
    });

    // UsagesLeft
    it('#setUsagesLeft should throw an error when trying to set an invalid UsagesLeft Value AND not set the Property.', () => {
        expect(() => testBuilder.setUsagesLeft(-29)).toThrowError(EvalError);
        expect(testBuilder.getAction().getUsagesLeft()).toBeUndefined();
    });

    it('#setUsagesLeft should throw an error when trying to set an undefined UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());
        expect(() => testBuilder.setUsagesLeft(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getUsagesLeft()).toBe(testAction.getUsagesLeft());
    });

    it('#setUsagesLeft should throw an error when trying to set a null UsagesLeft Value AND not set the Property.', () => {
        testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());
        expect(() => testBuilder.setUsagesLeft(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getUsagesLeft()).toBe(testAction.getUsagesLeft());
    });

    it('#setUsagesLeft should throw an error when trying to set a UsagesLeft Value greater than the MaximumUsages Value.', () => {
        testBuilder.getAction().setMaximumUsages(testAction.getUsagesLeft() - 1);
        expect(() => testBuilder.setUsagesLeft(testAction.getUsagesLeft())).toThrowError(EvalError);
        expect(testBuilder.getAction().getUsagesLeft()).toBeUndefined();
    });

    it('#setUsagesLeft should set UsagesLeft to the passed value', () => {
        const usages = 12;
        testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());
        testBuilder.setUsagesLeft(usages);
        expect(testBuilder.getAction().getUsagesLeft()).toBe(usages);
    });


    // MaximumUsages
    it('#setMaximumUsages should throw an error when trying to set a null MaximumUsages Value AND not set the Property.', () => {
        testBuilder.getAction().setMaximumUsages(testAction.getMaximumUsages());
        expect(() => testBuilder.setMaximumUsages(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getMaximumUsages()).toBe(testAction.getMaximumUsages());
    });

    it('#setMaximumUsages should throw an error when trying to set an undefined MaximumUsages Value AND not set the Property.', () => {
        testBuilder.getAction().setMaximumUsages(testAction.getMaximumUsages());
        expect(() => testBuilder.setMaximumUsages(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getMaximumUsages()).toBe(testAction.getMaximumUsages());
    });

    it('#setMaximumUsages should throw an error when trying to set a MaximumUsages Value less than the UsagesLeft Value'
        + ' AND not set the Property.', () => {
            testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());
            expect(() => testBuilder.setMaximumUsages(testAction.getUsagesLeft() - 1)).toThrowError(EvalError);
            expect(testBuilder.getAction().getMaximumUsages()).toBeUndefined();
        });

    it('#setMaximumUsages should throw an error when trying to set an invalid MaximumUsages Value AND not set the Property.', () => {
        expect(() => testBuilder.setMaximumUsages(-29)).toThrowError(EvalError);
        expect(testBuilder.getAction().getMaximumUsages()).toBeUndefined();
    });

    it('#setMaximumUsages should throw an error when trying to set a MaximumUsages Value less in size than the Responses Array Length'
        + ' AND not set the Property.', () => {
            testBuilder.getAction().setResponses(testAction.getResponses());
            expect(() => testBuilder.setMaximumUsages(testAction.getResponses().length - 1)).toThrowError(EvalError);
            expect(testBuilder.getAction().getMaximumUsages()).toBeUndefined();
        });

    it('#setMaximumUsages should set MaximumUsages to the passed value', () => {
        const usages = 24;
        testBuilder.getAction().setMaximumUsages(testAction.getMaximumUsages());
        testBuilder.setMaximumUsages(usages);
        expect(testBuilder.getAction().getMaximumUsages()).toBe(usages);
    });

    // Responses
    it('#setResponses should throw an error when trying to set an undefined Responses Array and not set the property.', () => {
        testBuilder.getAction().setResponses(testAction.getResponses());
        expect(() => testBuilder.setResponses(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponses()).toBeDefined();
    });

    it('#setResponses should throw an error when trying to set a null Responses Array and not set the property.', () => {
        testBuilder.getAction().setResponses(testAction.getResponses());
        expect(() => testBuilder.setResponses(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponses()).toBeDefined();
    });

    it('#setResponses should throw an error when trying to set an empty Responses Array and not set the property.', () => {
        testBuilder.getAction().setResponses(testAction.getResponses());
        expect(() => testBuilder.setResponses([])).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponses()).toBeDefined();
    });

    it('#setResponses should set Responses Array to the passed value', () => {
        const responses = ['someresponse'];
        testBuilder.getAction().setResponses(testAction.getResponses());
        testBuilder.setResponses(responses);

        expect(testBuilder.getAction().getResponses()).toEqual(responses);
    });


    // finish
    it('#finish should throw a builder error when trying to finish an action without having set UsagesLeft', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.getAction().setMaximumUsages(testAction.getMaximumUsages());
        testBuilder.getAction().setResponses(testAction.getResponses());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('#finish should throw a builder error when trying to finish an action without having set MaximumUsages', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.getAction().setResponses(testAction.getResponses());
        testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('#finish should throw a builder error when trying to finish an action without having set Responses', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.getAction().setMaximumUsages(testAction.getMaximumUsages());
        testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('#finish should add the action to the parent builder', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.getAction().setMaximumUsages(testAction.getMaximumUsages());
        testBuilder.getAction().setResponses(testAction.getResponses());
        testBuilder.getAction().setUsagesLeft(testAction.getUsagesLeft());
        testBuilder.getAction().setTrigger(testAction.getTrigger());
        testBuilder.getAction().setResponse(testAction.getResponse());

        expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(1);

        expect(parentBuilder.Actions[0]).toEqual(testAction);
    });

});

class MultiTimeActionBuilderChild extends MultiTimeActionBuilder<TestActionBuilder> {
    public getAction(): MultiTimeAction {
        return this.Action;
    }
}
