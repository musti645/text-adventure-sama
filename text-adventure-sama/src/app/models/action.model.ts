import { EventEmitter } from '@angular/core';

export abstract class Action {
    ID: number;
    Trigger: string;
    Response: string;
    OnActionTriggeredEvent: EventEmitter<void>;

    constructor() {
        this.OnActionTriggeredEvent = new EventEmitter<void>();
    }

    public abstract use(): string;

    public abstract reset();
}
