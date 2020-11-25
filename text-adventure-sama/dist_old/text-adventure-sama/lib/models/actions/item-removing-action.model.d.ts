import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
/**
 * An ItemRemovingAction is only triggered once and removes an Item out of the players inventory without using it.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export declare class ItemRemovingAction extends OneTimeAction {
    private Item;
    constructor();
    trigger(): string;
    reset(): void;
    getItem(): InGameItem;
    setItem(item: InGameItem): void;
}
