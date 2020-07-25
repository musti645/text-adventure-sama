import { EventEmitter } from '@angular/core';

/**
 * Abstract Base class for all actions
 */
export abstract class Action {
    ID: number;
    Trigger: string;
    Response: string;
    OnActionTriggeredEvent: EventEmitter<void>;

    constructor(id: number) {
        this.ID = id;

        this.OnActionTriggeredEvent = new EventEmitter<void>();
    }

    public abstract trigger(): string;

    public abstract reset();
}
