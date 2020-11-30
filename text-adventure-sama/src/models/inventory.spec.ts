import { ItemConsumingAction } from './actions/item-consuming-action.model';
import { ItemRemovingAction } from './actions/item-removing-action.model';
import { ItemYieldingAction } from './actions/item-yielding-action.model';
import { ItemConsumingActionEvent } from './events/item-consuming-action.event';
import { ItemRemovingActionEvent } from './events/item-removing-action.event';
import { ItemYieldingActionEvent } from './events/item-yielding-action.event';
import { Inventory } from './inventory.model';
import { InGameItem } from './item.model';

describe('Inventory', () => {
    let inventory: Inventory;
    let item: InGameItem;
    let usagesLeft: number;

    beforeEach(() => {
        inventory = new Inventory();

        usagesLeft = 1;

        item = new InGameItem();
        item.setID(1);
        item.setName('name');
        item.setMaximumUsages(usagesLeft + 1);
        item.setUsagesLeft(usagesLeft);
        item.setNoUsagesLeftResponse('nousagesleft');
        item.setCanPickUp(true);
    });

    afterEach(() => {
        inventory.unsubscribe();
    });

    it('#OnItemYield should add an Item to the inventory', () => {
        const action = new ItemYieldingAction();
        action.setResponse('response');
        action.setAmountOfItems(1);
        action.setResetItemUsagesToMaximum(false);
        action.setItem(item);
        action.setResponseAfterUse('responseafteruse'); 
        const itemYieldEvent = new ItemYieldingActionEvent(action);

        // call the event handler function
        inventory.OnItemYield(itemYieldEvent);
        item.WasPickedUp = true;

        expect(inventory.getItems()).toContain(item);
        expect(inventory.getItemCount()).toBe(1);
    });

    it('#OnItemYield should add an Item to the inventory AND should reset item usages to maximum, when set to do so', () => {
        const action = new ItemYieldingAction();
        action.setResponse('response');
        action.setAmountOfItems(1);
        action.setResetItemUsagesToMaximum(true);
        action.setItem(item);
        action.setResponseAfterUse('responseafteruse'); 
        const itemYieldEvent = new ItemYieldingActionEvent(action);

        // call the event handler function
        inventory.OnItemYield(itemYieldEvent);

        // adjust the item to have reset its usages -> the inventory contains only a deep copy of the item
        item.resetUsages();
        item.WasPickedUp = true;

        expect(inventory.getItems()).toContain(item);
        expect(inventory.getItemCount()).toBe(1);
    });

    it('#OnItemYield should add multiple Item to the inventory', () => {
        const action = new ItemYieldingAction();
        action.setResponse('response');
        action.setAmountOfItems(3);
        action.setResetItemUsagesToMaximum(false);
        action.setItem(item);
        action.setResponseAfterUse('responseafteruse'); 
        const itemYieldEvent = new ItemYieldingActionEvent(action);

        // call the event handler function
        inventory.OnItemYield(itemYieldEvent);

        item.WasPickedUp = true;

        expect(inventory.getItems()).toContain(item);
        expect(inventory.getItemCount()).toBe(3);
    });

    it('#OnItemRemove should remove an existing item from the inventory', () => {
        const action = new ItemRemovingAction();
        action.setResponse('response');
        action.setItem(item);
        action.setResponseAfterUse('responseafteruse'); 
        const itemRemoveEvent = new ItemRemovingActionEvent(action);

        inventory.getItems().push(item);

        inventory.OnItemRemove(itemRemoveEvent);

        expect(inventory.getItems()).not.toContain(item);
        expect(inventory.getItemCount()).toBe(0);
    });

    it('#OnItemConsume should use an existing item in the inventory', () => {
        const action = new ItemConsumingAction();
        action.setResponse('response');
        action.setItem(item);
        action.setResponseAfterUse('responseafteruse'); 
        const itemRemoveEvent = new ItemConsumingActionEvent(action);

        inventory.getItems().push(item);

        inventory.OnItemConsume(itemRemoveEvent);

        expect(inventory.getItems()).toContain(item);
        expect(inventory.getItemCount()).toBe(1);
        expect(inventory.getItems()[0].getUsagesLeft()).toBe(usagesLeft-1);
    });

    it('#addItem should add the Item to the Inventory AND set the WasPickedUp flag to true', () => {
        inventory.addItem(item);
        expect(item.WasPickedUp).toBeTrue();
        expect(inventory.getItems()).toContain(item);
        expect(inventory.getItemCount()).toBe(1);
    });

    it('#findItemsById should return all items with the passed id', () => {
        inventory.getItems().push(item);
        const result = inventory.findItemsById(item.getID());
        expect(result).toHaveSize(1);
    });

    it('#findItemsByName should return all items with the passed name', () => {
        inventory.getItems().push(item);
        const result = inventory.findItemsByName(item.getName());
        expect(result).toHaveSize(1);
    });

    it('#removeItemFromInventory should remove all items from the inventory with the passed id', () => {
        inventory.getItems().push(item);
        inventory.removeItemFromInventory(item.getID());
        expect(inventory.getItems()).toHaveSize(0);
    });

    it('#getItemCount should return the amount of items', () => {
        expect(inventory.getItemCount()).toBe(0);
        inventory.getItems().push(item);
        expect(inventory.getItemCount()).toBe(1);
    });

    it('#subscribeToEvents should set all event subscriptions', () => {
        inventory.ItemConsumingEventSubscription.unsubscribe();
        inventory.ItemConsumingEventSubscription = undefined;

        inventory.ItemYieldingEventSubscription.unsubscribe();
        inventory.ItemYieldingEventSubscription = undefined;

        inventory.ItemRemovingEventSubscription.unsubscribe();
        inventory.ItemRemovingEventSubscription = undefined;

        inventory.subscribeToEvents();

        expect(inventory.ItemConsumingEventSubscription).toBeDefined();
        expect(inventory.ItemConsumingEventSubscription.closed).toBeFalse();

        expect(inventory.ItemYieldingEventSubscription).toBeDefined();
        expect(inventory.ItemYieldingEventSubscription.closed).toBeFalse();

        expect(inventory.ItemRemovingEventSubscription).toBeDefined();
        expect(inventory.ItemRemovingEventSubscription.closed).toBeFalse();
    });

    it('#unsubscribe should remove all subscriptions', () => {
        inventory.unsubscribe();
        expect(inventory.ItemConsumingEventSubscription).toBeUndefined();
        expect(inventory.ItemRemovingEventSubscription).toBeUndefined();
        expect(inventory.ItemYieldingEventSubscription).toBeUndefined();
    });
});