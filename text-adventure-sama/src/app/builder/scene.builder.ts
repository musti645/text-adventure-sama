import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { ItemBuilder } from './item.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { ActionContainingBuilder } from './interfaces/action-containing.builder';
import { Action } from '../models/actions/action.model';
import {
    BaseActionBuilder,
    GatewayActionBuilder,
    ItemConsumingActionBuilder,
    ItemRemovingActionBuilder,
    ItemYieldingActionBuilder,
    MultiTimeActionBuilder,
    OneTimeActionBuilder,
    RandomResponseActionBuilder
} from './action.builder';
import { SceneEventService } from '../services/scene-event.service';
import { ItemEventService } from '../services/item-event.service';

export class SceneBuilder extends BaseBuilder implements ItemContainingBuilder, ActionContainingBuilder {
    private GameBuilder: GameBuilder;
    private Game: Game;
    private Scene: Scene;

    constructor(gameBuilder: GameBuilder, game: Game, sceneId: number) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Scene = new Scene(sceneId || game.Stage.getScenesCount());
    }

    addActionToBuilder(action: Action): void {
        this.Scene.Actions.push(action);
    }

    public addAction<T extends Action>(action: T): BaseActionBuilder<T, SceneBuilder> {
        return new BaseActionBuilder<T, SceneBuilder>(action, this);
    }

    public addGatewayAction(id: number): GatewayActionBuilder<SceneBuilder> {
        return new GatewayActionBuilder<SceneBuilder>(id, this);
    }

    public addItemConsumingAction(id: number): ItemConsumingActionBuilder<SceneBuilder> {
        return new ItemConsumingActionBuilder<SceneBuilder>(id, this);
    }

    public addItemRemovingAction(id: number): ItemRemovingActionBuilder<SceneBuilder> {
        return new ItemRemovingActionBuilder<SceneBuilder>(id, this);
    }

    public addItemYieldingAction(id: number): ItemYieldingActionBuilder<SceneBuilder> {
        return new ItemYieldingActionBuilder<SceneBuilder>(id, this);
    }

    public addMultiTimeAction(id: number): MultiTimeActionBuilder<SceneBuilder> {
        return new MultiTimeActionBuilder<SceneBuilder>(id, this);
    }

    public addOneTimeAction(id: number): OneTimeActionBuilder<SceneBuilder> {
        return new OneTimeActionBuilder<SceneBuilder>(id, this);
    }

    public addRandomResponseAction(id: number): RandomResponseActionBuilder<SceneBuilder> {
        return new RandomResponseActionBuilder<SceneBuilder>(id, this);
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

    public setActionNotRecognizedResponse(response: string): this {
        this.Scene.ActionNotRecognizedResponse = response;
        return this;
    }

    public setItemNotFoundResponse(response: string): this {
        this.Scene.ItemNotFoundResponse = response;
        return this;
    }

    public finish(): GameBuilder {
        this.Game.Stage.addScene(this.Scene);
        return this.GameBuilder;
    }
}
