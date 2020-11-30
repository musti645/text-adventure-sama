import { ItemConsumingActionEvent, IItemConsumingEventService } from '../models/events/item-consuming-action.event';
import { ItemYieldingActionEvent, IItemYieldingEventService } from '../models/events/item-yielding-action.event';
import { ItemRemovingActionEvent, IItemRemovingEventService } from '../models/events/item-removing-action.event';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Singleton Service handling Item Events
 */
@Injectable()
export class ItemEventService implements IItemRemovingEventService,
    IItemYieldingEventService,
    IItemConsumingEventService {

    private constructor() {
        this.ItemRemovingActionEvent$ = this.ItemRemovingActionEventSource.asObservable();
        this.ItemYieldingActionEvent$ = this.ItemYieldingActionEventSource.asObservable();
        this.ItemConsumingActionEvent$ = this.ItemConsumingActionEventSource.asObservable();

    }

    private static Instance: ItemEventService = undefined;

    private ItemConsumingActionEventSource = new Subject<ItemConsumingActionEvent>();
    private ItemYieldingActionEventSource = new Subject<ItemYieldingActionEvent>();
    private ItemRemovingActionEventSource = new Subject<ItemRemovingActionEvent>();

    public ItemConsumingActionEvent$: Observable<ItemConsumingActionEvent>;
    public ItemYieldingActionEvent$: Observable<ItemYieldingActionEvent>;
    public ItemRemovingActionEvent$: Observable<ItemRemovingActionEvent>;

    public static getInstance(): ItemEventService {
        if (!ItemEventService.Instance) {
            ItemEventService.Instance = new ItemEventService();
        }

        return ItemEventService.Instance;
    }

    public static Complete(): void {
        if(!ItemEventService.Instance){
            return;
        }

        // remove all subscribers
        ItemEventService.Instance.ItemConsumingActionEventSource.complete();
        ItemEventService.Instance.ItemYieldingActionEventSource.complete();
        ItemEventService.Instance.ItemRemovingActionEventSource.complete();
        
        ItemEventService.Instance = undefined;
    }

    public consumeItem(event: ItemConsumingActionEvent): void {
        this.ItemConsumingActionEventSource.next(event);
    }

    public yieldItem(event: ItemYieldingActionEvent): void {
        this.ItemYieldingActionEventSource.next(event);
    }

    public removeItem(event: ItemRemovingActionEvent): void {
        this.ItemRemovingActionEventSource.next(event);
    }

}
