import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { ItemBuilder } from './item.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { ActionContainingBuilder } from './interfaces/action-containing.builder';
import { Action } from '../models/actions/action.model';
import { BaseActionBuilder } from './action.builder';

export class SceneBuilder extends BaseBuilder implements ItemContainingBuilder, ActionContainingBuilder {
    private GameBuilder: GameBuilder;
    private Game: Game;
    private Scene: Scene;

    constructor(gameBuilder: GameBuilder, game: Game, sceneId: number) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Scene = new Scene(sceneId || game.Scenes.length);
    }

    addActionToBuilder(action: Action): void {
        this.Scene.Actions.push(action);
    }

    public addAction<T extends Action>(action: T): BaseActionBuilder<T, SceneBuilder> {
        return new BaseActionBuilder<T, SceneBuilder>(action, this);
    }

    addItemToBuilder(item: InGameItem): void {
        this.Scene.Items.push(item);
    }

    public addItem<T extends InGameItem>(item: T): ItemBuilder<T, SceneBuilder> {
        return new ItemBuilder<T, SceneBuilder>(item, this);
    }

    public setName(name: string): this {
        this.Scene.Name = name;
        return this;
    }

    public setDescription(description: string): this {
        this.Scene.Description = description;
        return this;
    }

    public finish(): GameBuilder {
        this.Game.Scenes.push(this.Scene);
        return this.GameBuilder;
    }
}
