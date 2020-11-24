import { TestBed } from '@angular/core/testing';
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

        TestBed.configureTestingModule({
            providers: [
            ]
        });
    });

    // Trigger
    it('should throw an error when trying to set an undefined Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        expect(() => testBuilder.setTrigger(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTrigger()).toBe(testAction.getTrigger());
    });

    it('should throw an error when trying to set a null Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        expect(() => testBuilder.setTrigger(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTrigger()).toBe(testAction.getTrigger());
    });

    it('should throw an error when trying to set an empty Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        expect(() => testBuilder.setTrigger('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getTrigger()).toBe(testAction.getTrigger());
    });

    it('should set the Trigger to the passed value', () => {
        const trigger = 'someothertrigger';
        testBuilder.getAction().setTrigger(testAction.getTrigger());
        testBuilder.setTrigger(trigger);
        expect(testBuilder.getAction().getTrigger()).toBe(trigger);
    });

    // Response
    it('should throw an error when trying to set an undefined Response AND not set the Property.', () => {
        testBuilder.setResponse(testAction.getResponse());
        expect(() => testBuilder.setResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponse()).toBe(testAction.getResponse());
    });

    it('should throw an error when trying to set a null Response AND not set the Property.', () => {
        testBuilder.setResponse(testAction.getResponse());
        expect(() => testBuilder.setResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponse()).toBe(testAction.getResponse());
    });

    it('should throw an error when trying to set an empty Response AND not set the Property.', () => {
        testBuilder.setResponse(testAction.getResponse());
        expect(() => testBuilder.setResponse('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getResponse()).toBe(testAction.getResponse());
    });

    it('should set the Response to the passed value', () => {
        const response = 'someresponse';
        testBuilder.getAction().setResponse(testAction.getResponse());
        testBuilder.setResponse(response);
        expect(testBuilder.getAction().getResponse()).toBe(response);
    });

    // finish
    it('should throw a builder error when trying to finish creation process of an action without a Trigger AND not add the action to the parent builder.', () => {
        testBuilder.setResponse(testAction.getResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an action without a Response AND not add the action to the parent builder.', () => {
        testBuilder.setTrigger(testAction.getTrigger());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Actions.length).toBe(0);
    });

    it('should add the action to the parent builder.', () => {
        testBuilder.setTrigger(testAction.getTrigger());
        testBuilder.setResponse(testAction.getResponse());
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
