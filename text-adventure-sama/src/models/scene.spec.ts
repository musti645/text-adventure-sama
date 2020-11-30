import { InGameItem } from './item.model';
import { Scene } from './scene.model';


describe('Scene', () => {
    let scene: Scene;

    let item: InGameItem;

    beforeEach(() => {
        scene = new Scene();

        item = new InGameItem();
        item.setName('item');
        item.setID(1);
    });

    it('#removeItemFromScene should remove an existing item from the scene', () => {
        scene.getItems().push(item);
        scene.removeItemFromScene(item);
        expect(scene.getItems()).not.toContain(item);
        expect(scene.getItems()).toHaveSize(0);
    });

    it('removeItemFromScene should do nothing when an item does not exist in the scene', () => {
        const item2 = new InGameItem(2);
        item2.setName('item2');
        scene.getItems().push(item2);
        const size = scene.getItems().length;
        scene.removeItemFromScene(item);
        expect(scene.getItems()).toContain(item2);
        expect(scene.getItems()).not.toContain(item);
        expect(scene.getItems()).toHaveSize(size);
    });

});