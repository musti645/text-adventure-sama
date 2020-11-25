import { IGatewayActionEventService, GatewayActionEvent } from '../models/events/gateway-action.event';
/**
 * Singleton Service handling Scene Events
 */
export declare class SceneEventService implements IGatewayActionEventService {
    private constructor();
    private static Instance;
    private GatewayActionEventSource;
    GatewayActionEvent$: import("rxjs").Observable<GatewayActionEvent>;
    static getInstance(): SceneEventService;
    changeScene(event: GatewayActionEvent): void;
}
