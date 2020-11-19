import { Action } from './action.model';
import { SceneEventService } from 'src/app/services/scene-event.service';
import { GatewayActionEvent } from '../events/gateway-action.event';
import { InteractionType } from '../interactions/interaction-type.enum';

/**
 * When a GatewayAction is triggered, the game moves on to another scene.
 */
export class GatewayAction extends Action {
    private TargetSceneId: number;
    private TargetSceneName: string;


    constructor() {
        super();
        this.setInteractionType(InteractionType.GO_TO);
    }

    public trigger(): string {
        // trigger event change
        SceneEventService.getInstance().changeScene(new GatewayActionEvent(this));
        return this.getResponse();
    }

    public reset() {
    }

    public getTargetSceneId(): number {
        return this.TargetSceneId;
    }

    public setTargetSceneId(id: number): void {
        this.TargetSceneId = id;
    }

    public getTargetSceneName(): string {
        return this.TargetSceneName;
    }

    public setTargetSceneName(name: string): void {
        this.TargetSceneName = name;
    }
}
