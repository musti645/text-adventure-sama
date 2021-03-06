import { BuilderError } from '../../models/errors/builder.error';
import { TestActionBuilder } from './test-action.builder';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { RandomResponseAction } from '../../models/actions/random-response-action.model';
import { RandomResponseActionBuilder } from './random-response-action.builder';


describe('RandomResponseActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: RandomResponseActionBuilderChild;
    let testAction: RandomResponseAction;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new RandomResponseActionBuilderChild(parentBuilder);

        testAction = new RandomResponseAction();
        testAction.setTrigger('testtrigger');
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
    it('#finish should throw a builder error when trying to finish an action without having set Responses', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('#finish should add action to parent builder.', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.getAction().setResponses(testAction.getResponses());
        testBuilder.getAction().setTrigger(testAction.getTrigger());

        expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(1);

        expect(parentBuilder.Actions[0]).toEqual(testAction);
    });
});

class RandomResponseActionBuilderChild extends RandomResponseActionBuilder<TestActionBuilder> {
    public getAction(): RandomResponseAction {
        return this.Action;
    }
}
