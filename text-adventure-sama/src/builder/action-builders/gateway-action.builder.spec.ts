import { GatewayAction } from '../../models/actions/gateway-action.model';
import { BuilderError } from '../../models/errors/builder.error';
import { TestActionBuilder } from '../../tests/test-action-builder';
import { GatewayActionBuilder } from './gateway-action.builder';

describe('GatewayActionBuilder.', () => {
    let parentBuilder: TestActionBuilder;
    let testBuilder: GatewayActionBuilderChild;
    let testAction: GatewayAction;

    beforeEach(() => {
        parentBuilder = new TestActionBuilder();
        testBuilder = new GatewayActionBuilderChild(parentBuilder);

        testAction = new GatewayAction();
        testAction.setTrigger('testtrigger');
        testAction.setResponse('testresponse');
        testAction.setTargetSceneId(2);
        testAction.setTargetSceneName('TestSceneName');
    });


    // TargetSceneId
    // you cannot test a function which expects parameters in jasmine to throw an error -> wrap in anonymous function
    it('#setTargetSceneId should throw an error when trying to set a null TargetSceneId.', () => {
        testBuilder.setTargetSceneId(testAction.getTargetSceneId());
        expect(() => testBuilder.setTargetSceneId(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTargetSceneId()).toBe(testAction.getTargetSceneId());
    });

    it('#setTargetSceneId should throw an error when trying to set an undefined TargetSceneId.', () => {
        testBuilder.setTargetSceneId(testAction.getTargetSceneId());
        expect(() => testBuilder.setTargetSceneId(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTargetSceneId()).toBe(testAction.getTargetSceneId());
    });

    it('#setTargetSceneId should throw an error when trying to set a negative TargetSceneId.', () => {
        testBuilder.setTargetSceneId(testAction.getTargetSceneId());
        expect(() => testBuilder.setTargetSceneId(-38)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTargetSceneId()).toBe(testAction.getTargetSceneId());
    });

    it('#setTargetSceneId should set the TargetSceneId to the passed value.', () => {
        testBuilder.setTargetSceneId(testAction.getTargetSceneId());
        expect(testBuilder.getAction().getTargetSceneId()).toBe(testAction.getTargetSceneId());
    });

    // TargetSceneName
    it('#setTargetSceneName should throw an error when trying to set an undefined TargetSceneName.', () => {
        testBuilder.setTargetSceneName(testAction.getTargetSceneName());
        expect(() => testBuilder.setTargetSceneName(undefined)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTargetSceneName()).toBe(testAction.getTargetSceneName());
    });

    it('#setTargetSceneName should throw an error when trying to set a null TargetSceneName.', () => {
        testBuilder.setTargetSceneName(testAction.getTargetSceneName());
        expect(() => testBuilder.setTargetSceneName(null)).toThrowError(EvalError);
        expect(testBuilder.getAction().getTargetSceneName()).toBe(testAction.getTargetSceneName());
    });

    it('#setTargetSceneName should throw an error when trying to set an empty TargetSceneName.', () => {
        testBuilder.setTargetSceneName(testAction.getTargetSceneName());
        expect(() => testBuilder.setTargetSceneName('')).toThrowError(EvalError);
        expect(testBuilder.getAction().getTargetSceneName()).toBe(testAction.getTargetSceneName());
    });

    it('#setTargetSceneName should set the TargetSceneName to the passed value.', () => {
        testBuilder.setTargetSceneName(testAction.getTargetSceneName());
        expect(testBuilder.getAction().getTargetSceneName()).toBe(testAction.getTargetSceneName());
    });

    // finish
    it('#finish should throw an error when trying to finish the creation process of an action without TargetSceneID'
        + ' AND TargetSceneName.', () => {
            expect(() => testBuilder.finish()).toThrowError(BuilderError);
            expect(parentBuilder.Actions.length).toBe(0);
        });

    it('#finish should add the action to the parent builder with only the TargetSceneId set.', () => {
        testBuilder.setTargetSceneId(testAction.getTargetSceneId());
        testBuilder.setTrigger(testAction.getTrigger());
        testBuilder.setResponse(testAction.getResponse());
        testBuilder.finish();
        expect(parentBuilder.Actions.length).toBe(1);

        // workaround to delete a private property in typescript
        delete (testAction as any).TargetSceneName;

        expect(parentBuilder.Actions[0]).toEqual(testAction);
    });

    it('#finish should add the action to the parent builder with only the TargetSceneId set.', () => {
        testBuilder.setTargetSceneName(testAction.getTargetSceneName());
        testBuilder.setTrigger(testAction.getTrigger());
        testBuilder.setResponse(testAction.getResponse());
        testBuilder.finish();
        expect(parentBuilder.Actions.length).toBe(1);

        delete (testAction as any).TargetSceneId;

        expect(parentBuilder.Actions[0]).toEqual(testAction);
    });

    it('#finish should add the action to the parent builder, with everything set.', () => {
        testBuilder.setTargetSceneId(testAction.getTargetSceneId());
        testBuilder.setTargetSceneName(testAction.getTargetSceneName());
        testBuilder.setTrigger(testAction.getTrigger());
        testBuilder.setResponse(testAction.getResponse());
        testBuilder.finish();
        expect(parentBuilder.Actions.length).toBe(1);

        expect(parentBuilder.Actions[0]).toEqual(testAction);
    });
});

class GatewayActionBuilderChild extends GatewayActionBuilder<TestActionBuilder> {
    public getAction(): GatewayAction {
        return this.Action;
    }
}
