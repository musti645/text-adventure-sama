import { ItemConsumingAction } from './item-consuming-action.model';
import { first } from 'rxjs/operators';
import { InGameItem } from '../item.model';
import { ItemEventService } from 'src/services/item-event.service';

describe('ItemConsumingAction', () => {
    let action: ItemConsumingAction;

    beforeEach(() => {
        action = new ItemConsumingAction();
        action.setResponse('response');
        action.setResponseAfterUse('responseafteruse');
        action.setItem(new InGameItem());
    });

    it('#trigger should return the Response when triggered once', () => {
        expect(action.trigger()).toBe(action.getResponse());
    });

    it('#trigger should return the ResponseAfterUse when triggered twice', () => {
        expect(action.trigger()).toBe(action.getResponse());
        expect(action.trigger()).toBe(action.getResponseAfterUse());
        expect(action.getWasTriggered()).toBe(true);
    });

    it('#trigger should call ItemEventService consumeItem', (done) => {
        ItemEventService.getInstance().ItemConsumingActionEvent$.pipe(first()).subscribe(event => {
            expect(event.Item).toEqual(action.getItem());
            expect(event.Response).toBe(action.getResponse());
            expect(event.ResponseAfterUse).toBe(action.getResponseAfterUse());
            expect(event.WasTriggered).toBe(action.getWasTriggered());
            done();
        });

        action.trigger();
    });
});