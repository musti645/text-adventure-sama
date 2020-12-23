import { first } from 'rxjs/operators';
import { InGameItem } from '../item.model';
import { ItemEventService } from 'src/services/item-event.service';
import { ItemYieldingAction } from './item-yielding-action.model';
import { Subscription } from 'rxjs';

describe('ItemYieldingAction', () => {
    let action: ItemYieldingAction;
    let subscription: Subscription;

    beforeEach(() => {
        action = new ItemYieldingAction();
        action.setResponse('response');
        action.setResponseAfterUse('responseafteruse');
        action.setItem(new InGameItem());
        action.setAmountOfItems(2);
        action.setResetItemUsagesToMaximum(true);
    });

    afterEach(() => {
        if(subscription){
            subscription.unsubscribe();
        }
    })

    it('#trigger should return the Response when triggered once', () => {
        expect(action.trigger()).toBe(action.getResponse());
    });

    it('#trigger should return the ResponseAfterUse when triggered twice', () => {
        expect(action.trigger()).toBe(action.getResponse());
        expect(action.trigger()).toBe(action.getResponseAfterUse());
        expect(action.getWasTriggered()).toBe(true);
    });

    it('#trigger should call ItemEventService removeItem', (done) => {
        subscription = ItemEventService.getInstance().ItemYieldingActionEvent$.pipe(first()).subscribe(event => {
            expect(event.Item).toEqual(action.getItem());
            expect(event.Response).toBe(action.getResponse());
            expect(event.ResponseAfterUse).toBe(action.getResponseAfterUse());
            expect(event.WasTriggered).toBe(action.getWasTriggered());
            expect(event.ResetItemUsagesToMaximum).toBe(action.getResetItemUsagesToMaximum());
            expect(event.AmountOfItems).toBe(action.getAmountOfItems());
            done();
        });

        action.trigger();
    });
});