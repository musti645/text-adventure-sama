import { BaseActionBuilder, } from '../builder/action-builders/base-action.builder';
import * as _ from 'lodash';
import { Action } from '../models/actions/action.model';
import { TestActionBuilder } from './helpers/test-action-builder';
import { ActionContainingBuilder } from '../builder/interfaces/action-containing.builder';
import { BuilderError } from '../models/errors/builder.error';


describe('BaseActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: BaseActionBuilderChild<TestActionBuilder>;
    let testAction: BaseActionChild;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new BaseActionBuilderChild(parentBuilder);

        testAction = new BaseActionChild();
        testAction.setTrigger('testtrigger');
        testAction.setResponse('testresponse');
        testAction.setAlternativeTriggers(['trigger1', 'trigger2']);
    });

    // Trigger
    it('#setTrigger should throw an error when trying to set an undefined Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        expect(() => testBuilder.setTrigger(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTrigger()).toBe(testAction.getTrigger());
    });

    it('#setTrigger should throw an error when trying to set a null Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        expect(() => testBuilder.setTrigger(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTrigger()).toBe(testAction.getTrigger());
    });

    it('#setTrigger should throw an error when trying to set an empty Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        expect(() => testBuilder.setTrigger('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getTrigger()).toBe(testAction.getTrigger());
    });

    it('#setTrigger should set the Trigger to the passed value', () => {
        const trigger = 'someothertrigger';
        testBuilder.getAction().setTrigger(testAction.getTrigger());
        testBuilder.setTrigger(trigger);
        expect(testBuilder.getAction().getTrigger()).toBe(trigger);
    });

    // Response
    it('#setResponse should throw an error when trying to set an undefined Response AND not set the Property.', () => {
        testBuilder.setResponse(testAction.getResponse());
        expect(() => testBuilder.setResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponse()).toBe(testAction.getResponse());
    });

    it('#setResponse should throw an error when trying to set a null Response AND not set the Property.', () => {
        testBuilder.setResponse(testAction.getResponse());
        expect(() => testBuilder.setResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponse()).toBe(testAction.getResponse());
    });

    it('#setResponse should throw an error when trying to set an empty Response AND not set the Property.', () => {
        testBuilder.setResponse(testAction.getResponse());
        expect(() => testBuilder.setResponse('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponse()).toBe(testAction.getResponse());
    });

    it('#setResponse should set the Response to the passed value', () => {
        const response = 'someresponse';
        testBuilder.getAction().setResponse(testAction.getResponse());
        testBuilder.setResponse(response);
        expect(testBuilder.getAction().getResponse()).toBe(response);
    });

    // AlternativeTriggers
    it('#setAlternativeTriggers should throw an error when trying to set undefined AlternativeTriggers AND not set the Property.', () => {
        testBuilder.setAlternativeTriggers(testAction.getAlternativeTriggers());
        expect(() => testBuilder.setAlternativeTriggers(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getAlternativeTriggers()).toBe(testAction.getAlternativeTriggers());
    });

    it('#setAlternativeTriggers should throw an error when trying to set null AlternativeTriggers AND not set the Property.', () => {
        testBuilder.setAlternativeTriggers(testAction.getAlternativeTriggers());
        expect(() => testBuilder.setAlternativeTriggers(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getAlternativeTriggers()).toBe(testAction.getAlternativeTriggers());
    });

    it('#setAlternativeTriggers should throw an error when trying to set empty AlternativeTriggers AND not set the Property.', () => {
        testBuilder.setAlternativeTriggers(testAction.getAlternativeTriggers());
        expect(() => testBuilder.setAlternativeTriggers([])).toThrowError(EvalError);
        expect(testBuilder.getAction().getAlternativeTriggers()).toBe(testAction.getAlternativeTriggers());
    });

    it('#setAlternativeTriggers should set the AlternativeTriggers to the passed value', () => {
        const triggers = ['someothertrigger', 'triggery'];
        testBuilder.getAction().setAlternativeTriggers(testAction.getAlternativeTriggers());
        testBuilder.setAlternativeTriggers(triggers);
        expect(testBuilder.getAction().getAlternativeTriggers()).toBe(triggers);
    });

    // finish
    it('#finish should throw a builder error when trying to finish creation process of an action without a Trigger AND not add the action to the parent builder.', () => {
        testBuilder.setResponse(testAction.getResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('#finish should throw a builder error when trying to finish creation process of an action without a Response AND not add the action to the parent builder.', () => {
        testBuilder.setTrigger(testAction.getTrigger());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('#finish should add the action to the parent builder.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        testBuilder.setResponse(testAction.getResponse());
        testBuilder.setAlternativeTriggers(testAction.getAlternativeTriggers());
        testBuilder.finish();

        expect(parentBuilder.Actions.length).toBe(1);

        const areEqual = _.isEqual(parentBuilder.Actions[0], testAction);
        expect(areEqual).toBeTrue();
    });

});


class BaseActionBuilderChild<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<BaseActionChild, ReturnBuilderType> {

    public getAction(): BaseActionChild {
        return this.Action;
    }

    constructor(builder: ReturnBuilderType) {
        super(builder, new BaseActionChild());
    }
}

class BaseActionChild extends Action {
    public trigger(): string {
        return this.getResponse();
    }
    public reset(): void {
    }

}
