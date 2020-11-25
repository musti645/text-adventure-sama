import { IGatewayActionEventService, GatewayActionEvent } from '../models/events/gateway-action.event';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Singleton Service handling Scene Events
 */
@Injectable({
    providedIn: 'root'
})
export class SceneEventService implements IGatewayActionEventService {

    private constructor() {
    }

    private static Instance: SceneEventService = undefined;

    private GatewayActionEventSource = new Subject<GatewayActionEvent>();

    public GatewayActionEvent$ = this.GatewayActionEventSource.asObservable();

    public static getInstance(): SceneEventService {
        if (!SceneEventService.Instance) {
            SceneEventService.Instance = new SceneEventService();
        }

        return SceneEventService.Instance;
    }

    public changeScene(event: GatewayActionEvent): void {
        this.GatewayActionEventSource.next(event);
    }
}
