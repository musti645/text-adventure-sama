import { Action } from './action.model';
import { Scene } from '../scene.model';
import { EventEmitter } from '@angular/core';

/**
 * When a GatewayAction is triggered, the game moves on to another scene.
 */
export class GatewayAction extends Action {
    SceneId: number;
    OnGatewayActionTriggeredEvent: EventEmitter<number> = new EventEmitter<number>();


    constructor() {
        super();
    }

    public trigger(): string {
        this.OnActionTriggeredEvent.emit();
        this.OnGatewayActionTriggeredEvent.emit(this.SceneId);
        return this.Response;
    }

    public reset() {
    }
}
