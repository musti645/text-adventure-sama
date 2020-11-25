import { Subject } from 'rxjs';
import { ɵɵdefineInjectable, Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { cloneDeep } from 'lodash';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { WordTokenizer, Lexicon, RuleSet, BrillPOSTagger, BayesClassifier, DamerauLevenshteinDistance } from 'natural';

/**
 * Global commands within the game that are evaluated before all of the other elements
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/forms';

const _c0 = ["input"];
function TextAdventureComponent_tr_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr", 10);
    ɵngcc0.ɵɵelement(1, "td", 11);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const line_r2 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("ngClass", line_r2.Type === "input" ? "input-line" : "output-line");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("innerHTML", line_r2.Value, ɵngcc0.ɵɵsanitizeHtml);
} }
class Command {
    constructor() {
    }
    activate() {
        if (this.Response) {
            return this.Response;
        }
        else {
            return this.ResponseFunction();
        }
    }
    setTrigger(trigger) {
        this.Trigger = trigger;
    }
    getTrigger() {
        return this.Trigger;
    }
    setResponse(response) {
        this.Response = response;
    }
    getResponse() {
        return this.Response;
    }
    setResponseFunction(func) {
        this.ResponseFunction = func;
    }
    getResponseFunction() {
        return this.ResponseFunction;
    }
    setUseTypeWritingAnimation(use) {
        this.UseTypeWritingAnimation = use;
    }
    getUseTypeWritingAnimation() {
        return this.UseTypeWritingAnimation;
    }
    getDescription() {
        return this.Description;
    }
    setDescription(desc) {
        this.Description = desc;
    }
}

/**
 * Singleton Service handling Item Events
 */
class ItemEventService {
    constructor() {
        this.ItemConsumingActionEventSource = new Subject();
        this.ItemYieldingActionEventSource = new Subject();
        this.ItemRemovingActionEventSource = new Subject();
        this.ItemConsumingActionEvent$ = this.ItemConsumingActionEventSource.asObservable();
        this.ItemYieldingActionEvent$ = this.ItemYieldingActionEventSource.asObservable();
        this.ItemRemovingActionEvent$ = this.ItemRemovingActionEventSource.asObservable();
    }
    static getInstance() {
        if (!ItemEventService.Instance) {
            ItemEventService.Instance = new ItemEventService();
        }
        return ItemEventService.Instance;
    }
    consumeItem(event) {
        this.ItemConsumingActionEventSource.next(event);
    }
    yieldItem(event) {
        this.ItemYieldingActionEventSource.next(event);
    }
    removeItem(event) {
        this.ItemRemovingActionEventSource.next(event);
    }
}
ItemEventService.ɵfac = function ItemEventService_Factory(t) { return new (t || ItemEventService)(); };
ItemEventService.Instance = undefined;
ItemEventService.ɵprov = ɵɵdefineInjectable({ factory: function ItemEventService_Factory() { return new ItemEventService(); }, token: ItemEventService, providedIn: "root" });
ItemEventService.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ItemEventService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class Inventory {
    constructor() {
        this.Items = [];
        ItemEventService.getInstance().ItemYieldingActionEvent$.subscribe((event) => this.OnItemYield(event));
        ItemEventService.getInstance().ItemRemovingActionEvent$.subscribe((event) => this.OnItemRemove(event));
        ItemEventService.getInstance().ItemConsumingActionEvent$.subscribe((event) => this.OnItemConsume(event));
    }
    OnItemYield(event) {
        if (event.ResetItemUsagesToMaximum) {
            event.Item.resetUsages();
        }
        for (let i = 0; i < event.AmountOfItems; i++) {
            // create a deep copy of the item (we also need the functions to be copied)
            this.addItem(cloneDeep(event.Item));
        }
    }
    OnItemRemove(event) {
        this.removeItemFromInventory(event.Item.getID());
    }
    OnItemConsume(event) {
        const items = this.findItemsById(event.Item.getID());
        items[0].use();
    }
    findItemsById(id) {
        return this.Items.filter(o => o.getID() === id);
    }
    findItemsByName(name) {
        return this.Items.filter(o => o.getName() === name);
    }
    removeItemFromInventory(id) {
        this.Items = this.Items.filter(o => o.getID() !== id);
    }
    getItemCount() {
        return this.Items.length;
    }
    addItem(toAdd) {
        toAdd.WasPickedUp = true;
        this.Items.push(toAdd);
    }
    getItems() {
        return this.Items;
    }
}

class GameError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, GameError.prototype);
    }
}

/**
 * Singleton Service handling Scene Events
 */
class SceneEventService {
    constructor() {
        this.GatewayActionEventSource = new Subject();
        this.GatewayActionEvent$ = this.GatewayActionEventSource.asObservable();
    }
    static getInstance() {
        if (!SceneEventService.Instance) {
            SceneEventService.Instance = new SceneEventService();
        }
        return SceneEventService.Instance;
    }
    changeScene(event) {
        this.GatewayActionEventSource.next(event);
    }
}
SceneEventService.ɵfac = function SceneEventService_Factory(t) { return new (t || SceneEventService)(); };
SceneEventService.Instance = undefined;
SceneEventService.ɵprov = ɵɵdefineInjectable({ factory: function SceneEventService_Factory() { return new SceneEventService(); }, token: SceneEventService, providedIn: "root" });
SceneEventService.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SceneEventService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/**
 * The Stage contains all scenes (including a pointer to the current scene).
 * It also manages the transition between scenes.
 */
class Stage {
    constructor() {
        this.ScenePath = [];
        this.Scenes = [];
        SceneEventService.getInstance().GatewayActionEvent$.subscribe((event) => this.OnSceneChange(event));
    }
    OnSceneChange(event) {
        this.goToScene(event.TargetSceneID);
    }
    getCurrentScene() {
        if (!this.CurrentScene) {
            this.CurrentScene = this.Scenes[0];
        }
        return this.CurrentScene;
    }
    goToScene(id) {
        const nextScene = this.Scenes.find(s => s.getID() === id);
        if (!nextScene) {
            throw new GameError('Scene could not be found.');
        }
        this.ScenePath.push(id);
        this.CurrentScene = nextScene;
        return this.CurrentScene;
    }
    addScene(toAdd) {
        this.Scenes.push(toAdd);
    }
    getScenesCount() {
        return this.Scenes.length;
    }
    getScenes() {
        return this.Scenes;
    }
}

/**
 * Represents the Game.
 */
class Game {
    constructor() {
        this.Stage = new Stage();
        this.Inventory = new Inventory();
        this.Commands = [];
        this.initializeCommands();
    }
    initializeCommands() {
        const helpCommand = new Command();
        helpCommand.setTrigger('help');
        helpCommand.setDescription('A list of all global commands');
        helpCommand.setUseTypeWritingAnimation(false);
        helpCommand.setResponseFunction(() => {
            let commandsHelp = '';
            this.Commands.forEach(command => {
                commandsHelp += `${command.getTrigger()} - ${command.getDescription()} \r\n `;
            });
            return commandsHelp;
        });
        this.Commands.push(helpCommand);
        const inventoryCommand = new Command();
        inventoryCommand.setTrigger('inventory');
        inventoryCommand.setDescription('List all items in your inventory.');
        inventoryCommand.setUseTypeWritingAnimation(false);
        inventoryCommand.setResponseFunction(() => {
            if (this.Inventory.getItemCount() <= 0) {
                return this.InventoryEmptyResponse;
            }
            let inventoryContents = 'Items in Inventory: \r\n ';
            this.Inventory.getItems().forEach(item => {
                inventoryContents += `${item.getName()} \r\n `;
            });
            return inventoryContents;
        });
        this.Commands.push(inventoryCommand);
        const sceneCommand = new Command();
        sceneCommand.setTrigger('look around');
        sceneCommand.setDescription('Get a description of the scene you\'re in');
        sceneCommand.setUseTypeWritingAnimation(true);
        sceneCommand.setResponseFunction(() => {
            let description = this.Stage.getCurrentScene().getDescription();
            for (const item of this.Stage.getCurrentScene().getItems()) {
                description += ` ${item.getInSceneDescription()}`;
            }
            return description;
        });
        this.Commands.push(sceneCommand);
    }
    getStage() {
        return this.Stage;
    }
    getInventory() {
        return this.Inventory;
    }
    setInventory(inventory) {
        this.Inventory = inventory;
    }
    getScenesCount() {
        return this.Stage.getScenesCount();
    }
    getTitle() {
        return this.Title;
    }
    setTitle(title) {
        this.Title = title;
    }
    getIntroduction() {
        return this.Introduction;
    }
    setIntroduction(intro) {
        this.Introduction = intro;
    }
    getCommands() {
        return this.Commands;
    }
    setCommands(commands) {
        this.Commands = commands;
    }
    getItemNotFoundResponse() {
        return this.Stage.getCurrentScene().getItemNotFoundResponse();
    }
    getInvalidInputResponse() {
        return this.Stage.getCurrentScene().getInvalidInputResponse();
    }
    getActionNotRecognizedResponse() {
        return this.Stage.getCurrentScene().getActionNotRecognizedResponse();
    }
    getSceneDescription() {
        return this.Stage.getCurrentScene().getDescription();
    }
    getItemNotFoundInInventoryResponse() {
        return this.ItemNotFoundInInventoryResponse;
    }
    setItemNotFoundInInventoryResponse(response) {
        this.ItemNotFoundInInventoryResponse = response;
    }
    getActionsInScene() {
        return this.Stage.getCurrentScene().getActions();
    }
    getItemsInScene() {
        return this.Stage.getCurrentScene().getItems();
    }
    getItemsInInventory() {
        return this.Inventory.getItems();
    }
    removeItemFromScene(item) {
        this.Stage.getCurrentScene().removeItemFromScene(item);
    }
    addItemToInventory(item) {
        this.Inventory.addItem(item);
    }
    removeItemFromInventory(item) {
        this.Inventory.removeItemFromInventory(item.getID());
    }
    getItemAddedToInventoryResponse() {
        return this.ItemAddedToInventoryResponse;
    }
    setItemAddedToInventoryResponse(response) {
        this.ItemAddedToInventoryResponse = response;
    }
    getGatewayTargetNotFoundResponse() {
        return this.GatewayTargetNotFoundResponse;
    }
    setGatewayTargetNotFoundResponse(response) {
        this.GatewayTargetNotFoundResponse = response;
    }
    getInventoryEmptyResponse() {
        return this.InventoryEmptyResponse;
    }
    setInventoryEmptyResponse(response) {
        this.InventoryEmptyResponse = response;
    }
}

