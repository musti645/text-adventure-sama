import { OneTimeAction } from './one-time-action.model';

describe('OneTimeAction', () => {
    let action: OneTimeAction;

    beforeEach(() => {
        action = new OneTimeAction();
        action.setResponse('response');
        action.setResponseAfterUse('responseafteruse');
    });

    it('#trigger should return the Response when triggered once', () => {
        expect(action.trigger()).toBe(action.getResponse());
    });

    it('#trigger should return the ResponseAfterUse when triggered twice', () => {
        expect(action.trigger()).toBe(action.getResponse());
        expect(action.trigger()).toBe(action.getResponseAfterUse());
        expect(action.getWasTriggered()).toBe(true);
    });
});