import { ItemConsumingActionEvent, IItemConsumingEventService } from '../events/item-consuming-action.event';
import { ItemYieldingActionEvent, IItemYieldingEventService } from '../events/item-yielding-action.event';
import { ItemRemovingActionEvent, IItemRemovingEventService } from '../events/item-removing-action.event';
import { Subject } from 'rxjs';

export class ItemEventService implements IItemRemovingEventService,
    IItemYieldingEventService,
    IItemConsumingEventService {

    private ItemConsumingActionEventSource = new Subject<ItemConsumingActionEvent>();
    private ItemYieldingActionEventSource = new Subject<ItemYieldingActionEvent>();
    private ItemRemovingActionEventSource = new Subject<ItemRemovingActionEvent>();


    ItemConsumingActionEvent$ = this.ItemConsumingActionEventSource.asObservable();
    ItemYieldingActionEvent$ = this.ItemYieldingActionEventSource.asObservable();
    ItemRemovingActionEvent$ = this.ItemRemovingActionEventSource.asObservable();


    consumeItem(event: ItemConsumingActionEvent) {
        this.ItemConsumingActionEventSource.next(event);
    }

    yieldItem(event: ItemYieldingActionEvent) {
        this.ItemYieldingActionEventSource.next(event);
    }

    removeItem(event: ItemRemovingActionEvent) {
        this.ItemRemovingActionEventSource.next(event);
    }

}
