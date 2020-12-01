import { OneTimeAction } from './actions/one-time-action.model';
import { Game } from './game.model';
import { InGameItem } from './item.model';
import { Scene } from './scene.model';

describe('Game', () => {
    let game: Game;
    let item: InGameItem;
    let action: OneTimeAction;
    let scene: Scene;

    beforeEach(() => {
        game = new Game();

        item = new InGameItem();
        item.setName('itemName');

        scene = new Scene();
        scene.setName('sceneName');

        action = new OneTimeAction();
        action.setTrigger('actionTrigger');
        action.setAlternativeTriggers(['alternativeTriggers']);
    });

    afterEach(() => {
        game.getInventory().unsubscribe();
        game.getStage().unsubscribe();
    });

    it('#constructor should create a stage', () => {
        expect(game.getStage()).toBeDefined();
    });

    it('#constructor should create an inventory', () => {
        expect(game.getInventory()).toBeDefined();
    });

    it('#constructor should initialize the commands array', () => {
        const result = game.getCommands().length;
        expect(result > 0).toBeTrue();
    });

    it('#getInputRelevantStrings should return item names and action names', () => {
        game.addItemToInventory(item);
        scene.getActions().push(action);

        const item2 = new InGameItem();
        item2.setName('item2name');
        scene.getItems().push(item2);

        game.getStage().addScene(scene);
        
        const result = game.getInputRelevantStrings();

        expect(result).toContain(item.getName());
        expect(result).toContain(action.getTrigger());
        expect(result).toContain(item2.getName());
        
        for(const trigger of action.getAlternativeTriggers()){
            expect(result).toContain(trigger);
        }

        expect(result).toContain(scene.getName());
    });


});