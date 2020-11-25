import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
/**
 * An ItemConsumingAction is only triggered once and uses an Item (once) in the players inventory.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
export declare class ItemConsumingAction extends OneTimeAction {
    private Item;
    constructor();
    trigger(): string;
    reset(): void;
    getItem(): InGameItem;
    setItem(item: InGameItem): void;
}
