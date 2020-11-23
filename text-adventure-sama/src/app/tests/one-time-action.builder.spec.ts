import { TestBed } from '@angular/core/testing';
import { BuilderError } from '../models/errors/builder.error';
import { TestActionBuilder } from './helpers/test-action-builder';
import * as _ from 'lodash';
import { InteractionType } from '../models/interactions/interaction-type.enum';
import { OneTimeAction } from '../models/actions/one-time-action.model';
import { OneTimeActionBuilder } from '../builder/action-builders/one-time-action.builder';

describe('OneTimeActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: OneTimeActionBuilderChild;
    let testAction: OneTimeAction;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new OneTimeActionBuilderChild(parentBuilder);

        testAction = new OneTimeAction();
        testAction.setTrigger('testtrigger');
        testAction.setResponse('testresponse');
        testAction.setWasTriggered(true);
        testAction.setResponseAfterUse('testresponseafteruse');

        TestBed.configureTestingModule({
            providers: [
            ]
        });
    });

    // InteractionType
    it('should throw an error when trying to set a null InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.DO);
    });

    it('should throw an error when trying to set an undefined InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.DO);
    });

    it('should throw an error when trying to set a non-existent InteractionType AND not set the InteractionType.', () => {
        expect(() => testBuilder.setInteractionType(6)).toThrowError(EvalError);
        expect(testBuilder.getAction().getInteractionType()).toBe(InteractionType.DO);
    });

    it('should set the InteractionType to the passed value', () => {
        const type = InteractionType.GO_TO;
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.setInteractionType(type);
        expect(testBuilder.getAction().getInteractionType()).toBe(type);
    });

    // WasTriggered
    it('should throw an error when trying to set a null WasTriggered Attribute.', () => {
        testBuilder.getAction().setWasTriggered(true);
        expect(() => testBuilder.setWasTrigered(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getWasTriggered()).toBeTrue();
    });

    it('should throw an error when trying to set an undefined WasTriggered Attribute.', () => {
        testBuilder.getAction().setWasTriggered(true);
        expect(() => testBuilder.setWasTrigered(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getWasTriggered()).toBeTrue();
    });

    it('should set WasTriggered to the passed value', () => {
        const wasTriggered = false;
        testBuilder.getAction().setWasTriggered(testAction.getWasTriggered());
        testBuilder.setWasTrigered(wasTriggered);
        expect(testBuilder.getAction().getWasTriggered()).toBe(wasTriggered);
    });


    // ResponseAfterUse
    it('should throw an error when trying to set an undefined ResponseAfterUse AND not set the property.', () => {
        testBuilder.getAction().setResponseAfterUse(testAction.getResponseAfterUse());
        expect(() => testBuilder.setResponseAfterUse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponseAfterUse()).toBe(testAction.getResponseAfterUse());
    });

    it('should throw an error when trying to set an empty ResponseAfterUse AND not set the property.', () => {
        expect(() => testBuilder.setResponseAfterUse('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponseAfterUse()).toBeUndefined();
    });

    it('should throw an error when trying to set a null ResponseAfterUse AND not set the property.', () => {
        testBuilder.getAction().setResponseAfterUse(testAction.getResponseAfterUse());
        expect(() => testBuilder.setResponseAfterUse(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponseAfterUse()).toBe(testAction.getResponseAfterUse());
    });

    it('should set ResponseAfterUse to the passed value', () => {
        const response = 'someotherresponse';
        testBuilder.getAction().setResponseAfterUse(testAction.getResponseAfterUse());
        testBuilder.setResponseAfterUse(response);
        expect(testBuilder.getAction().getResponseAfterUse()).toBe(response);
    });

    // finish
    it('should throw a builder error when trying to finish creation without having set ResponseAfterUse AND not finish the building process.', () => {
        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions).toHaveSize(0);
    });

    it('should add action to the parent builder.', () => {
        testBuilder.getAction().setInteractionType(testAction.getInteractionType());
        testBuilder.getAction().setTrigger(testAction.getTrigger());
        testBuilder.getAction().setResponse(testAction.getResponse());
        testBuilder.getAction().setResponseAfterUse(testAction.getResponseAfterUse());
        testBuilder.getAction().setWasTriggered(testAction.getWasTriggered());

        expect(() => testBuilder.finish()).not.toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(1);

        const areEqual = _.isEqual(parentBuilder.Actions[0], testAction);
        expect(areEqual).toBeTrue();
    });
});

class OneTimeActionBuilderChild extends OneTimeActionBuilder<TestActionBuilder> {
    public getAction(): OneTimeAction {
        return this.Action;
    }
}
