import { GatewayAction } from '../actions/gateway-action.model';
export declare class GatewayActionEvent {
    TargetSceneID: number;
    TargetSceneName: string;
    constructor(action: GatewayAction);
}
export interface IGatewayActionEventService {
    changeScene(event: GatewayActionEvent): void;
}
export interface IGatewayActionEventListener {
    OnSceneChange(event: GatewayActionEvent): void;
}
