import { IGatewayActionEventService, GatewayActionEvent } from '../events/gateway-action.event';
import { Subject } from 'rxjs';

export class SceneEventService implements IGatewayActionEventService {

    private GatewayActionEventSource = new Subject<GatewayActionEvent>();

    GatewayActionEvent$ = this.GatewayActionEventSource.asObservable();

    changeScene(event: GatewayActionEvent) {
        this.GatewayActionEventSource.next(event);
    }
}
