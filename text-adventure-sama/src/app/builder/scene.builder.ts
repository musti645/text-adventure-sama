import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { ItemBuilder } from './item.builder';
import { ItemContainingBuilder } from './interfaces/item-containing.builder';
import { BaseBuilder } from './base.builder';
import { ActionContainingBuilder } from './interfaces/action-containing.builder';
import { Action } from '../models/actions/action.model';
import { BaseActionBuilder } from './action-builders/base-action.builder';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';
import { BuilderError } from '../models/errors/builder.error';
import { GatewayActionBuilder } from './action-builders/gateway-action.builder';
import { ItemConsumingActionBuilder } from './action-builders/item-consuming-action.builder';
import { ItemRemovingActionBuilder } from './action-builders/item-removing-action.builder';
import { ItemYieldingActionBuilder } from './action-builders/item-yielding-action.builder';
import { MultiTimeActionBuilder } from './action-builders/multi-time-action.builder';
import { RandomResponseActionBuilder } from './action-builders/random-response-action.builder';
import { OneTimeActionBuilder } from './action-builders/one-time-action.builder';

export class SceneBuilder extends BaseBuilder implements ItemContainingBuilder, ActionContainingBuilder {
    private GameBuilder: GameBuilder;
    private Game: Game;
    protected Scene: Scene;

    constructor(gameBuilder: GameBuilder, game: Game, sceneId: number = null) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Scene = new Scene(sceneId);
    }

    addActionToBuilder(action: Action): void {
        this.Scene.getActions().push(action);

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
        this.Scene.getItems().push(item);
        if (item.getID()) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }

    public addItem(item?: InGameItem): ItemBuilder<SceneBuilder> {
        return new ItemBuilder<SceneBuilder>(this, item);
    }

    public setName(name: string): this {
        if (!name) {
            throw new EvalError('Name was not set.');
        }

        this.Scene.setName(name);
        return this;
    }

    public setDescription(description: string): this {
        if (!description) {
            throw new EvalError('Description was not set.');
        }

        this.Scene.setDescription(description);
        return this;
    }

    public setActionNotRecognizedResponse(response: string): this {
        if (!response) {
            throw new EvalError('ActionNotRecognizedResponse was not set.');
        }

        this.Scene.setActionNotRecognizedResponse(response);
        return this;
    }

    public setItemNotFoundResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemNotFoundResponse was not set.');
        }

        this.Scene.setItemNotFoundResponse(response);
        return this;
    }

    public setInvalidInputResponse(response: string): this {
        if (!response) {
            throw new EvalError('InvalidInputResponse was not set.');
        }

        this.Scene.setInvalidInputResponse(response);
        return this;
    }

    public finish(): GameBuilder {

        if (!this.Scene.getName()) {
            throw new BuilderError('Scene creation could not be finished. Name was not set.');
        }

        if (!this.Scene.getDescription()) {
            throw new BuilderError('Scene creation could not be finished. Description was not set.');
        }

        if (!this.Scene.getInvalidInputResponse()) {
            throw new BuilderError('Scene creation could not be finished. InvalidInputResponse was not set.');
        }

        if (!this.Scene.getItemNotFoundResponse()) {
            throw new BuilderError('Scene creation could not be finished. ItemNotFoundResponse was not set.');
        }

        if (!this.Scene.getActionNotRecognizedResponse()) {
            throw new BuilderError('Scene creation could not be finished. ActionNotRecognizedResponse was not set.');
        }

        // TODO: each scene has to have a gateway action to another scene or be the last action

        this.Game.getStage().addScene(this.Scene);
        return this.GameBuilder;
    }
}
