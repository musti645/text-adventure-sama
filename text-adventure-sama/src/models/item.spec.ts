import { InGameItem } from './item.model';

describe('Item', () => {
    let item: InGameItem;
    let usagesLeft: number;

    beforeEach(() => {
        usagesLeft = 2;

        item = new InGameItem();
        item.setItemUsedResponse('itemused');
        item.setNoUsagesLeftResponse('nousagesleft');
        item.setMaximumUsages(usagesLeft + 1);
        item.setUsagesLeft(usagesLeft);
    });

    it('#use should return ItemUsedResponse when UsagesLeft is greater than 1 AND should reduce UsagesLeft by 1', () => {
        expect(item.use()).toBe(item.getItemUsedResponse());
        expect(item.getUsagesLeft()).toBe(usagesLeft - 1);
    });

    it('#use should return NoUsagesLeftResponse when is 0', () => {
        item.setUsagesLeft(0);
        expect(item.use()).toBe(item.getNoUsagesLeftResponse());
    });

    it('#resetUsages should set UsagesLeft to the MaximumUsages Value', () => {
        expect(item.getUsagesLeft()).not.toBe(item.getMaximumUsages());
        item.resetUsages();
        expect(item.getUsagesLeft()).toBe(item.getMaximumUsages());
    });
});