class BaseBuilder {
}

/**
 * This class represents an Item in the game.
 */
class InGameItem {
    constructor(id) {
        this.ID = id;
        this.CanPickUp = true;
    }
    CanUseFunction(item, currentScene, inventory) {
        return true;
    }
    use() {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
            return this.ItemUsedResponse;
        }
        return this.NoUsagesLeftResponse;
    }
    resetUsages() {
        this.UsagesLeft = this.MaximumUsages;
    }
    setID(id) {
        this.ID = id;
    }
    getID() {
        return this.ID;
    }
    setName(name) {
        this.Name = name;
    }
    getName() {
        return this.Name;
    }
    setDescription(desc) {
        this.Description = desc;
    }
    getDescription() {
        return this.Description;
    }
    setMaximumUsages(usages) {
        this.MaximumUsages = usages;
    }
    getMaximumUsages() {
        return this.MaximumUsages;
    }
    setUsagesLeft(usages) {
        this.UsagesLeft = usages;
    }
    getUsagesLeft() {
        return this.UsagesLeft;
    }
    setItemUsedResponse(response) {
        this.ItemUsedResponse = response;
    }
    getItemUsedResponse() {
        return this.ItemUsedResponse;
    }
    setNoUsagesLeftResponse(response) {
        this.NoUsagesLeftResponse = response;
    }
    getNoUsagesLeftResponse() {
        return this.NoUsagesLeftResponse;
    }
    getCanPickUp() {
        return this.CanPickUp;
    }
    setCanPickUp(value) {
        this.CanPickUp = value;
    }
    setCannotPickUpResponse(response) {
        this.CannotPickUpResponse = response;
    }
    getCannotPickUpResponse() {
        return this.CannotPickUpResponse;
    }
    getInSceneDescription() {
        return this.InSceneDescription;
    }
    setInSceneDescription(descr) {
        this.InSceneDescription = descr;
    }
    setCanUseFunction(func) {
        this.CanUseFunction = func;
    }
    setCannotUseItemResponse(response) {
        this.CannotUseItemResponse = response;
    }
    getCannotUseItemResponse() {
        return this.CannotUseItemResponse;
    }
    getCanUseFunction() {
        return this.CanUseFunction;
    }
}

class BuilderError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, BuilderError.prototype);
    }
}

class ItemBuilder extends BaseBuilder {
    constructor(builder, item = new InGameItem(), requireInSceneDescription = false) {
        super();
        this.Item = item;
        this.Builder = builder;
        this.RequireInSceneDescription = requireInSceneDescription;
    }
    setName(name) {
        if (!name) {
            throw new EvalError('Name was undefined');
        }
        this.Item.setName(name);
        return this;
    }
    setDescription(description) {
        if (!description) {
            throw new EvalError('Description was undefined');
        }
        this.Item.setDescription(description);
        return this;
    }
    setMaximumUsages(maxUsages) {
        if (maxUsages === undefined || maxUsages <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }
        if (this.Item.getUsagesLeft() && this.Item.getUsagesLeft() > maxUsages) {
            throw new EvalError('MaximumUsages Value has to be greater or equal to the UsagesLeft Value');
        }
        this.Item.setMaximumUsages(maxUsages);
        return this;
    }
    setUsagesLeft(usagesLeft) {
        if (usagesLeft === undefined || usagesLeft === null || usagesLeft < 0) {
            throw new EvalError('UsagesLeft Value has to be greater than or equal to 0.');
        }
        if (this.Item.getMaximumUsages() && usagesLeft > this.Item.getMaximumUsages()) {
            throw new EvalError('UsagesLeft Value has to be less or equal to the MaximumUsages Value.');
        }
        this.Item.setUsagesLeft(usagesLeft);
        return this;
    }
    setItemUsedResponse(response) {
        if (!response) {
            throw new EvalError('ItemUsedResponse was undefined.');
        }
        this.Item.setItemUsedResponse(response);
        return this;
    }
    setNoUsagesLeftResponse(response) {
        if (!response) {
            throw new EvalError('NoUsagesLeftResponse was undefined.');
        }
        this.Item.setNoUsagesLeftResponse(response);
        return this;
    }
    setCanPickUp(value) {
        this.Item.setCanPickUp(value);
        return this;
    }
    setCannotPickUpResponse(response) {
        if (!response) {
            throw new EvalError('CannotPickUpResponse was undefined.');
        }
        this.Item.setCannotPickUpResponse(response);
        return this;
    }
    setInSceneDescription(descr) {
        if (!descr) {
            throw new EvalError('InSceneDescription was undefined.');
        }
        this.Item.setInSceneDescription(descr);
        return this;
    }
    setCanUseFunction(func) {
        if (!func) {
            throw new EvalError('CanUseFunction was undefined.');
        }
        this.IsCanUseFunctionReplaced = true;
        this.Item.setCanUseFunction(func);
        return this;
    }
    setCannotUseItemResponse(response) {
        if (!response) {
            throw new EvalError('CannotUseItemResponse was undefined');
        }
        this.Item.setCannotUseItemResponse(response);
        return this;
    }
    finish() {
        if (!this.Item.getName()) {
            throw new BuilderError('Item creation could not be finished. Name was not set.');
        }
        if (!this.Item.getDescription()) {
            throw new BuilderError('Item creation could not be finished. Description was not set.');
        }
        if (this.Item.getUsagesLeft() > 0 && !this.Item.getItemUsedResponse()) {
            throw new BuilderError('Item creation could not be finished. ItemUsedResponse was not set.');
        }
        if (!this.Item.getNoUsagesLeftResponse()) {
            throw new BuilderError('Item creation could not be finished. NoUsagesLeftResponse was not set.');
        }
        if (!this.Item.getCanPickUp() && !this.Item.getCannotPickUpResponse()) {
            throw new BuilderError('Item creation could not be finished. CannotPickUpResponse was not set.');
        }
        // if this item is added to a scene, instead of the inventory or an action, the InSceneDescription has to be set.
        if (this.RequireInSceneDescription && !this.Item.getInSceneDescription()) {
            throw new BuilderError('Item creation could not be finished. InSceneDescription was not set.');
        }
        if (this.IsCanUseFunctionReplaced && !this.Item.getCannotUseItemResponse()) {
            throw new BuilderError('Item creation could not be finished. CannotUseItemResponse was not set.');
        }
        if (this.Item.getMaximumUsages() < 0) {
            this.Item.setMaximumUsages(1);
        }
        if (this.Item.getUsagesLeft() < 0) {
            this.Item.setUsagesLeft(1);
        }
        this.Builder.addItemToBuilder(this.Item);
        return this.Builder;
    }
}

class InventoryBuilder extends BaseBuilder {
    constructor(gameBuilder, game) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Inventory = new Inventory();
    }
    addItem(item) {
        return new ItemBuilder(this, item);
    }
    addItemToBuilder(item) {
        if (!item) {
            throw new BuilderError('Could not add Item to Inventory. Item was not set.');
        }
        this.Inventory.addItem(item);
        if (item.getID()) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }
    finish() {
        this.Game.setInventory(this.Inventory);
        return this.GameBuilder;
    }
}

