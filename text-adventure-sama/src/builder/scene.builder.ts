import { GameBuilder } from './game.builder';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/item.model';
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

    /**
     * Used by the ActionBuidlers to add an action to the scene.
     * 
     * DO NOT use this function, as the necessary checks have not been performed on the action.
     */
    addActionToBuilder(action: Action): void {
        this.Scene.getActions().push(action);

        if (action instanceof ItemYieldingAction) {
            this.GameBuilder.IdGeneratorService.addActionItemId(action as ItemYieldingAction);
        }
    }

    /**
     * Add a basic action to this scene.
     * Returns a BaseActionBuilder.
     */
    public addAction<T extends Action>(action: T): BaseActionBuilder<T, SceneBuilder> {
        return new BaseActionBuilder<T, SceneBuilder>(this, action);
    }

    /**
     * Add a gateway action to the scene.
     * A gateway action allows the user to move to another scene.
     */
    public addGatewayAction(): GatewayActionBuilder<SceneBuilder> {
        return new GatewayActionBuilder<SceneBuilder>(this);
    }

    /**
     * Add an item consuming action to the scene.
     * An item consuming action consumes/uses an item in the user`s inventory.
     */
    public addItemConsumingAction(): ItemConsumingActionBuilder<SceneBuilder> {
        return new ItemConsumingActionBuilder<SceneBuilder>(this);
    }

    /**
     * Add an item removing action to the scene.
     * An item removing action removes/deletes an item out of the user`s inventory.
     */
    public addItemRemovingAction(): ItemRemovingActionBuilder<SceneBuilder> {
        return new ItemRemovingActionBuilder<SceneBuilder>(this);
    }

    /**
     * Add an item yielding action to the scene.
     * An item yielding action adds an item to the user`s inventory.
     */
    public addItemYieldingAction(): ItemYieldingActionBuilder<SceneBuilder> {
        return new ItemYieldingActionBuilder<SceneBuilder>(this);
    }

    /**
     * Add a multi time action to the scene.
     * A multi time action returns different responses each time the user triggers it.
     */
    public addMultiTimeAction(): MultiTimeActionBuilder<SceneBuilder> {
        return new MultiTimeActionBuilder<SceneBuilder>(this);
    }

    /**
     * Add a one time action to the scene.
     * A one time action may only be triggered once. Each successive trigger returns a predefined response.
     */
    public addOneTimeAction(): OneTimeActionBuilder<SceneBuilder> {
        return new OneTimeActionBuilder<SceneBuilder>(this);
    }

    /**
     * Add a random response action to the scene.
     * A random response action returns a random response each time it is triggered.
     */
    public addRandomResponseAction(): RandomResponseActionBuilder<SceneBuilder> {
        return new RandomResponseActionBuilder<SceneBuilder>(this);
    }

    /**
     * Called by the ItemBuilder, that adds a finished item to the inventory.
     * 
     * DO NOT use this function, as the necessary checks have not been performed on the item.
     */
    addItemToBuilder(item: InGameItem): void {
        this.Scene.getItems().push(item);
        if (item.getID()) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }

    /**
     * Add an item to the scene.
     * 
     * Items are main interaction points for users within a scene.
     */
    public addItem(item?: InGameItem): ItemBuilder<SceneBuilder> {
        return new ItemBuilder<SceneBuilder>(this, item);
    }

    /**
     * Sets the name of the scene.
     */
    public setName(name: string): this {
        if (!name) {
            throw new EvalError('Name was not set.');
        }

        this.Scene.setName(name.trim());
        return this;
    }

    /**
     * Sets the description of the scene, which is returned when the user "looks around".
     * Each in-scene item`s InSceneDescription is concatenated to the end of this description.
     */
    public setDescription(description: string): this {
        if (!description) {
            throw new EvalError('Description was not set.');
        }

        this.Scene.setDescription(description.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when no matching action could be found in the scene.
     */
    public setActionNotRecognizedResponse(response: string): this {
        if (!response) {
            throw new EvalError('ActionNotRecognizedResponse was not set.');
        }

        this.Scene.setActionNotRecognizedResponse(response.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when the user wants to interact with an item, that does not exist in the scene
     */
    public setItemNotFoundResponse(response: string): this {
        if (!response) {
            throw new EvalError('ItemNotFoundResponse was not set.');
        }

        this.Scene.setItemNotFoundResponse(response.trim());
        return this;
    }

    /**
     * Sets the response, that is returned when the input could not be understood.
     */
    public setInvalidInputResponse(response: string): this {
        if (!response) {
            throw new EvalError('InvalidInputResponse was not set.');
        }

        this.Scene.setInvalidInputResponse(response.trim());
        return this;
    }

    /**
     * The finish method makes all the necessary checks on the current creation process 
     * and throws errors, if something is undefined or falsy.
     * 
     * It returns the builder, that started this creation process.
     */
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
