import { GatewayAction } from './gateway-action.model';
import { SceneEventService } from 'src/services/scene-event.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

describe('GatewayAction', () => {
    let action: GatewayAction;
    let subscription: Subscription;

    beforeEach(() => {
        action = new GatewayAction();
        action.setTargetSceneId(19);
        action.setTargetSceneName('targetscene');
        action.setResponse('response');
    });

    afterEach(() => {
        if(subscription){
            subscription.unsubscribe();
        }
    })

    it('#trigger should return the response', () => {
        expect(action.trigger()).toBe(action.getResponse());
    });

    it('#trigger should call SceneEvenService ChangeScene', (done) => {
        subscription = SceneEventService.getInstance().GatewayActionEvent$.pipe(first()).subscribe(event => {
            expect(event.TargetSceneID).toBe(action.getTargetSceneId());
            expect(event.TargetSceneName).toBe(action.getTargetSceneName());
            done();
        });

        action.trigger();
    });
});