/**
 * A Scene is a container of actions and Items.
 * The player can only be inside one scene at a time.
 */
class Scene {
    constructor(id) {
        this.ID = id;
        this.Items = [];
        this.Actions = [];
    }
    setID(id) {
        this.ID = id;
    }
    getID() {
        return this.ID;
    }
    getName() {
        return this.Name;
    }
    setName(name) {
        this.Name = name;
    }
    getDescription() {
        return this.Description;
    }
    setDescription(descr) {
        this.Description = descr;
    }
    getActionNotRecognizedResponse() {
        return this.ActionNotRecognizedResponse;
    }
    setActionNotRecognizedResponse(response) {
        this.ActionNotRecognizedResponse = response;
    }
    getItemNotFoundResponse() {
        return this.ItemNotFoundResponse;
    }
    setItemNotFoundResponse(response) {
        this.ItemNotFoundResponse = response;
    }
    getInvalidInputResponse() {
        return this.InvalidInputResponse;
    }
    setInvalidInputResponse(response) {
        this.InvalidInputResponse = response;
    }
    getActions() {
        return this.Actions;
    }
    getItems() {
        return this.Items;
    }
    removeItemFromScene(item) {
        const index = this.Items.indexOf(item);
        if (index > -1) {
            this.Items.splice(index, 1);
        }
    }
}

class BaseActionBuilder extends BaseBuilder {
    constructor(builder, action) {
        super();
        this.Action = action;
        this.Builder = builder;
    }
    setTrigger(trigger) {
        if (!trigger || trigger === '') {
            throw new EvalError('No Trigger found.');
        }
        this.Action.setTrigger(trigger);
        return this;
    }
    setResponse(response) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }
        this.Action.setResponse(response);
        return this;
    }
    setEndGameAction() {
        this.Action.setIsEndGameAction(true);
        return this;
    }
    onFinish() {
    }
    finish() {
        if (!this.Action.getTrigger()) {
            throw new BuilderError('Action creation could not be finished. Trigger was not set.');
        }
        if (!this.Action.getResponse()) {
            throw new BuilderError('Action creation could not be finished. Response was not set.');
        }
        this.onFinish();
        this.Builder.addActionToBuilder(this.Action);
        return this.Builder;
    }
}

var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["USE"] = 0] = "USE";
    InteractionType[InteractionType["LOOK_AT"] = 1] = "LOOK_AT";
    InteractionType[InteractionType["GO_TO"] = 2] = "GO_TO";
    InteractionType[InteractionType["PICK_UP"] = 3] = "PICK_UP";
    InteractionType[InteractionType["DO"] = 4] = "DO";
})(InteractionType || (InteractionType = {}));

/**
 * Abstract Base class for all actions.
 */
// Note: Actions don't have IDs, since they are triggered via their InteractionType and their Trigger
class Action {
    constructor() {
        this.IsEndGameAction = false;
    }
    setTrigger(trigger) {
        this.Trigger = trigger;
    }
    setInteractionType(type) {
        this.InteractionType = type;
    }
    setResponse(response) {
        this.Response = response;
    }
    setIsEndGameAction(endGameAction) {
        this.IsEndGameAction = endGameAction;
    }
    getTrigger() {
        return this.Trigger;
    }
    getIsEndGameAction() {
        return this.IsEndGameAction;
    }
    getInteractionType() {
        return this.InteractionType;
    }
    getResponse() {
        return this.Response;
    }
}

/**
 * A OneTimeAction is only triggered once
 * Each subsequent trigger returns the same response.
 */
class OneTimeAction extends Action {
    constructor() {
        super();
        this.setInteractionType(InteractionType.DO);
    }
    trigger() {
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }
        this.WasTriggered = true;
        return this.getResponse();
    }
    reset() {
        this.WasTriggered = false;
    }
    getWasTriggered() {
        return this.WasTriggered;
    }
    setWasTriggered(triggered) {
        this.WasTriggered = triggered;
    }
    getResponseAfterUse() {
        return this.ResponseAfterUse;
    }
    setResponseAfterUse(response) {
        this.ResponseAfterUse = response;
    }
}

class ItemYieldingActionEvent {
    constructor(action) {
        this.Item = action.getItem();
        this.Response = action.getResponse();
        this.ResponseAfterUse = action.getResponseAfterUse();
        this.WasTriggered = action.getWasTriggered();
        this.AmountOfItems = action.getAmountOfItems();
        this.ResetItemUsagesToMaximum = action.getResetItemUsagesToMaximum();
    }
}

/**
 * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
 */
class ItemYieldingAction extends OneTimeAction {
    constructor() {
        super();
        this.AmountOfItems = 1;
        this.setInteractionType(InteractionType.DO);
    }
    trigger() {
        // trigger addition of item to inventory
        if (this.getWasTriggered()) {
            return this.getResponseAfterUse();
        }
        ItemEventService.getInstance().yieldItem(new ItemYieldingActionEvent(this));
        this.setWasTriggered(true);
        return this.getResponse();
    }
    reset() {
        this.setWasTriggered(false);
    }
    getItem() {
        return this.Item;
    }
    setItem(item) {
        this.Item = item;
    }
    setAmountOfItems(amount) {
        this.AmountOfItems = amount;
    }
    getAmountOfItems() {
        return this.AmountOfItems;
    }
    getResetItemUsagesToMaximum() {
        return this.ResetItemUsagesToMaximum;
    }
    setResetItemUsagesToMaximum(reset) {
        this.ResetItemUsagesToMaximum = reset;
    }
}

class GatewayActionEvent {
    constructor(action) {
        this.TargetSceneID = action.getTargetSceneId();
        this.TargetSceneName = action.getTargetSceneName();
    }
}

/**
 * When a GatewayAction is triggered, the game moves on to another scene.
 */
class GatewayAction extends Action {
    constructor() {
        super();
        this.setInteractionType(InteractionType.GO_TO);
    }
    trigger() {
        // trigger event change
        SceneEventService.getInstance().changeScene(new GatewayActionEvent(this));
        return this.getResponse();
    }
    reset() {
    }
    getTargetSceneId() {
        return this.TargetSceneId;
    }
    setTargetSceneId(id) {
        this.TargetSceneId = id;
    }
    getTargetSceneName() {
        return this.TargetSceneName;
    }
    setTargetSceneName(name) {
        this.TargetSceneName = name;
    }
}

class GatewayActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new GatewayAction());
    }
    setTargetSceneId(id) {
        if (id === undefined || id <= 0) {
            throw new EvalError('TargetSceneId Value has to be greater than 0.');
        }
        this.Action.setTargetSceneId(id);
        return this;
    }
    setTargetSceneName(name) {
        if (!name) {
            throw new EvalError('TargetSceneName Value is invalid.');
        }
        this.Action.setTargetSceneName(name);
        return this;
    }
    onFinish() {
        if (!this.Action.getTargetSceneId() && !this.Action.getTargetSceneName()) {
            throw new BuilderError('Action creation could not be finished. SceneId and/or TargetSceneName were not set.');
        }
    }
}

class ItemConsumingActionEvent {
    constructor(action) {
        this.Item = action.getItem();
        this.Response = action.getResponse();
        this.ResponseAfterUse = action.getResponseAfterUse();
        this.WasTriggered = action.getWasTriggered();
    }
}

/**
 * An ItemConsumingAction is only triggered once and uses an Item (once) in the players inventory.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
class ItemConsumingAction extends OneTimeAction {
    constructor() {
        super();
        this.setInteractionType(InteractionType.USE);
    }
    trigger() {
        if (this.getWasTriggered()) {
            return this.getResponseAfterUse();
        }
        ItemEventService.getInstance().consumeItem(new ItemConsumingActionEvent(this));
        this.setWasTriggered(true);
        return this.getResponse();
    }
    reset() {
        this.setWasTriggered(false);
    }
    getItem() {
        return this.Item;
    }
    setItem(item) {
        this.Item = item;
    }
}

class ItemConsumingActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new ItemConsumingAction());
    }
    setWasTrigered(wasTriggered) {
        if (wasTriggered === undefined || wasTriggered === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setWasTriggered(wasTriggered);
        return this;
    }
    setResponseAfterUse(response) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }
        this.Action.setResponseAfterUse(response);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    addItemToBuilder(item) {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
    }
    addItem(item) {
        return new ItemBuilder(this, item);
    }
    onFinish() {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }
        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }
    }
}

class ItemRemovingActionEvent {
    constructor(action) {
        this.Item = action.getItem();
        this.Response = action.getResponse();
        this.ResponseAfterUse = action.getResponseAfterUse();
        this.WasTriggered = action.getWasTriggered();
    }
}

/**
 * An ItemRemovingAction is only triggered once and removes an Item out of the players inventory without using it.
 * It can only be triggered, if the user has got the Item in her inventory.
 */
