import { Scene } from './scene.model';
import { GameError } from '../models/errors/game.error';
import { SceneEventService } from '../services/scene-event.service';
import { IGatewayActionEventListener, GatewayActionEvent } from '../models/events/gateway-action.event';
import { Subscription } from 'rxjs';

/**
 * The Stage contains all scenes (including a pointer to the current scene).
 * It also manages the transition between scenes.
 */
export class Stage implements IGatewayActionEventListener {
    private Scenes: Scene[];
    private CurrentScene: Scene;
    // path the user took through the scenes
    private ScenePath: number[];

    private SceneEventSubscription: Subscription;

    constructor() {
        this.ScenePath = [];
        this.Scenes = [];

        this.subscribeToEvents();
    }

    OnSceneChange(event: GatewayActionEvent): void {
        this.goToScene(event.TargetSceneID);
    }

    public getCurrentScene(): Scene {
        if (!this.CurrentScene) {
            this.CurrentScene = this.Scenes[0];
        }
        return this.CurrentScene;
    }

    public goToScene(id: number): Scene {
        const nextScene = this.Scenes.find(s => s.getID() === id);
        if (!nextScene) {
            throw new GameError('Scene could not be found.');
        }

        this.ScenePath.push(id);

        this.CurrentScene = nextScene;
        return this.CurrentScene;
    }

    public addScene(toAdd: Scene): void {
        this.Scenes.push(toAdd);
    }

    public getScenesCount(): number {
        return this.Scenes.length;
    }

    public getScenes(): Scene[] {
        return this.Scenes;
    }

    public subscribeToEvents(): void {
        this.SceneEventSubscription = SceneEventService.getInstance().GatewayActionEvent$.subscribe((event) => this.OnSceneChange(event));
    }

    public unsubscribe(): void {
        if(this.SceneEventSubscription){
            this.SceneEventSubscription.unsubscribe();
            this.SceneEventSubscription = undefined;
        }
    }
}
