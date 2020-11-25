import { ItemConsumingActionEvent, IItemConsumingEventService } from '../models/events/item-consuming-action.event';
import { ItemYieldingActionEvent, IItemYieldingEventService } from '../models/events/item-yielding-action.event';
import { ItemRemovingActionEvent, IItemRemovingEventService } from '../models/events/item-removing-action.event';
/**
 * Singleton Service handling Item Events
 */
export declare class ItemEventService implements IItemRemovingEventService, IItemYieldingEventService, IItemConsumingEventService {
    private constructor();
    private static Instance;
    private ItemConsumingActionEventSource;
    private ItemYieldingActionEventSource;
    private ItemRemovingActionEventSource;
    ItemConsumingActionEvent$: import("rxjs").Observable<ItemConsumingActionEvent>;
    ItemYieldingActionEvent$: import("rxjs").Observable<ItemYieldingActionEvent>;
    ItemRemovingActionEvent$: import("rxjs").Observable<ItemRemovingActionEvent>;
    static getInstance(): ItemEventService;
    consumeItem(event: ItemConsumingActionEvent): void;
    yieldItem(event: ItemYieldingActionEvent): void;
    removeItem(event: ItemRemovingActionEvent): void;
}
