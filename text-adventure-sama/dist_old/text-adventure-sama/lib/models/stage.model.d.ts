import { Scene } from './scene.model';
import { IGatewayActionEventListener, GatewayActionEvent } from '../models/events/gateway-action.event';
/**
 * The Stage contains all scenes (including a pointer to the current scene).
 * It also manages the transition between scenes.
 */
export declare class Stage implements IGatewayActionEventListener {
    private Scenes;
    private CurrentScene;
    private ScenePath;
    constructor();
    OnSceneChange(event: GatewayActionEvent): void;
    getCurrentScene(): Scene;
    goToScene(id: number): Scene;
    addScene(toAdd: Scene): void;
    getScenesCount(): number;
    getScenes(): Scene[];
}
