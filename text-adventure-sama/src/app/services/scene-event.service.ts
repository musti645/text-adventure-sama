import { IGatewayActionEventService, GatewayActionEvent } from '../models/events/gateway-action.event';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Singleton Service handling Scene Events
 */
@Injectable()
export class SceneEventService implements IGatewayActionEventService {

    static Instance: SceneEventService;

    constructor() {
        SceneEventService.Instance = this;
    }

    private GatewayActionEventSource = new Subject<GatewayActionEvent>();

    public GatewayActionEvent$ = this.GatewayActionEventSource.asObservable();

    public changeScene(event: GatewayActionEvent) {
        this.GatewayActionEventSource.next(event);
    }
}
