import { Scene } from './scene.model';
import { GameError } from '../errors/game.error';

/**
 * The Stage contains all scenes as well as the current scene.
 * It also manages the transition between scenes.
 */
export class Stage {
    private Scenes: Scene[];
    private CurrentScene: Scene;
    // path the user took through the scenes
    private ScenePath: number[];

    constructor() {
        this.ScenePath = [];
        this.Scenes = [];
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
}
