import { IGatewayActionEventService, GatewayActionEvent } from '../models/events/gateway-action.event';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Singleton Service handling Scene Events
 */
@Injectable()
export class SceneEventService implements IGatewayActionEventService {
    private static Instance: SceneEventService = undefined;

    private GatewayActionEventSource = new Subject<GatewayActionEvent>();

    public GatewayActionEvent$: Observable<GatewayActionEvent>;

    private constructor() {
        this.GatewayActionEvent$ = this.GatewayActionEventSource.asObservable();
    }

    public static getInstance(): SceneEventService {
        if (!SceneEventService.Instance) {
            SceneEventService.Instance = new SceneEventService();
        }

        return SceneEventService.Instance;
    }

    public static Complete(): void {
        if(!SceneEventService.Instance){
            return;
        }

        // remove all subscribers
        SceneEventService.Instance.GatewayActionEventSource.complete();
        SceneEventService.Instance = undefined;
    }

    public changeScene(event: GatewayActionEvent): void {
        this.GatewayActionEventSource.next(event);
    }


}
