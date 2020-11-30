import { GatewayAction } from './actions/gateway-action.model';
import { GatewayActionEvent } from './events/gateway-action.event';
import { Scene } from './scene.model';
import { Stage } from './stage.model';


describe('Stage', () => {
    let stage: Stage;

    let scene1: Scene;
    let scene2: Scene;

    beforeEach(() => {
        stage = new Stage();

        scene1 = new Scene();
        scene1.setID(1);
        scene1.setName('scene1');

        scene2 = new Scene();
        scene2.setID(2);
        scene2.setName('scene2');

        stage.getScenes().push(scene1);
        stage.getScenes().push(scene2);

    });

    afterEach(() => {
        stage.unsubscribe();
    });

    it('#OnSceneChange should change the CurrentScene', () => {
        const action = new GatewayAction();
        action.setTargetSceneId(2);
        let actionEvent = new GatewayActionEvent(action);

        expect(stage.getCurrentScene()).toBe(scene1);

        stage.OnSceneChange(actionEvent);

        expect(stage.getCurrentScene()).toBe(scene2);
    });

    it('#addScene should push the scene to the array of scenes', () => {
        const scene3 = new Scene(3);
        stage.addScene(scene3);

        expect(stage.getScenes()).toContain(scene3);
    });

    it('#goToScene should change the CurrentScene and add the Scene`s id to the ScenePath', () => {
        stage.goToScene(scene2.getID());

        expect(stage.getCurrentScene()).toBe(scene2);
        expect(stage.getScenePath()).toContain(scene1.getID());
    });

    it('#subscribeToEvents should set all event subscriptions', () => {
        stage.SceneEventSubscription.unsubscribe();
        stage.SceneEventSubscription = undefined;

        stage.subscribeToEvents();

        expect(stage.SceneEventSubscription).toBeDefined();
        expect(stage.SceneEventSubscription.closed).toBeFalse();
    });

    it('#unsubscribe should remove all subscriptions', () => {
        stage.unsubscribe();
        expect(stage.SceneEventSubscription).toBeUndefined();
    });
});