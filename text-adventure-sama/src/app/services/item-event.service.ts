import { ItemConsumingActionEvent, IItemConsumingEventService } from '../models/events/item-consuming-action.event';
import { ItemYieldingActionEvent, IItemYieldingEventService } from '../models/events/item-yielding-action.event';
import { ItemRemovingActionEvent, IItemRemovingEventService } from '../models/events/item-removing-action.event';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Singleton Service handling Item Events
 */
@Injectable({
    providedIn: 'root'
})
export class ItemEventService implements IItemRemovingEventService,
    IItemYieldingEventService,
    IItemConsumingEventService {

    private constructor() {

    }

    private static Instance: ItemEventService;

    private ItemConsumingActionEventSource = new Subject<ItemConsumingActionEvent>();
    private ItemYieldingActionEventSource = new Subject<ItemYieldingActionEvent>();
    private ItemRemovingActionEventSource = new Subject<ItemRemovingActionEvent>();

    public ItemConsumingActionEvent$ = this.ItemConsumingActionEventSource.asObservable();
    public ItemYieldingActionEvent$ = this.ItemYieldingActionEventSource.asObservable();
    public ItemRemovingActionEvent$ = this.ItemRemovingActionEventSource.asObservable();

    public static getInstance(): ItemEventService {
        if (!ItemEventService.Instance) {
            ItemEventService.Instance = new ItemEventService();
        }

        return ItemEventService.Instance;
    }

    public consumeItem(event: ItemConsumingActionEvent) {
        this.ItemConsumingActionEventSource.next(event);
    }

    public yieldItem(event: ItemYieldingActionEvent) {
        this.ItemYieldingActionEventSource.next(event);
    }

    public removeItem(event: ItemRemovingActionEvent) {
        this.ItemRemovingActionEventSource.next(event);
    }

}
