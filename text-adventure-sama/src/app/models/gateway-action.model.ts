import { Action } from './action.model';
import { Scene } from './scene.model';
import { EventEmitter } from '@angular/core';

export class GatewayAction extends Action {
    Scene: Scene;
    OnGatewayActionTriggeredEvent: EventEmitter<Scene> = new EventEmitter<Scene>();


    constructor() {
        super();
    }

    public use(): string {
        this.OnActionTriggeredEvent.emit();
        this.OnGatewayActionTriggeredEvent.emit(this.Scene);
        return this.Response;
    }

    public reset() {
    }
}
