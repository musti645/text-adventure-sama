import { Action } from './action.model';
import { SceneEventService } from 'src/app/services/scene-event.service';
import { GatewayActionEvent } from '../events/gateway-action.event';

/**
 * When a GatewayAction is triggered, the game moves on to another scene.
 */
export class GatewayAction extends Action {
    SceneId: number;
    TargetSceneName: string;


    constructor() {
        super();
    }

    public trigger(): string {
        // trigger event change
        SceneEventService.getInstance().changeScene(new GatewayActionEvent(this));
        return this.Response;
    }

    public reset() {
    }
}