class ItemRemovingAction extends OneTimeAction {
    constructor() {
        super();
        this.setInteractionType(InteractionType.USE);
    }
    trigger() {
        if (this.getWasTriggered()) {
            return this.getResponseAfterUse();
        }
        ItemEventService.getInstance().removeItem(new ItemRemovingActionEvent(this));
        this.setWasTriggered(true);
        return this.getResponse();
    }
    reset() {
        this.setWasTriggered(false);
    }
    getItem() {
        return this.Item;
    }
    setItem(item) {
        this.Item = item;
    }
}

class ItemRemovingActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new ItemRemovingAction());
    }
    addItemToBuilder(item) {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
    }
    setWasTrigered(wasTriggered) {
        if (wasTriggered === undefined || wasTriggered === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setWasTriggered(wasTriggered);
        return this;
    }
    setResponseAfterUse(response) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }
        this.Action.setResponseAfterUse(response);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    addItem(item) {
        return new ItemBuilder(this, item);
    }
    onFinish() {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }
        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }
    }
}

class ItemYieldingActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new ItemYieldingAction());
    }
    addItemToBuilder(item) {
        if (!item) {
            throw new BuilderError('Item could not be added to the Action. Item was not set.');
        }
        this.Action.setItem(item);
    }
    addItem(item) {
        return new ItemBuilder(this, item);
    }
    setWasTrigered(wasTriggered) {
        if (wasTriggered === undefined || wasTriggered === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setWasTriggered(wasTriggered);
        return this;
    }
    setResponseAfterUse(response) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }
        this.Action.setResponseAfterUse(response);
        return this;
    }
    setAmountOfItems(amount) {
        if (amount === undefined || amount <= 0) {
            throw new EvalError('AmountOfItems Value has to be greater than 0.');
        }
        this.Action.setAmountOfItems(amount);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    setResetItemUsagesToMaximum(reset) {
        if (reset === undefined || reset === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setResetItemUsagesToMaximum(reset);
        return this;
    }
    onFinish() {
        if (!this.Action.getItem()) {
            throw new BuilderError('Action creation could not be finished. Item was not set.');
        }
        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }
    }
}

/**
 * A MultiTimeAction can be activated multiple times.
 * The class allows you to pass an array of responses,
 * which will be returned one by one until the maximum usage count is reached.
 */
class MultiTimeAction extends Action {
    constructor() {
        super();
        this.setInteractionType(InteractionType.DO);
    }
    trigger() {
        if (this.UsagesLeft <= this.MaximumUsages) {
            const responseString = this.Responses[this.UsagesLeft];
            this.UsagesLeft++;
            return responseString;
        }
        return this.getResponse();
    }
    reset() {
        this.UsagesLeft = 0;
    }
    getUsagesLeft() {
        return this.UsagesLeft;
    }
    setUsagesLeft(usages) {
        this.UsagesLeft = usages;
    }
    getMaximumUsages() {
        return this.MaximumUsages;
    }
    setMaximumUsages(usages) {
        this.MaximumUsages = usages;
    }
    getResponses() {
        return this.Responses;
    }
    setResponses(responses) {
        this.Responses = responses;
    }
}

class MultiTimeActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new MultiTimeAction());
    }
    setUsagesLeft(count) {
        if (count === undefined || count <= 0) {
            throw new EvalError('UsagesLeft Value has to be greater than 0.');
        }
        if (this.Action.getMaximumUsages() && this.Action.getMaximumUsages() < count) {
            throw new EvalError('UsagesLeft Value has to be less than or equal to MaximumUsages Value.');
        }
        this.Action.setUsagesLeft(count);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    setMaximumUsages(count) {
        if (count === undefined || count <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }
        if (this.Action.getUsagesLeft() !== undefined &&
            this.Action.getUsagesLeft() > count) {
            throw new EvalError('MaximumUsages Value has to be greater than or equal to UsagesLeft Value.');
        }
        if (this.Action.getResponses() &&
            this.Action.getResponses().length !== count) {
            throw new EvalError('MaximumUsages Value has to match the Amount of Responses.');
        }
        this.Action.setMaximumUsages(count);
        return this;
    }
    setResponses(responses) {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }
        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }
        this.Action.setResponses(responses);
        return this;
    }
    onFinish() {
        if (!this.Action.getUsagesLeft()) {
            throw new BuilderError('Action creation could not be finished. UsagesLeft was not set.');
        }
        if (!this.Action.getMaximumUsages()) {
            throw new BuilderError('Action creation could not be finished. MaximumUsages was not set.');
        }
        if (!this.Action.getResponses()) {
            throw new BuilderError('Action creation could not be finished. Responses Array was not set.');
        }
        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }
}

/**
 * RandomResponseAction allows the use of multiple Responses.
 * Each time this Action is triggered, the response will be selected randomly out of the passed array.
 */
class RandomResponseAction extends Action {
    constructor() {
        super();
        // set normal response to avoid errors during build
        this.setResponse(' ');
        this.setInteractionType(InteractionType.DO);
    }
    trigger() {
        const rndm = Math.floor(Math.random() * this.Responses.length);
        return this.Responses[rndm];
    }
    reset() {
    }
    getResponses() {
        return this.Responses;
    }
    setResponses(responses) {
        this.Responses = responses;
    }
}

class RandomResponseActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new RandomResponseAction());
    }
    setResponses(responses) {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }
        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }
        this.Action.setResponses(responses);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    onFinish() {
        if (!this.Action.getResponses()) {
            throw new BuilderError('Action creation could not be finished. Responses Array was not set.');
        }
        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }
}

class OneTimeActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new OneTimeAction());
    }
    setWasTrigered(wasTriggered) {
        if (wasTriggered === undefined || wasTriggered === null) {
            throw new EvalError('WasTriggered was not set.');
        }
        this.Action.setWasTriggered(wasTriggered);
        return this;
    }
    setResponseAfterUse(response) {
        if (!response || response === '') {
            throw new EvalError('No Response found.');
        }
        this.Action.setResponseAfterUse(response);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    onFinish() {
        if (!this.Action.getResponseAfterUse()) {
            throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
        }
        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }
}

