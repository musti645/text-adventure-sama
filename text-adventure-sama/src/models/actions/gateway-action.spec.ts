import { GatewayAction } from './gateway-action.model';
import { SceneEventService } from 'src/services/scene-event.service';
import { first } from 'rxjs/operators';

describe('GatewayAction', () => {
    let action: GatewayAction;

    beforeEach(() => {
        action = new GatewayAction();
        action.setTargetSceneId(19);
        action.setTargetSceneName('targetscene');
        action.setResponse('response');
    });

    it('#trigger should return the response', () => {
        expect(action.trigger()).toBe(action.getResponse());
    });

    it('#trigger should call SceneEvenService ChangeScene', (done) => {
        SceneEventService.getInstance().GatewayActionEvent$.pipe(first()).subscribe(event => {
            expect(event.TargetSceneID).toBe(action.getTargetSceneId());
            expect(event.TargetSceneName).toBe(action.getTargetSceneName());
            done();
        });

        action.trigger();
    });
});