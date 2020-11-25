import { OneTimeAction } from './one-time-action.model';
import { InGameItem } from '../Item.model';
/**
 * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
 */
export declare class ItemYieldingAction extends OneTimeAction {
    private Item;
    private AmountOfItems;
    private ResetItemUsagesToMaximum;
    constructor();
    trigger(): string;
    reset(): void;
    getItem(): InGameItem;
    setItem(item: InGameItem): void;
    setAmountOfItems(amount: number): void;
    getAmountOfItems(): number;
    getResetItemUsagesToMaximum(): boolean;
    setResetItemUsagesToMaximum(reset: boolean): void;
}