class SceneBuilder extends BaseBuilder {
    constructor(gameBuilder, game, sceneId = null) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Scene = new Scene(sceneId);
    }
    addActionToBuilder(action) {
        this.Scene.getActions().push(action);
        if (action instanceof ItemYieldingAction) {
            this.GameBuilder.IdGeneratorService.addActionItemId(action);
        }
    }
    addAction(action) {
        return new BaseActionBuilder(this, action);
    }
    addGatewayAction() {
        return new GatewayActionBuilder(this);
    }
    addItemConsumingAction() {
        return new ItemConsumingActionBuilder(this);
    }
    addItemRemovingAction() {
        return new ItemRemovingActionBuilder(this);
    }
    addItemYieldingAction() {
        return new ItemYieldingActionBuilder(this);
    }
    addMultiTimeAction(id) {
        return new MultiTimeActionBuilder(this);
    }
    addOneTimeAction() {
        return new OneTimeActionBuilder(this);
    }
    addRandomResponseAction() {
        return new RandomResponseActionBuilder(this);
    }
    addItemToBuilder(item) {
        this.Scene.getItems().push(item);
        if (item.getID()) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }
    addItem(item) {
        return new ItemBuilder(this, item);
    }
    setName(name) {
        if (!name) {
            throw new EvalError('Name was not set.');
        }
        this.Scene.setName(name);
        return this;
    }
    setDescription(description) {
        if (!description) {
            throw new EvalError('Description was not set.');
        }
        this.Scene.setDescription(description);
        return this;
    }
    setActionNotRecognizedResponse(response) {
        if (!response) {
            throw new EvalError('ActionNotRecognizedResponse was not set.');
        }
        this.Scene.setActionNotRecognizedResponse(response);
        return this;
    }
    setItemNotFoundResponse(response) {
        if (!response) {
            throw new EvalError('ItemNotFoundResponse was not set.');
        }
        this.Scene.setItemNotFoundResponse(response);
        return this;
    }
    setInvalidInputResponse(response) {
        if (!response) {
            throw new EvalError('InvalidInputResponse was not set.');
        }
        this.Scene.setInvalidInputResponse(response);
        return this;
    }
    finish() {
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

/**
 * Assigns IDs to Objects by counting the amount of distinct types
 */
class IDGeneratorService {
    constructor() {
        this.typeArray = [];
    }
    generateIDs(game) {
        this.processScenes(game.getStage().getScenes());
        this.typeArray = [];
    }
    processScenes(scenes) {
        scenes.forEach(element => {
            if (!element.getID()) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            }
            else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }
            this.processActions(element.getActions());
            this.processItems(element.getItems());
        });
    }
    processActions(actions) {
        actions.forEach(element => {
            if ((element instanceof ItemYieldingAction)
                && !element.getItem().getID()) {
                element.getItem().setID(this.getIdFromTypeName(element.constructor.name));
            }
        });
    }
    processItems(items) {
        items.forEach(element => {
            if (!element.getID()) {
                element.setID(this.getIdFromTypeName(element.constructor.name));
            }
            else {
                this.setUsedIdForTypeName(element.constructor.name, element.getID());
            }
        });
    }
    getIdFromTypeName(name) {
        const index = this.typeArray.findIndex(element => {
            return element.Name === name;
        });
        if (index !== -1) {
            return this.typeArray[index].getAndIncrementCount();
        }
        return this.createTypeCountContainer(name).getAndIncrementCount();
    }
    addItemId(item) {
        this.setUsedIdForTypeName(item.constructor.name, item.getID());
    }
    addSceneId(scene) {
        this.setUsedIdForTypeName(scene.constructor.name, scene.getID());
    }
    addActionItemId(action) {
        this.setUsedIdForTypeName(action.getItem().constructor.name, action.getItem().getID());
    }
    /**
     * Add the passed id to the corresponding typeNameContainer's usedID Array
     */
    setUsedIdForTypeName(name, id) {
        const index = this.typeArray.findIndex(element => {
            return element.Name === name;
        });
        if (index !== -1) {
            this.typeArray[index].addUsedID(id);
            return;
        }
        this.createTypeCountContainer(name).addUsedID(id);
    }
    createTypeCountContainer(name) {
        const container = new TypeCountContainer(name);
        this.typeArray.push(container);
        return container;
    }
    getTypeCountContainers() {
        return this.typeArray;
    }
}
IDGeneratorService.ɵfac = function IDGeneratorService_Factory(t) { return new (t || IDGeneratorService)(); };
IDGeneratorService.ɵprov = ɵɵdefineInjectable({ factory: function IDGeneratorService_Factory() { return new IDGeneratorService(); }, token: IDGeneratorService, providedIn: "root" });
IDGeneratorService.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(IDGeneratorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
class TypeCountContainer {
    constructor(name) {
        this.Name = name;
        this.Count = 0;
        this.UsedIDs = [];
    }
    getAndIncrementCount() {
        this.Count++;
        while (this.isCurrentCountUsed()) {
            this.Count++;
        }
        this.addUsedID(this.Count);
        return this.Count;
    }
    addUsedID(usedId) {
        if (this.isIdUsed(usedId)) {
            throw new EvalError('Id is already being used.');
        }
        this.UsedIDs.push(usedId);
    }
    isCurrentCountUsed() {
        return this.UsedIDs.filter(element => element === this.Count).length > 0;
    }
    isIdUsed(id) {
        return !(!this.UsedIDs.find(element => element === id));
    }
}

class CommandBuilder extends BaseBuilder {
    constructor(builder, command = new Command()) {
        super();
        this.Command = command;
        this.Builder = builder;
    }
    setTrigger(trigger) {
        if (!trigger) {
            throw new EvalError('Trigger was undefined.');
        }
        this.Command.setTrigger(trigger);
        return this;
    }
    setResponse(response) {
        if (!response) {
            throw new EvalError('Response was undefined.');
        }
        this.Command.setResponse(response);
        return this;
    }
    setResponseFunction(respFunc) {
        if (!respFunc) {
            throw new EvalError('ResponseFunction was undefined.');
        }
        this.Command.setResponseFunction(respFunc);
        return this;
    }
    setUseTypeWritingAnimation(use) {
        if (use === undefined || use === null) {
            throw new EvalError('UseTypeWritingAnimation was undefined.');
        }
        this.Command.setUseTypeWritingAnimation(use);
        return this;
    }
    setDescription(descr) {
        if (!descr) {
            throw new EvalError('Description was undefined');
        }
        this.Command.setDescription(descr);
        return this;
    }
    finish() {
        if (!this.Command.getTrigger()) {
            throw new BuilderError('Could not create Command. Trigger was not set.');
        }
        if (!this.Command.getDescription()) {
            throw new BuilderError('Could not create Command. Description was not set.');
        }
        if (!this.Command.getResponse() && !this.Command.getResponseFunction()) {
            throw new BuilderError('Could not create Command. Response and ResponseFunction were not set. One of both is required.');
        }
        if (this.Command.getUseTypeWritingAnimation() === undefined || this.Command.getUseTypeWritingAnimation() === null) {
            this.Command.setUseTypeWritingAnimation(true);
        }
        this.Builder.addCommandToBuilder(this.Command);
        return this.Builder;
    }
}

/**
 * Use this class to chain the game building process.
 * Once your Game is build completely, call the 'build' method.
 */
class GameBuilder extends BaseBuilder {
    constructor() {
        super();
        this.Game = new Game();
        this.IdGeneratorService = new IDGeneratorService();
    }
    addInventory() {
        return new InventoryBuilder(this, this.Game);
    }
    addScene(id) {
        return new SceneBuilder(this, this.Game, id);
    }
    addCommand() {
        return new CommandBuilder(this);
    }
    addCommandToBuilder(command) {
        if (!command) {
            throw new BuilderError('Command was undefined');
        }
        this.Game.getCommands().push(command);
        return this;
    }
    removeExistingCommands() {
        this.Game.setCommands([]);
        return this;
    }
    setTitle(title) {
        if (!title) {
            throw new EvalError('Title was undefined.');
        }
        this.Game.setTitle(title);
        return this;
    }
    setIntroduction(intro) {
        if (!intro) {
            throw new EvalError('Introduction was undefined.');
        }
        this.Game.setIntroduction(intro);
        return this;
    }
    setItemNotFoundInInventoryResponse(response) {
        if (!response) {
            throw new EvalError('ItemNotFoundInInventoryResponse was undefined.');
        }
        this.Game.setItemNotFoundInInventoryResponse(response);
        return this;
    }
    setItemAddedToInventoryResponse(response) {
        if (!response) {
            throw new EvalError('ItemAddedToInventoryResponse was undefined.');
        }
        this.Game.setItemAddedToInventoryResponse(response);
        return this;
    }
    setGatewayTargetNotFoundResponse(response) {
        if (!response) {
            throw new EvalError('GatewayTargetNotFoundResponse was undefined.');
        }
        this.Game.setGatewayTargetNotFoundResponse(response);
        return this;
    }
    setInventoryEmptyResponse(response) {
        if (!response) {
            throw new EvalError('InventoryEmptyResponse was undefined.');
        }
        this.Game.setInventoryEmptyResponse(response);
        return this;
    }
    finish() {
        if (!this.Game.getTitle()) {
            throw new BuilderError('Game creation could not be finished. Title was not set.');
        }
        if (!this.Game.getIntroduction()) {
            throw new BuilderError('Game creation could not be finished. Introduction was not set.');
        }
        if (!this.Game.getItemAddedToInventoryResponse()) {
            throw new BuilderError('Game creation could not be finished. ItemAddedToInventoryResponse was not set.');
        }
        if (!this.Game.getItemNotFoundInInventoryResponse()) {
            throw new BuilderError('Game creation could not be finished. ItemNotFoundInInventoryResponse was not set.');
        }
        if (!this.Game.getGatewayTargetNotFoundResponse()) {
            throw new BuilderError('Game creation could not be finished. GatewayTargetNotFoundResponse was not set.');
        }
        if (!this.Game.getInventoryEmptyResponse()) {
            throw new BuilderError('Game creation could not be finished. InventoryEmptyResponse was not set.');
        }
        if (this.Game.getScenesCount() <= 0) {
            throw new BuilderError('Game creation could not be finished. No Scenes were found.');
        }
        this.generateUnassignedIds();
        return this.Game;
    }
    generateUnassignedIds() {
        this.IdGeneratorService.generateIDs(this.Game);
    }
}

/**
 * This class represents an Item in the game.
 */
class InGameItem$1 {
    constructor(id) {
        this.ID = id;
        this.CanPickUp = true;
    }
    CanUseFunction(item, currentScene, inventory) {
        return true;
    }
    use() {
        if (this.UsagesLeft >= 1) {
            this.UsagesLeft--;
            return this.ItemUsedResponse;
        }
        return this.NoUsagesLeftResponse;
    }
    resetUsages() {
        this.UsagesLeft = this.MaximumUsages;
    }
    setID(id) {
        this.ID = id;
    }
    getID() {
        return this.ID;
    }
    setName(name) {
        this.Name = name;
    }
    getName() {
        return this.Name;
    }
    setDescription(desc) {
        this.Description = desc;
    }
    getDescription() {
        return this.Description;
    }
    setMaximumUsages(usages) {
        this.MaximumUsages = usages;
    }
    getMaximumUsages() {
        return this.MaximumUsages;
    }
    setUsagesLeft(usages) {
        this.UsagesLeft = usages;
    }
    getUsagesLeft() {
        return this.UsagesLeft;
    }
    setItemUsedResponse(response) {
        this.ItemUsedResponse = response;
    }
    getItemUsedResponse() {
        return this.ItemUsedResponse;
    }
    setNoUsagesLeftResponse(response) {
        this.NoUsagesLeftResponse = response;
    }
    getNoUsagesLeftResponse() {
        return this.NoUsagesLeftResponse;
    }
    getCanPickUp() {
        return this.CanPickUp;
    }
    setCanPickUp(value) {
        this.CanPickUp = value;
    }
    setCannotPickUpResponse(response) {
        this.CannotPickUpResponse = response;
    }
    getCannotPickUpResponse() {
        return this.CannotPickUpResponse;
    }
    getInSceneDescription() {
        return this.InSceneDescription;
    }
    setInSceneDescription(descr) {
        this.InSceneDescription = descr;
    }
    setCanUseFunction(func) {
        this.CanUseFunction = func;
    }
    setCannotUseItemResponse(response) {
        this.CannotUseItemResponse = response;
    }
    getCannotUseItemResponse() {
        return this.CannotUseItemResponse;
    }
    getCanUseFunction() {
        return this.CanUseFunction;
    }
}

var TextInputType;
(function (TextInputType) {
    TextInputType["UserInput"] = "input";
    TextInputType["Output"] = "output";
})(TextInputType || (TextInputType = {}));

class TextInput {
    constructor(Value, Type) {
        this.Value = Value;
        this.Type = Type;
    }
}

class ParseInputResult {
    constructor(result, typewriteAnimation = true, isEndGameResult = false) {
        this.Result = result;
        this.UseTypewriterAnimation = typewriteAnimation;
        this.IsEndGameResult = isEndGameResult;
    }
}

const language = 'EN';
// see Penn Treebank Part-of-Speech Tags for more info on the tags
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';
const nounCategories = ['N', 'NN', 'NNS', 'NNP', 'NNPS'];
const verbCategories = ['VB', 'VBD', 'VBG', 'VBN', 'VBO', 'VBZ'];
/**
 * Helps to parse text input and call the corresponding action, returning a response
 */
class InputParserService {
    constructor() {
    }
    initialize(trainer) {
        return new Promise((resolve) => {
            this.Tokenizer = new WordTokenizer();
            const lexicon = new Lexicon(language, defaultCategory, defaultCategoryCapitalized);
            const ruleSet = new RuleSet('EN');
            this.POSTagger = new BrillPOSTagger(lexicon, ruleSet);
            this.Classifier = new BayesClassifier();
            trainer.trainClassifier(this.Classifier).then(() => resolve(true));
        });
    }
    setGame(game) {
        this.Game = game;
    }
    parseInput(input) {
        const commandsResult = this.getCommandsResponse(input);
        if (commandsResult) {
            return commandsResult;
        }
        // because imperatives are not so common in the brown/penn corpus, we add a 'they ' before
        // the whole sentence, in order to make it a legitimate sentence and identify imperatives as verbs instead of nouns
        input = 'they ' + input;
        const taggedTokens = this.POSTagger.tag(this.Tokenizer.tokenize(input)).taggedWords;
        // we get verbs and nouns, because in many cases a noun may be mistaken to be a verb and vice versa e.g. (a) stick & (to) stick
        const nounsAndVerbs = this.getNounsAndVerbsFromTokenizedInput(taggedTokens);
        const interactionType = this.getInteractionType(input);
        // no interaction type found
        if (interactionType === undefined || interactionType === null) {
            return new ParseInputResult(this.Game.getInvalidInputResponse());
        }
        switch (interactionType) {
            case InteractionType.GO_TO:
                // scenes/gateway actions
                return this.getGoToResponse(nounsAndVerbs);
            case InteractionType.LOOK_AT:
                // item description
                return this.getLookAtResponse(nounsAndVerbs);
            case InteractionType.PICK_UP:
                // add item to inventory
                return this.getPickUpResponse(nounsAndVerbs);
            case InteractionType.USE:
                // use item in inventory or in scene
                return this.getUseResponse(nounsAndVerbs);
            default:
                // do something
                return this.getDoResponse(nounsAndVerbs);
        }
    }
    getCommandsResponse(input) {
        const lowerCaseInput = input.toLocaleLowerCase();
        let commandsResult;
        this.Game.getCommands().some(command => {
            if (command.getTrigger().toLocaleLowerCase() === lowerCaseInput) {
                commandsResult = new ParseInputResult(command.activate(), command.getUseTypeWritingAnimation());
                return true;
            }
        });
        return commandsResult;
    }
    getGoToResponse(relevantWords) {
        const result = new ParseInputResult('');
        // get gateway actions
        const gatewayActions = this.Game.getActionsInScene().filter(val => {
            return val.getInteractionType() === InteractionType.GO_TO;
        });
        if (!gatewayActions || gatewayActions.length <= 0) {
            result.Result = this.Game.getGatewayTargetNotFoundResponse();
            return result;
        }
        const actionDistances = this.getActionDistancesFromNouns(relevantWords, gatewayActions);
        if (!actionDistances || actionDistances.length <= 0) {
            result.Result = this.Game.getGatewayTargetNotFoundResponse();
            return result;
        }
        const action = actionDistances[0].Action;
        result.Result = action.trigger();
        result.IsEndGameResult = action.getIsEndGameAction();
        return result;
    }
    getLookAtResponse(relevantWords) {
        const result = new ParseInputResult('');
        const itemDistances = this.getItemDistancesFromNouns(relevantWords, this.Game.getItemsInScene(), this.Game.getItemsInInventory());
        if (!itemDistances || itemDistances.length <= 0) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }
        result.Result = itemDistances[0].Item.getDescription();
        return result;
    }
    getPickUpResponse(relevantWords) {
        const result = new ParseInputResult('');
        const itemDistances = this.getItemDistancesFromNouns(relevantWords, this.Game.getItemsInScene(), undefined);
        if (!itemDistances || itemDistances.length <= 0) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }
        const item = itemDistances[0].Item;
        if (!item.getCanPickUp()) {
            result.Result = item.getCannotPickUpResponse();
            return result;
        }
        // one cannot pick up an item, that has no usages left anymore
        if (item.getUsagesLeft() <= 0) {
            result.Result = item.getNoUsagesLeftResponse();
            return result;
        }
        this.Game.addItemToInventory(item);
        this.Game.removeItemFromScene(item);
        result.Result = this.Game.getItemAddedToInventoryResponse();
        return result;
    }
    getUseResponse(relevantWords) {
        const result = new ParseInputResult('');
        const itemDistances = this.getItemDistancesFromNouns(relevantWords, this.Game.getItemsInScene(), this.Game.getItemsInInventory());
        if (!itemDistances || itemDistances.length <= 0) {
            result.Result = this.Game.getItemNotFoundResponse();
            return result;
        }
        const currentItem = itemDistances[0].Item;
        if (!currentItem.CanUseFunction(currentItem, this.Game.getStage().getCurrentScene(), this.Game.getInventory())) {
            result.Result = currentItem.getCannotUseItemResponse();
            return result;
        }
        result.Result = currentItem.use();
        // if the item was in the inventory and has no usages left anymore -> remove it from inventory
        if (currentItem.WasPickedUp && currentItem.getUsagesLeft() <= 0) {
            result.Result += `\r\n${currentItem.getNoUsagesLeftResponse()}`;
            this.Game.removeItemFromInventory(currentItem);
        }
        return result;
    }
    getDoResponse(relevantWords) {
        const result = new ParseInputResult('');
        const actions = this.Game.getActionsInScene().filter(val => {
            return val.getInteractionType() === InteractionType.DO;
        });
        if (!actions || actions.length <= 0) {
            result.Result = this.Game.getActionNotRecognizedResponse();
            return result;
        }
        const actionDistances = this.getActionDistancesFromNouns(relevantWords, actions);
        if (!actionDistances || actionDistances.length <= 0) {
            result.Result = this.Game.getActionNotRecognizedResponse();
            return result;
        }
        const action = actionDistances[0].Action;
        result.Result = action.trigger();
        result.IsEndGameResult = action.getIsEndGameAction();
        return result;
    }
    getNounsAndVerbsFromTokenizedInput(taggedTokens) {
        return taggedTokens.reduce((result, token) => {
            if (nounCategories.includes(token.tag) || verbCategories.includes(token.tag)) {
                result.push(token.token);
            }
            return result;
        }, []);
    }
    getItemDistancesFromNouns(relevantWords, sceneItems, inventoryItems) {
        const itemDistances = [];
        let items = [];
        if (sceneItems) {
            items = items.concat(sceneItems);
        }
        if (inventoryItems) {
            items = items.concat(inventoryItems);
        }
        items.map(val => {
            const taggedName = this.POSTagger.tag(this.Tokenizer.tokenize(val.Name)).taggedWords;
            taggedName.map(name => {
                relevantWords.map(input => {
                    const distance = DamerauLevenshteinDistance(input, name.token, { transposition_cost: 0 });
                    if (distance <= 1) {
                        itemDistances.push(new ItemDistance(val, distance));
                    }
                });
            });
        });
        return itemDistances.sort(val => val.Distance);
    }
    getActionDistancesFromNouns(relevantWords, actions) {
        const actionDistances = [];
        actions.map(val => {
            const taggedTrigger = this.POSTagger.tag(this.Tokenizer.tokenize(val.getTrigger())).taggedWords;
            taggedTrigger.map(trigger => {
                relevantWords.map(input => {
                    const distance = DamerauLevenshteinDistance(input, trigger.token, { transposition_cost: 0 });
                    if (distance <= 1) {
                        actionDistances.push(new ActionDistance(val, distance));
                    }
                });
            });
        });
        return actionDistances.sort(val => val.Distance);
    }
    getInteractionType(input) {
        const result = this.Classifier.classify(input);
        return this.getInteractionTypeFromClassificationResult(result);
    }
    getInteractionTypeFromClassificationResult(result) {
        switch (result) {
            case 'use':
                return InteractionType.USE;
            case 'look_at':
                return InteractionType.LOOK_AT;
            case 'go_to':
                return InteractionType.GO_TO;
            case 'pick_up':
                return InteractionType.PICK_UP;
            case 'do':
                return InteractionType.DO;
            default:
                return InteractionType.DO;
        }
    }
}
InputParserService.ɵfac = function InputParserService_Factory(t) { return new (t || InputParserService)(); };
InputParserService.ɵprov = ɵɵdefineInjectable({ factory: function InputParserService_Factory() { return new InputParserService(); }, token: InputParserService, providedIn: "root" });
InputParserService.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InputParserService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
class ActionTag {
    constructor(action, tag) {
        this.Action = action;
        this.Tag = tag;
    }
}
class ActionDistance {
    constructor(action, distance) {
        this.Action = action;
        this.Distance = distance;
    }
}
class ItemDistance {
    constructor(item, distance) {
        this.Item = item;
        this.Distance = distance;
    }
}
class ItemTag {
    constructor(item, tag) {
        this.Item = item;
        this.Tag = tag;
    }
}
class TaggedToken {
}

