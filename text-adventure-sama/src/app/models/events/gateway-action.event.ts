import { GatewayAction } from '../actions/gateway-action.model';

export class GatewayActionEvent {
    TargetSceneID: number;
    TargetSceneName: string;

    constructor(action: GatewayAction){
        this.TargetSceneID = action.getTargetSceneId();
        this.TargetSceneName = action.getTargetSceneName();
    }
}

export interface IGatewayActionEventService {
    changeScene(event: GatewayActionEvent);
}

export interface IGatewayActionEventListener {
    OnSceneChange(event: GatewayActionEvent);
}
