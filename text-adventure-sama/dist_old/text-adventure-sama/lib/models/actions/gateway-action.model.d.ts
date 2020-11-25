import { Action } from './action.model';
/**
 * When a GatewayAction is triggered, the game moves on to another scene.
 */
export declare class GatewayAction extends Action {
    private TargetSceneId;
    private TargetSceneName;
    constructor();
    trigger(): string;
    reset(): void;
    getTargetSceneId(): number;
    setTargetSceneId(id: number): void;
    getTargetSceneName(): string;
    setTargetSceneName(name: string): void;
}