class ClassificationTrainer {
    trainClassifier(classifier) {
        return new Promise((resolve) => {
            classifier.addDocument('use keys', 'use');
            classifier.addDocument('use knob', 'use');
            classifier.addDocument('use old pen', 'use');
            classifier.addDocument('use rusty knife', 'use');
            classifier.addDocument('open door', 'use');
            classifier.addDocument('open oven', 'use');
            classifier.addDocument('open window', 'use');
            classifier.addDocument('interact with animal', 'use');
            classifier.addDocument('interact person', 'use');
            classifier.addDocument('close door', 'use');
            classifier.addDocument('close chest', 'use');
            classifier.addDocument('shut window', 'use');
            classifier.addDocument('shut the lid', 'use');
            classifier.addDocument('drink soda', 'use');
            classifier.addDocument('drink water', 'use');
            classifier.addDocument('eat mushrooms', 'use');
            classifier.addDocument('eat food', 'use');
            classifier.addDocument('look at house', 'look_at');
            classifier.addDocument('look at the chair', 'look_at');
            classifier.addDocument('inspect door', 'look_at');
            classifier.addDocument('inspect knife', 'look_at');
            classifier.addDocument('check window', 'look_at');
            classifier.addDocument('check fireplace', 'look_at');
            classifier.addDocument('analyze notes', 'look_at');
            classifier.addDocument('analyze keys', 'look_at');
            classifier.addDocument('read book', 'look_at');
            classifier.addDocument('read letter', 'look_at');
            classifier.addDocument('observe darkness', 'look_at');
            classifier.addDocument('observe forrest', 'look_at');
            classifier.addDocument('go inside', 'go_to');
            classifier.addDocument('go outside', 'go_to');
            classifier.addDocument('enter building', 'go_to');
            classifier.addDocument('enter home', 'go_to');
            classifier.addDocument('leave house', 'go_to');
            classifier.addDocument('leave hut', 'go_to');
            classifier.addDocument('run away', 'go_to');
            classifier.addDocument('run into the darkness', 'go_to');
            classifier.addDocument('walk to place', 'go_to');
            classifier.addDocument('walk to the shed', 'go_to');
            classifier.addDocument('walk into the bar', 'go_to');
            classifier.addDocument('go to Peter', 'go_to');
            classifier.addDocument('go in to the forrest', 'go_to');
            classifier.addDocument('go into the cellar', 'go_to');
            classifier.addDocument('take keys', 'pick_up');
            classifier.addDocument('take up book', 'pick_up');
            classifier.addDocument('take notebook', 'pick_up');
            classifier.addDocument('pick up a lighter', 'pick_up');
            classifier.addDocument('pick up leash', 'pick_up');
            classifier.addDocument('put something into bag', 'pick_up');
            classifier.addDocument('put water bottle into inventory', 'pick_up');
            classifier.addDocument('gather mushrooms', 'pick_up');
            classifier.addDocument('collect stones', 'pick_up');
            classifier.addDocument('acquire medal', 'pick_up');
            classifier.addDocument('dance', 'do');
            classifier.addDocument('sit', 'do');
            classifier.addDocument('stand', 'do');
            classifier.addDocument('sleep', 'do');
            classifier.addDocument('fish', 'do');
            classifier.addDocument('do', 'do');
            classifier.addDocument('write', 'do');
            classifier.addDocument('read', 'do');
            classifier.addDocument('find', 'do');
            classifier.addDocument('work', 'do');
            classifier.addDocument('try', 'do');
            classifier.addDocument('feel', 'do');
            classifier.addDocument('create', 'do');
            classifier.addDocument('speak', 'do');
            classifier.addDocument('talk', 'do');
            classifier.addDocument('offer', 'do');
            classifier.addDocument('buy', 'do');
            classifier.addDocument('kill', 'do');
            classifier.addDocument('beat', 'do');
            classifier.addDocument('harm', 'do');
            classifier.addDocument('jump', 'do');
            classifier.addDocument('sell', 'do');
            classifier.addDocument('pull', 'do');
            classifier.addDocument('push', 'do');
            classifier.addDocument('put', 'do');
            classifier.events.on('trainedWithDocument', () => resolve());
            classifier.train();
            resolve();
        });
    }
}
ClassificationTrainer.ɵfac = function ClassificationTrainer_Factory(t) { return new (t || ClassificationTrainer)(); };
ClassificationTrainer.ɵprov = ɵɵdefineInjectable({ factory: function ClassificationTrainer_Factory() { return new ClassificationTrainer(); }, token: ClassificationTrainer, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ClassificationTrainer, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

class GameResetEvent {
    constructor(game) {
    }
}

class GameEndEvent {
    constructor(game) {
    }
}

class GameStartEvent {
}

/**
 * Main Component, that contains the input and output of the game.
 */
class TextAdventureComponent {
    constructor(inputParserService) {
        this.inputParserService = inputParserService;
        this.OutputArray = [];
        this.IsLoading = false;
        this.UseTypewritingAnimation = true;
        this.TypewriterSpeed = 40;
        this.OnGameStartEvent = new EventEmitter();
        this.OnGameResetEvent = new EventEmitter();
        this.OnGameEndEvent = new EventEmitter();
        this.InputForm = new FormGroup({
            userInput: new FormControl({
                value: '',
                disabled: this.IsLoading
            }, [
                Validators.required
            ])
        });
        if (!this.ClassificationTrainer) {
            inputParserService.initialize(new ClassificationTrainer());
        }
        else {
            inputParserService.initialize(this.ClassificationTrainer);
        }
    }
    ngOnInit() {
        this.startLoading();
        if (!this.Game) {
            throw new GameError('Game not found.');
        }
        this.startGame();
    }
    OnSubmit() {
        this.startLoading();
        const inputString = this.userInput.value;
        if (!inputString) {
            this.stopLoading();
            return;
        }
        this.printInput(inputString);
        this.userInput.setValue('');
        const parseResult = this.inputParserService.parseInput(inputString);
        this.printOutput(parseResult.Result, parseResult.UseTypewriterAnimation).then(() => this.stopLoading());
    }
    OnGameReset() {
        this.OnGameResetEvent.emit(new GameResetEvent(this.Game));
    }
    OnGameEnd() {
        this.OnGameEndEvent.emit(new GameEndEvent(this.Game));
    }
    get userInput() {
        return this.InputForm.get('userInput');
    }
    startLoading() {
        this.IsLoading = true;
        this.userInput.disable();
    }
    stopLoading() {
        this.IsLoading = false;
        this.userInput.enable();
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    startGame() {
        this.inputParserService.setGame(this.Game);
        this.OnGameStartEvent.emit(new GameStartEvent());
        this.printOutput(this.Game.getTitle()).then(() => this.printOutput(this.Game.getIntroduction())).then(() => this.stopLoading());
    }
    printOutput(output, useTypewriteAnimationOnOutput = true) {
        return new Promise((outerResolve) => {
            if (useTypewriteAnimationOnOutput && this.UseTypewritingAnimation) {
                const outputLines = output.split('\r\n');
                // we create a promise chain, in order to avoid printing new lines written as '<br>'
                let outputPromise = new Promise((resolve) => resolve());
                for (const singleLine of outputLines) {
                    outputPromise = outputPromise.then(() => this.printLineAnimated(singleLine));
                }
                outputPromise = outputPromise.then(outerResolve);
            }
            else {
                output = output.split('\r\n').join('<br>');
                this.OutputArray.push(new TextInput(output, TextInputType.Output));
                outerResolve();
            }
        });
    }
    printLineAnimated(line) {
        return new Promise((resolve) => {
            this.OutputArray.push(new TextInput('', TextInputType.Output));
            // exit the recursion with the "resolve" function of the promise
            this.typewriteOutput(0, line, this.OutputArray, resolve);
        });
    }
    typewriteOutput(i, output, outputArray, resolveFunction) {
        if (i >= output.length) {
            resolveFunction();
        }
        const char = output.charAt(i);
        outputArray[outputArray.length - 1].Value += char;
        i++;
        setTimeout(() => {
            this.typewriteOutput(i, output, this.OutputArray, resolveFunction);
        }, this.TypewriterSpeed);
    }
    printInput(input) {
        this.OutputArray.push(new TextInput(input, TextInputType.UserInput));
    }
}
TextAdventureComponent.ɵfac = function TextAdventureComponent_Factory(t) { return new (t || TextAdventureComponent)(ɵngcc0.ɵɵdirectiveInject(InputParserService)); };
TextAdventureComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: TextAdventureComponent, selectors: [["tas-text-adventure"]], viewQuery: function TextAdventureComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵstaticViewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.inputElement = _t.first);
    } }, inputs: { UseTypewritingAnimation: "UseTypewritingAnimation", TypewriterSpeed: "TypewriterSpeed", Game: "Game", ClassificationTrainer: "ClassificationTrainer" }, outputs: { OnGameStartEvent: "OnGameStartEvent", OnGameResetEvent: "OnGameResetEvent", OnGameEndEvent: "OnGameEndEvent" }, decls: 12, vars: 2, consts: [[1, "container-fluid", "text-adventure-root", "h-100", "w-100"], [1, "row", "output-container-wrapper"], [1, "output-container"], [3, "ngClass", 4, "ngFor", "ngForOf"], [1, "row", "input-container-wrapper"], [1, "row", "input-container"], [3, "formGroup", "ngSubmit"], [1, "form-group"], ["type", "text", "formControlName", "userInput", "autofocus", "", 1, "form-control"], ["input", ""], [3, "ngClass"], [3, "innerHTML"]], template: function TextAdventureComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵelementStart(3, "table");
        ɵngcc0.ɵɵelementStart(4, "tbody");
        ɵngcc0.ɵɵtemplate(5, TextAdventureComponent_tr_5_Template, 2, 2, "tr", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 4);
        ɵngcc0.ɵɵelementStart(7, "div", 5);
        ɵngcc0.ɵɵelementStart(8, "form", 6);
        ɵngcc0.ɵɵlistener("ngSubmit", function TextAdventureComponent_Template_form_ngSubmit_8_listener() { return ctx.OnSubmit(); });
        ɵngcc0.ɵɵelementStart(9, "div", 7);
        ɵngcc0.ɵɵelement(10, "input", 8, 9);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.OutputArray);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("formGroup", ctx.InputForm);
    } }, directives: [ɵngcc1.NgForOf, ɵngcc2.ɵangular_packages_forms_forms_y, ɵngcc2.NgControlStatusGroup, ɵngcc2.FormGroupDirective, ɵngcc2.DefaultValueAccessor, ɵngcc2.NgControlStatus, ɵngcc2.FormControlName, ɵngcc1.NgClass], styles: [".text-adventure-root[_ngcontent-%COMP%]{background:#222;color:#ddd;font-family:Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace;height:100%;margin:0}.text-adventure-root[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{margin:0}.text-adventure-root[_ngcontent-%COMP%]   .output-container-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse;height:95%;overflow:hidden;padding:8px}.text-adventure-root[_ngcontent-%COMP%]   .output-container-wrapper[_ngcontent-%COMP%]   .output-container[_ngcontent-%COMP%]{display:flex;text-overflow:ellipsis}.text-adventure-root[_ngcontent-%COMP%]   .output-container-wrapper[_ngcontent-%COMP%]   .output-container[_ngcontent-%COMP%]   .input-line[_ngcontent-%COMP%]{font-style:italic}.text-adventure-root[_ngcontent-%COMP%]   .input-container-wrapper[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#222;border-radius:0;border-top:1px solid #ddd;border-width:0;box-sizing:border-box;color:#ddd;padding:8px;width:100%}"] });
