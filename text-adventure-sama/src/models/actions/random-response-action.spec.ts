import { RandomResponseAction } from './random-response-action.model';


describe('RandomResponseAction', () => {
    let action: RandomResponseAction;

    beforeEach(() => {
        action = new RandomResponseAction();
        action.setResponse('response');
        action.setResponses(['response1', 'response2']);
    });

    it('#trigger should not return the normal Response, but one of the Values in the Responses Array', () => {
        expect(action.getResponses()).toContain(action.trigger());
    });

    it('#trigger should return a random Response out of the array', () => {
        for (let  i = 0; i < 10; i++) {
            expect(action.getResponses()).toContain(action.trigger());
        }
    });
});
