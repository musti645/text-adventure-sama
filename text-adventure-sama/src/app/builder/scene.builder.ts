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
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';
import { BuilderError } from '../models/errors/builder.error';

export class SceneBuilder extends BaseBuilder implements ItemContainingBuilder, ActionContainingBuilder {
    private GameBuilder: GameBuilder;
    private Game: Game;
    private Scene: Scene;

    constructor(gameBuilder: GameBuilder, game: Game, sceneId: number = null) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Scene = new Scene(sceneId);
    }

    addActionToBuilder(action: Action): void {
        this.Scene.Actions.push(action);

        if (action instanceof ItemYieldingAction) {
            this.GameBuilder.IdGeneratorService.addActionItemId(action as ItemYieldingAction);
        }
    }

    public addAction<T extends Action>(action: T): BaseActionBuilder<T, SceneBuilder> {
        return new BaseActionBuilder<T, SceneBuilder>(this, action);
    }

    public addGatewayAction(): GatewayActionBuilder<SceneBuilder> {
        return new GatewayActionBuilder<SceneBuilder>(this);
    }

    public addItemConsumingAction(): ItemConsumingActionBuilder<SceneBuilder> {
        return new ItemConsumingActionBuilder<SceneBuilder>(this);
    }

    public addItemRemovingAction(): ItemRemovingActionBuilder<SceneBuilder> {
        return new ItemRemovingActionBuilder<SceneBuilder>(this);
    }

    public addItemYieldingAction(): ItemYieldingActionBuilder<SceneBuilder> {
        return new ItemYieldingActionBuilder<SceneBuilder>(this);
    }

    public addMultiTimeAction(id?: number): MultiTimeActionBuilder<SceneBuilder> {
        return new MultiTimeActionBuilder<SceneBuilder>(this);
    }

    public addOneTimeAction(): OneTimeActionBuilder<SceneBuilder> {
        return new OneTimeActionBuilder<SceneBuilder>(this);
    }

    public addRandomResponseAction(): RandomResponseActionBuilder<SceneBuilder> {
        return new RandomResponseActionBuilder<SceneBuilder>(this);
    }

    addItemToBuilder(item: InGameItem): void {
        this.Scene.Items.push(item);
        if (item.ID) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }

    public addItem(item?: InGameItem): ItemBuilder<SceneBuilder> {
        return new ItemBuilder<SceneBuilder>(this, item);
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

    public setInvalidInputResponse(response: string): this {
        this.Scene.InvalidInputResponse = response;
        return this;
    }

    public finish(): GameBuilder {

        if (!this.Scene.Name) {
            throw new BuilderError('Scene creation could not be finished. Name was not set.');
        }

        if (!this.Scene.Description) {
            throw new BuilderError('Scene creation could not be finished. Description was not set.');
        }

        if (!this.Scene.InvalidInputResponse) {
            throw new BuilderError('Scene creation could not be finished. InvalidInputResponse was not set.');
        }

        if (!this.Scene.ItemNotFoundResponse) {
            throw new BuilderError('Scene creation could not be finished. ItemNotFoundResponse was not set.');
        }

        if (!this.Scene.ActionNotRecognizedResponse) {
            throw new BuilderError('Scene creation could not be finished. ActionNotRecognizedResponse was not set.');
        }

        // TODO: each scene has to have a gateway action to another scene or be the last action

        this.Game.Stage.addScene(this.Scene);
        return this.GameBuilder;
    }
}
