import { GatewayAction } from '../actions/gateway-action.model';

export class GatewayActionEvent {
    TargetSceneID: number;

    constructor(action: GatewayAction){
        this.TargetSceneID = action.SceneId;
    }
}

export interface IGatewayActionEventService {
    changeScene(event: GatewayActionEvent);
}

export interface IGatewayActionEventListener {
    OnSceneChange(event: GatewayActionEvent);
}
