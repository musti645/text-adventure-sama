import { Scene } from './scene.model';
import { GameError } from '../errors/game.error';
import { SceneEventService } from '../services/scene-event.service';
import { IGatewayActionEventListener, GatewayActionEvent } from '../events/gateway-action.event';

/**
 * The Stage contains all scenes as well as the current scene.
 * It also manages the transition between scenes.
 */
export class Stage implements IGatewayActionEventListener{
    private Scenes: Scene[];
    private CurrentScene: Scene;
    // path the user took through the scenes
    private ScenePath: number[];

    constructor(private sceneEventService: SceneEventService) {
        this.ScenePath = [];
        this.Scenes = [];

        sceneEventService.GatewayActionEvent$.subscribe(this.OnSceneChange);
    }

    OnSceneChange(event: GatewayActionEvent) {
        this.goToScene(event.TargetSceneID);
    }

    public getCurrentScene(): Scene {
        return this.CurrentScene;
    }

    public goToScene(id: number): Scene {
        const nextScene = this.Scenes.find(s => s.ID === id);
        if (!nextScene) {
            throw new GameError('Scene could not be found.');
        }

        this.ScenePath.push(id);

        this.CurrentScene = nextScene;
        return this.CurrentScene;
    }

    public addScene(toAdd: Scene) {
        this.Scenes.push(toAdd);
    }

    public getScenesCount(): number {
        return this.Scenes.length;
    }

    public reset(): void {
        this.ScenePath = [];
        this.Scenes = [];
        this.CurrentScene = undefined;
    }
}