TextAdventureComponent.ctorParameters = () => [
    { type: InputParserService }
];
TextAdventureComponent.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['input', { static: true },] }],
    UseTypewritingAnimation: [{ type: Input }],
    TypewriterSpeed: [{ type: Input }],
    Game: [{ type: Input }],
    ClassificationTrainer: [{ type: Input }],
    OnGameStartEvent: [{ type: Output }],
    OnGameResetEvent: [{ type: Output }],
    OnGameEndEvent: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TextAdventureComponent, [{
        type: Component,
        args: [{
                selector: 'tas-text-adventure',
                template: "<div class=\"container-fluid text-adventure-root h-100 w-100\">\r\n  <div class=\"row output-container-wrapper\">\r\n    <div class=\"output-container\">\r\n      <table>\r\n        <tbody>\r\n          <tr *ngFor=\"let line of OutputArray; let index = i\"\r\n            [ngClass]=\"line.Type  === 'input'? 'input-line' : 'output-line'\">\r\n            <td [innerHTML]='line.Value'></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div class=\"row input-container-wrapper\">\r\n    <div class=\"row input-container\">\r\n      <form [formGroup]=\"InputForm\" (ngSubmit)=\"OnSubmit()\">\r\n        <div class=\"form-group\">\r\n          <input type=\"text\" class=\"form-control\" #input formControlName=\"userInput\" autofocus>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".text-adventure-root{background:#222;color:#ddd;font-family:Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace;height:100%;margin:0}.text-adventure-root .row{margin:0}.text-adventure-root .output-container-wrapper{display:flex;flex-direction:column-reverse;height:95%;overflow:hidden;padding:8px}.text-adventure-root .output-container-wrapper .output-container{display:flex;text-overflow:ellipsis}.text-adventure-root .output-container-wrapper .output-container .input-line{font-style:italic}.text-adventure-root .input-container-wrapper .input-container form .form-group input{background-color:#222;border-radius:0;border-top:1px solid #ddd;border-width:0;box-sizing:border-box;color:#ddd;padding:8px;width:100%}"]
            }]
    }], function () { return [{ type: InputParserService }]; }, { UseTypewritingAnimation: [{
            type: Input
        }], TypewriterSpeed: [{
            type: Input
        }], OnGameStartEvent: [{
            type: Output
        }], OnGameResetEvent: [{
            type: Output
        }], OnGameEndEvent: [{
            type: Output
        }], inputElement: [{
            type: ViewChild,
            args: ['input', { static: true }]
        }], Game: [{
            type: Input
        }], ClassificationTrainer: [{
            type: Input
        }] }); })();

class TextAdventureModule {
}
TextAdventureModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: TextAdventureModule });
TextAdventureModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function TextAdventureModule_Factory(t) { return new (t || TextAdventureModule)(); }, imports: [[
            ReactiveFormsModule,
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(TextAdventureModule, { declarations: function () { return [TextAdventureComponent]; }, imports: function () { return [ReactiveFormsModule,
        CommonModule]; }, exports: function () { return [TextAdventureComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TextAdventureModule, [{
        type: NgModule,
        args: [{
                imports: [
                    ReactiveFormsModule,
                    CommonModule
                ],
                declarations: [
                    TextAdventureComponent
                ],
                exports: [
                    TextAdventureComponent
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of text-adventure-sama
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Command, CommandBuilder, Game, GameBuilder, InGameItem$1 as InGameItem, InteractionType, Inventory, InventoryBuilder, ItemBuilder, Scene, SceneBuilder, Stage, TextAdventureComponent, TextAdventureModule, BaseBuilder as ɵa, InGameItem as ɵb, InputParserService as ɵc };

//# sourceMappingURL=text-adventure-sama.js.map