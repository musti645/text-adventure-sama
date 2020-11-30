import { MultiTimeAction } from './multi-time-action.model';


describe('Multi Time Action', () => {
    let action: MultiTimeAction;

    beforeEach(() => {
        action = new MultiTimeAction();
        action.setResponse('response');
        action.setResponses(['response1', 'response2']);
        action.setMaximumUsages(2);
        action.setUsagesLeft(2);
    });

    it('#trigger should return the Response 1 when triggered once AND reduce UsagesLeft by 1', () => {
        expect(action.trigger()).toBe(action.getResponses()[0]);
        expect(action.getUsagesLeft()).toBe(action.getMaximumUsages()-1);
    });

    it('#trigger should return the Response1 and Response2 when triggered twice AND reduce UsagesLeft to 0', () => {
        expect(action.trigger()).toBe(action.getResponses()[0]);
        expect(action.getUsagesLeft()).toBe(action.getMaximumUsages()-1);
        expect(action.trigger()).toBe(action.getResponses()[1]);
        expect(action.getUsagesLeft()).toBe(0);
        expect(action.trigger()).toBe(action.getResponse());
        expect(action.getUsagesLeft()).toBe(0);
    });
});