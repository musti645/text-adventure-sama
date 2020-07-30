import { GatewayAction } from '../actions/gateway-action.model';

export class GatewayActionEvent {
    TargetSceneID: number;
    TargetSceneName: string;

    constructor(action: GatewayAction){
        this.TargetSceneID = action.SceneId;
        this.TargetSceneName = action.TargetSceneName;
    }
}

export interface IGatewayActionEventService {
    changeScene(event: GatewayActionEvent);
}

export interface IGatewayActionEventListener {
    OnSceneChange(event: GatewayActionEvent);
}
