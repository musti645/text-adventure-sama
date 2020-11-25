(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('lodash'), require('@angular/common'), require('@angular/forms'), require('natural')) :
    typeof define === 'function' && define.amd ? define('text-adventure-sama', ['exports', 'rxjs', '@angular/core', 'lodash', '@angular/common', '@angular/forms', 'natural'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['text-adventure-sama'] = {}, global.rxjs, global.ng.core, global._, global.ng.common, global.ng.forms, global.natural));
}(this, (function (exports, rxjs, i0, _, common, forms, natural) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * Global commands within the game that are evaluated before all of the other elements
     */
    var Command = /** @class */ (function () {
        function Command() {
        }
        Command.prototype.activate = function () {
            if (this.Response) {
                return this.Response;
            }
            else {
                return this.ResponseFunction();
            }
        };
        Command.prototype.setTrigger = function (trigger) {
            this.Trigger = trigger;
        };
        Command.prototype.getTrigger = function () {
            return this.Trigger;
        };
        Command.prototype.setResponse = function (response) {
            this.Response = response;
        };
        Command.prototype.getResponse = function () {
            return this.Response;
        };
        Command.prototype.setResponseFunction = function (func) {
            this.ResponseFunction = func;
        };
        Command.prototype.getResponseFunction = function () {
            return this.ResponseFunction;
        };
        Command.prototype.setUseTypeWritingAnimation = function (use) {
            this.UseTypeWritingAnimation = use;
        };
        Command.prototype.getUseTypeWritingAnimation = function () {
            return this.UseTypeWritingAnimation;
        };
        Command.prototype.getDescription = function () {
            return this.Description;
        };
        Command.prototype.setDescription = function (desc) {
            this.Description = desc;
        };
        return Command;
    }());

    /**
     * Singleton Service handling Item Events
     */
    var ItemEventService = /** @class */ (function () {
        function ItemEventService() {
            this.ItemConsumingActionEventSource = new rxjs.Subject();
            this.ItemYieldingActionEventSource = new rxjs.Subject();
            this.ItemRemovingActionEventSource = new rxjs.Subject();
            this.ItemConsumingActionEvent$ = this.ItemConsumingActionEventSource.asObservable();
            this.ItemYieldingActionEvent$ = this.ItemYieldingActionEventSource.asObservable();
            this.ItemRemovingActionEvent$ = this.ItemRemovingActionEventSource.asObservable();
        }
        ItemEventService.getInstance = function () {
            if (!ItemEventService.Instance) {
                ItemEventService.Instance = new ItemEventService();
            }
            return ItemEventService.Instance;
        };
        ItemEventService.prototype.consumeItem = function (event) {
            this.ItemConsumingActionEventSource.next(event);
        };
        ItemEventService.prototype.yieldItem = function (event) {
            this.ItemYieldingActionEventSource.next(event);
        };
        ItemEventService.prototype.removeItem = function (event) {
            this.ItemRemovingActionEventSource.next(event);
        };
        return ItemEventService;
    }());
    ItemEventService.Instance = undefined;
    ItemEventService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ItemEventService_Factory() { return new ItemEventService(); }, token: ItemEventService, providedIn: "root" });
    ItemEventService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ItemEventService.ctorParameters = function () { return []; };

    var Inventory = /** @class */ (function () {
        function Inventory() {
            var _this = this;
            this.Items = [];
            ItemEventService.getInstance().ItemYieldingActionEvent$.subscribe(function (event) { return _this.OnItemYield(event); });
            ItemEventService.getInstance().ItemRemovingActionEvent$.subscribe(function (event) { return _this.OnItemRemove(event); });
            ItemEventService.getInstance().ItemConsumingActionEvent$.subscribe(function (event) { return _this.OnItemConsume(event); });
        }
        Inventory.prototype.OnItemYield = function (event) {
            if (event.ResetItemUsagesToMaximum) {
                event.Item.resetUsages();
            }
            for (var i = 0; i < event.AmountOfItems; i++) {
                // create a deep copy of the item (we also need the functions to be copied)
                this.addItem(_.cloneDeep(event.Item));
            }
        };
        Inventory.prototype.OnItemRemove = function (event) {
            this.removeItemFromInventory(event.Item.getID());
        };
        Inventory.prototype.OnItemConsume = function (event) {
            var items = this.findItemsById(event.Item.getID());
            items[0].use();
        };
        Inventory.prototype.findItemsById = function (id) {
            return this.Items.filter(function (o) { return o.getID() === id; });
        };
        Inventory.prototype.findItemsByName = function (name) {
            return this.Items.filter(function (o) { return o.getName() === name; });
        };
        Inventory.prototype.removeItemFromInventory = function (id) {
            this.Items = this.Items.filter(function (o) { return o.getID() !== id; });
        };
        Inventory.prototype.getItemCount = function () {
            return this.Items.length;
        };
        Inventory.prototype.addItem = function (toAdd) {
            toAdd.WasPickedUp = true;
            this.Items.push(toAdd);
        };
        Inventory.prototype.getItems = function () {
            return this.Items;
        };
        return Inventory;
    }());

    var GameError = /** @class */ (function (_super) {
        __extends(GameError, _super);
        function GameError(m) {
            var _this = _super.call(this, m) || this;
            Object.setPrototypeOf(_this, GameError.prototype);
            return _this;
        }
        return GameError;
    }(Error));

    /**
     * Singleton Service handling Scene Events
     */
    var SceneEventService = /** @class */ (function () {
        function SceneEventService() {
            this.GatewayActionEventSource = new rxjs.Subject();
            this.GatewayActionEvent$ = this.GatewayActionEventSource.asObservable();
        }
        SceneEventService.getInstance = function () {
            if (!SceneEventService.Instance) {
                SceneEventService.Instance = new SceneEventService();
            }
            return SceneEventService.Instance;
        };
        SceneEventService.prototype.changeScene = function (event) {
            this.GatewayActionEventSource.next(event);
        };
        return SceneEventService;
    }());
    SceneEventService.Instance = undefined;
    SceneEventService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SceneEventService_Factory() { return new SceneEventService(); }, token: SceneEventService, providedIn: "root" });
    SceneEventService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    SceneEventService.ctorParameters = function () { return []; };

    /**
     * The Stage contains all scenes (including a pointer to the current scene).
     * It also manages the transition between scenes.
     */
    var Stage = /** @class */ (function () {
        function Stage() {
            var _this = this;
            this.ScenePath = [];
            this.Scenes = [];
            SceneEventService.getInstance().GatewayActionEvent$.subscribe(function (event) { return _this.OnSceneChange(event); });
        }
        Stage.prototype.OnSceneChange = function (event) {
            this.goToScene(event.TargetSceneID);
        };
        Stage.prototype.getCurrentScene = function () {
            if (!this.CurrentScene) {
                this.CurrentScene = this.Scenes[0];
            }
            return this.CurrentScene;
        };
        Stage.prototype.goToScene = function (id) {
            var nextScene = this.Scenes.find(function (s) { return s.getID() === id; });
            if (!nextScene) {
                throw new GameError('Scene could not be found.');
            }
            this.ScenePath.push(id);
            this.CurrentScene = nextScene;
            return this.CurrentScene;
        };
        Stage.prototype.addScene = function (toAdd) {
            this.Scenes.push(toAdd);
        };
        Stage.prototype.getScenesCount = function () {
            return this.Scenes.length;
        };
        Stage.prototype.getScenes = function () {
            return this.Scenes;
        };
        return Stage;
    }());

    /**
     * Represents the Game.
     */
    var Game = /** @class */ (function () {
        function Game() {
            this.Stage = new Stage();
            this.Inventory = new Inventory();
            this.Commands = [];
            this.initializeCommands();
        }
        Game.prototype.initializeCommands = function () {
            var _this = this;
            var helpCommand = new Command();
            helpCommand.setTrigger('help');
            helpCommand.setDescription('A list of all global commands');
            helpCommand.setUseTypeWritingAnimation(false);
            helpCommand.setResponseFunction(function () {
                var commandsHelp = '';
                _this.Commands.forEach(function (command) {
                    commandsHelp += command.getTrigger() + " - " + command.getDescription() + " \r\n ";
                });
                return commandsHelp;
            });
            this.Commands.push(helpCommand);
            var inventoryCommand = new Command();
            inventoryCommand.setTrigger('inventory');
            inventoryCommand.setDescription('List all items in your inventory.');
            inventoryCommand.setUseTypeWritingAnimation(false);
            inventoryCommand.setResponseFunction(function () {
                if (_this.Inventory.getItemCount() <= 0) {
                    return _this.InventoryEmptyResponse;
                }
                var inventoryContents = 'Items in Inventory: \r\n ';
                _this.Inventory.getItems().forEach(function (item) {
                    inventoryContents += item.getName() + " \r\n ";
                });
                return inventoryContents;
            });
            this.Commands.push(inventoryCommand);
            var sceneCommand = new Command();
            sceneCommand.setTrigger('look around');
            sceneCommand.setDescription('Get a description of the scene you\'re in');
            sceneCommand.setUseTypeWritingAnimation(true);
            sceneCommand.setResponseFunction(function () {
                var e_1, _a;
                var description = _this.Stage.getCurrentScene().getDescription();
                try {
                    for (var _b = __values(_this.Stage.getCurrentScene().getItems()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        description += " " + item.getInSceneDescription();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return description;
            });
            this.Commands.push(sceneCommand);
        };
        Game.prototype.getStage = function () {
            return this.Stage;
        };
        Game.prototype.getInventory = function () {
            return this.Inventory;
        };
        Game.prototype.setInventory = function (inventory) {
            this.Inventory = inventory;
        };
        Game.prototype.getScenesCount = function () {
            return this.Stage.getScenesCount();
        };
        Game.prototype.getTitle = function () {
            return this.Title;
        };
        Game.prototype.setTitle = function (title) {
            this.Title = title;
        };
        Game.prototype.getIntroduction = function () {
            return this.Introduction;
        };
        Game.prototype.setIntroduction = function (intro) {
            this.Introduction = intro;
        };
        Game.prototype.getCommands = function () {
            return this.Commands;
        };
        Game.prototype.setCommands = function (commands) {
            this.Commands = commands;
        };
        Game.prototype.getItemNotFoundResponse = function () {
            return this.Stage.getCurrentScene().getItemNotFoundResponse();
        };
        Game.prototype.getInvalidInputResponse = function () {
            return this.Stage.getCurrentScene().getInvalidInputResponse();
        };
        Game.prototype.getActionNotRecognizedResponse = function () {
            return this.Stage.getCurrentScene().getActionNotRecognizedResponse();
        };
        Game.prototype.getSceneDescription = function () {
            return this.Stage.getCurrentScene().getDescription();
        };
        Game.prototype.getItemNotFoundInInventoryResponse = function () {
            return this.ItemNotFoundInInventoryResponse;
        };
        Game.prototype.setItemNotFoundInInventoryResponse = function (response) {
            this.ItemNotFoundInInventoryResponse = response;
        };
        Game.prototype.getActionsInScene = function () {
            return this.Stage.getCurrentScene().getActions();
        };
        Game.prototype.getItemsInScene = function () {
            return this.Stage.getCurrentScene().getItems();
        };
        Game.prototype.getItemsInInventory = function () {
            return this.Inventory.getItems();
        };
        Game.prototype.removeItemFromScene = function (item) {
            this.Stage.getCurrentScene().removeItemFromScene(item);
        };
        Game.prototype.addItemToInventory = function (item) {
            this.Inventory.addItem(item);
        };
        Game.prototype.removeItemFromInventory = function (item) {
            this.Inventory.removeItemFromInventory(item.getID());
        };
        Game.prototype.getItemAddedToInventoryResponse = function () {
            return this.ItemAddedToInventoryResponse;
        };
        Game.prototype.setItemAddedToInventoryResponse = function (response) {
            this.ItemAddedToInventoryResponse = response;
        };
        Game.prototype.getGatewayTargetNotFoundResponse = function () {
            return this.GatewayTargetNotFoundResponse;
        };
        Game.prototype.setGatewayTargetNotFoundResponse = function (response) {
            this.GatewayTargetNotFoundResponse = response;
        };
        Game.prototype.getInventoryEmptyResponse = function () {
            return this.InventoryEmptyResponse;
        };
        Game.prototype.setInventoryEmptyResponse = function (response) {
            this.InventoryEmptyResponse = response;
        };
        return Game;
    }());

    var BaseBuilder = /** @class */ (function () {
        function BaseBuilder() {
        }
        return BaseBuilder;
    }());

    /**
     * This class represents an Item in the game.
     */
    var InGameItem = /** @class */ (function () {
        function InGameItem(id) {
            this.ID = id;
            this.CanPickUp = true;
        }
        InGameItem.prototype.CanUseFunction = function (item, currentScene, inventory) {
            return true;
        };
        InGameItem.prototype.use = function () {
            if (this.UsagesLeft >= 1) {
                this.UsagesLeft--;
                return this.ItemUsedResponse;
            }
            return this.NoUsagesLeftResponse;
        };
        InGameItem.prototype.resetUsages = function () {
            this.UsagesLeft = this.MaximumUsages;
        };
        InGameItem.prototype.setID = function (id) {
            this.ID = id;
        };
        InGameItem.prototype.getID = function () {
            return this.ID;
        };
        InGameItem.prototype.setName = function (name) {
            this.Name = name;
        };
        InGameItem.prototype.getName = function () {
            return this.Name;
        };
        InGameItem.prototype.setDescription = function (desc) {
            this.Description = desc;
        };
        InGameItem.prototype.getDescription = function () {
            return this.Description;
        };
        InGameItem.prototype.setMaximumUsages = function (usages) {
            this.MaximumUsages = usages;
        };
        InGameItem.prototype.getMaximumUsages = function () {
            return this.MaximumUsages;
        };
        InGameItem.prototype.setUsagesLeft = function (usages) {
            this.UsagesLeft = usages;
        };
        InGameItem.prototype.getUsagesLeft = function () {
            return this.UsagesLeft;
        };
        InGameItem.prototype.setItemUsedResponse = function (response) {
            this.ItemUsedResponse = response;
        };
        InGameItem.prototype.getItemUsedResponse = function () {
            return this.ItemUsedResponse;
        };
        InGameItem.prototype.setNoUsagesLeftResponse = function (response) {
            this.NoUsagesLeftResponse = response;
        };
        InGameItem.prototype.getNoUsagesLeftResponse = function () {
            return this.NoUsagesLeftResponse;
        };
        InGameItem.prototype.getCanPickUp = function () {
            return this.CanPickUp;
        };
        InGameItem.prototype.setCanPickUp = function (value) {
            this.CanPickUp = value;
        };
        InGameItem.prototype.setCannotPickUpResponse = function (response) {
            this.CannotPickUpResponse = response;
        };
        InGameItem.prototype.getCannotPickUpResponse = function () {
            return this.CannotPickUpResponse;
        };
        InGameItem.prototype.getInSceneDescription = function () {
            return this.InSceneDescription;
        };
        InGameItem.prototype.setInSceneDescription = function (descr) {
            this.InSceneDescription = descr;
        };
        InGameItem.prototype.setCanUseFunction = function (func) {
            this.CanUseFunction = func;
        };
        InGameItem.prototype.setCannotUseItemResponse = function (response) {
            this.CannotUseItemResponse = response;
        };
        InGameItem.prototype.getCannotUseItemResponse = function () {
            return this.CannotUseItemResponse;
        };
        InGameItem.prototype.getCanUseFunction = function () {
            return this.CanUseFunction;
        };
        return InGameItem;
    }());

    var BuilderError = /** @class */ (function (_super) {
        __extends(BuilderError, _super);
        function BuilderError(m) {
            var _this = _super.call(this, m) || this;
            Object.setPrototypeOf(_this, BuilderError.prototype);
            return _this;
        }
        return BuilderError;
    }(Error));

    var ItemBuilder = /** @class */ (function (_super) {
        __extends(ItemBuilder, _super);
        function ItemBuilder(builder, item, requireInSceneDescription) {
            if (item === void 0) { item = new InGameItem(); }
            if (requireInSceneDescription === void 0) { requireInSceneDescription = false; }
            var _this = _super.call(this) || this;
            _this.Item = item;
            _this.Builder = builder;
            _this.RequireInSceneDescription = requireInSceneDescription;
            return _this;
        }
        ItemBuilder.prototype.setName = function (name) {
            if (!name) {
                throw new EvalError('Name was undefined');
            }
            this.Item.setName(name);
            return this;
        };
        ItemBuilder.prototype.setDescription = function (description) {
            if (!description) {
                throw new EvalError('Description was undefined');
            }
            this.Item.setDescription(description);
            return this;
        };
        ItemBuilder.prototype.setMaximumUsages = function (maxUsages) {
            if (maxUsages === undefined || maxUsages <= 0) {
                throw new EvalError('MaximumUsages Value has to be greater than 0.');
            }
            if (this.Item.getUsagesLeft() && this.Item.getUsagesLeft() > maxUsages) {
                throw new EvalError('MaximumUsages Value has to be greater or equal to the UsagesLeft Value');
            }
            this.Item.setMaximumUsages(maxUsages);
            return this;
        };
        ItemBuilder.prototype.setUsagesLeft = function (usagesLeft) {
            if (usagesLeft === undefined || usagesLeft === null || usagesLeft < 0) {
                throw new EvalError('UsagesLeft Value has to be greater than or equal to 0.');
            }
            if (this.Item.getMaximumUsages() && usagesLeft > this.Item.getMaximumUsages()) {
                throw new EvalError('UsagesLeft Value has to be less or equal to the MaximumUsages Value.');
            }
            this.Item.setUsagesLeft(usagesLeft);
            return this;
        };
        ItemBuilder.prototype.setItemUsedResponse = function (response) {
            if (!response) {
                throw new EvalError('ItemUsedResponse was undefined.');
            }
            this.Item.setItemUsedResponse(response);
            return this;
        };
        ItemBuilder.prototype.setNoUsagesLeftResponse = function (response) {
            if (!response) {
                throw new EvalError('NoUsagesLeftResponse was undefined.');
            }
            this.Item.setNoUsagesLeftResponse(response);
            return this;
        };
        ItemBuilder.prototype.setCanPickUp = function (value) {
            this.Item.setCanPickUp(value);
            return this;
        };
        ItemBuilder.prototype.setCannotPickUpResponse = function (response) {
            if (!response) {
                throw new EvalError('CannotPickUpResponse was undefined.');
            }
            this.Item.setCannotPickUpResponse(response);
            return this;
        };
        ItemBuilder.prototype.setInSceneDescription = function (descr) {
            if (!descr) {
                throw new EvalError('InSceneDescription was undefined.');
            }
            this.Item.setInSceneDescription(descr);
            return this;
        };
        ItemBuilder.prototype.setCanUseFunction = function (func) {
            if (!func) {
                throw new EvalError('CanUseFunction was undefined.');
            }
            this.IsCanUseFunctionReplaced = true;
            this.Item.setCanUseFunction(func);
            return this;
        };
        ItemBuilder.prototype.setCannotUseItemResponse = function (response) {
            if (!response) {
                throw new EvalError('CannotUseItemResponse was undefined');
            }
            this.Item.setCannotUseItemResponse(response);
            return this;
        };
        ItemBuilder.prototype.finish = function () {
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
        };
        return ItemBuilder;
    }(BaseBuilder));

    var InventoryBuilder = /** @class */ (function (_super) {
        __extends(InventoryBuilder, _super);
        function InventoryBuilder(gameBuilder, game) {
            var _this = _super.call(this) || this;
            _this.GameBuilder = gameBuilder;
            _this.Game = game;
            _this.Inventory = new Inventory();
            return _this;
        }
        InventoryBuilder.prototype.addItem = function (item) {
            return new ItemBuilder(this, item);
        };
        InventoryBuilder.prototype.addItemToBuilder = function (item) {
            if (!item) {
                throw new BuilderError('Could not add Item to Inventory. Item was not set.');
            }
            this.Inventory.addItem(item);
            if (item.getID()) {
                this.GameBuilder.IdGeneratorService.addItemId(item);
            }
        };
        InventoryBuilder.prototype.finish = function () {
            this.Game.setInventory(this.Inventory);
            return this.GameBuilder;
        };
        return InventoryBuilder;
    }(BaseBuilder));

    /**
     * A Scene is a container of actions and Items.
     * The player can only be inside one scene at a time.
     */
    var Scene = /** @class */ (function () {
        function Scene(id) {
            this.ID = id;
            this.Items = [];
            this.Actions = [];
        }
        Scene.prototype.setID = function (id) {
            this.ID = id;
        };
        Scene.prototype.getID = function () {
            return this.ID;
        };
        Scene.prototype.getName = function () {
            return this.Name;
        };
        Scene.prototype.setName = function (name) {
            this.Name = name;
        };
        Scene.prototype.getDescription = function () {
            return this.Description;
        };
        Scene.prototype.setDescription = function (descr) {
            this.Description = descr;
        };
        Scene.prototype.getActionNotRecognizedResponse = function () {
            return this.ActionNotRecognizedResponse;
        };
        Scene.prototype.setActionNotRecognizedResponse = function (response) {
            this.ActionNotRecognizedResponse = response;
        };
        Scene.prototype.getItemNotFoundResponse = function () {
            return this.ItemNotFoundResponse;
        };
        Scene.prototype.setItemNotFoundResponse = function (response) {
            this.ItemNotFoundResponse = response;
        };
        Scene.prototype.getInvalidInputResponse = function () {
            return this.InvalidInputResponse;
        };
        Scene.prototype.setInvalidInputResponse = function (response) {
            this.InvalidInputResponse = response;
        };
        Scene.prototype.getActions = function () {
            return this.Actions;
        };
        Scene.prototype.getItems = function () {
            return this.Items;
        };
        Scene.prototype.removeItemFromScene = function (item) {
            var index = this.Items.indexOf(item);
            if (index > -1) {
                this.Items.splice(index, 1);
            }
        };
        return Scene;
    }());

    var BaseActionBuilder = /** @class */ (function (_super) {
        __extends(BaseActionBuilder, _super);
        function BaseActionBuilder(builder, action) {
            var _this = _super.call(this) || this;
            _this.Action = action;
            _this.Builder = builder;
            return _this;
        }
        BaseActionBuilder.prototype.setTrigger = function (trigger) {
            if (!trigger || trigger === '') {
                throw new EvalError('No Trigger found.');
            }
            this.Action.setTrigger(trigger);
            return this;
        };
        BaseActionBuilder.prototype.setResponse = function (response) {
            if (!response || response === '') {
                throw new EvalError('No Response found.');
            }
            this.Action.setResponse(response);
            return this;
        };
        BaseActionBuilder.prototype.setEndGameAction = function () {
            this.Action.setIsEndGameAction(true);
            return this;
        };
        BaseActionBuilder.prototype.onFinish = function () {
        };
        BaseActionBuilder.prototype.finish = function () {
            if (!this.Action.getTrigger()) {
                throw new BuilderError('Action creation could not be finished. Trigger was not set.');
            }
            if (!this.Action.getResponse()) {
                throw new BuilderError('Action creation could not be finished. Response was not set.');
            }
            this.onFinish();
            this.Builder.addActionToBuilder(this.Action);
            return this.Builder;
        };
        return BaseActionBuilder;
    }(BaseBuilder));

    (function (InteractionType) {
        InteractionType[InteractionType["USE"] = 0] = "USE";
        InteractionType[InteractionType["LOOK_AT"] = 1] = "LOOK_AT";
        InteractionType[InteractionType["GO_TO"] = 2] = "GO_TO";
        InteractionType[InteractionType["PICK_UP"] = 3] = "PICK_UP";
        InteractionType[InteractionType["DO"] = 4] = "DO";
    })(exports.InteractionType || (exports.InteractionType = {}));

    /**
     * Abstract Base class for all actions.
     */
    // Note: Actions don't have IDs, since they are triggered via their InteractionType and their Trigger
    var Action = /** @class */ (function () {
        function Action() {
            this.IsEndGameAction = false;
        }
        Action.prototype.setTrigger = function (trigger) {
            this.Trigger = trigger;
        };
        Action.prototype.setInteractionType = function (type) {
            this.InteractionType = type;
        };
        Action.prototype.setResponse = function (response) {
            this.Response = response;
        };
        Action.prototype.setIsEndGameAction = function (endGameAction) {
            this.IsEndGameAction = endGameAction;
        };
        Action.prototype.getTrigger = function () {
            return this.Trigger;
        };
        Action.prototype.getIsEndGameAction = function () {
            return this.IsEndGameAction;
        };
        Action.prototype.getInteractionType = function () {
            return this.InteractionType;
        };
        Action.prototype.getResponse = function () {
            return this.Response;
        };
        return Action;
    }());

    /**
     * A OneTimeAction is only triggered once
     * Each subsequent trigger returns the same response.
     */
    var OneTimeAction = /** @class */ (function (_super) {
        __extends(OneTimeAction, _super);
        function OneTimeAction() {
            var _this = _super.call(this) || this;
            _this.setInteractionType(exports.InteractionType.DO);
            return _this;
        }
        OneTimeAction.prototype.trigger = function () {
            if (this.WasTriggered) {
                return this.ResponseAfterUse;
            }
            this.WasTriggered = true;
            return this.getResponse();
        };
        OneTimeAction.prototype.reset = function () {
            this.WasTriggered = false;
        };
        OneTimeAction.prototype.getWasTriggered = function () {
            return this.WasTriggered;
        };
        OneTimeAction.prototype.setWasTriggered = function (triggered) {
            this.WasTriggered = triggered;
        };
        OneTimeAction.prototype.getResponseAfterUse = function () {
            return this.ResponseAfterUse;
        };
        OneTimeAction.prototype.setResponseAfterUse = function (response) {
            this.ResponseAfterUse = response;
        };
        return OneTimeAction;
    }(Action));

    var ItemYieldingActionEvent = /** @class */ (function () {
        function ItemYieldingActionEvent(action) {
            this.Item = action.getItem();
            this.Response = action.getResponse();
            this.ResponseAfterUse = action.getResponseAfterUse();
            this.WasTriggered = action.getWasTriggered();
            this.AmountOfItems = action.getAmountOfItems();
            this.ResetItemUsagesToMaximum = action.getResetItemUsagesToMaximum();
        }
        return ItemYieldingActionEvent;
    }());

    /**
     * An ItemYieldingAction is only triggered once and adds an Item to the players inventory.
     */
    var ItemYieldingAction = /** @class */ (function (_super) {
        __extends(ItemYieldingAction, _super);
        function ItemYieldingAction() {
            var _this = _super.call(this) || this;
            _this.AmountOfItems = 1;
            _this.setInteractionType(exports.InteractionType.DO);
            return _this;
        }
        ItemYieldingAction.prototype.trigger = function () {
            // trigger addition of item to inventory
            if (this.getWasTriggered()) {
                return this.getResponseAfterUse();
            }
            ItemEventService.getInstance().yieldItem(new ItemYieldingActionEvent(this));
            this.setWasTriggered(true);
            return this.getResponse();
        };
        ItemYieldingAction.prototype.reset = function () {
            this.setWasTriggered(false);
        };
        ItemYieldingAction.prototype.getItem = function () {
            return this.Item;
        };
        ItemYieldingAction.prototype.setItem = function (item) {
            this.Item = item;
        };
        ItemYieldingAction.prototype.setAmountOfItems = function (amount) {
            this.AmountOfItems = amount;
        };
        ItemYieldingAction.prototype.getAmountOfItems = function () {
            return this.AmountOfItems;
        };
        ItemYieldingAction.prototype.getResetItemUsagesToMaximum = function () {
            return this.ResetItemUsagesToMaximum;
        };
        ItemYieldingAction.prototype.setResetItemUsagesToMaximum = function (reset) {
            this.ResetItemUsagesToMaximum = reset;
        };
        return ItemYieldingAction;
    }(OneTimeAction));

    var GatewayActionEvent = /** @class */ (function () {
        function GatewayActionEvent(action) {
            this.TargetSceneID = action.getTargetSceneId();
            this.TargetSceneName = action.getTargetSceneName();
        }
        return GatewayActionEvent;
    }());

    /**
     * When a GatewayAction is triggered, the game moves on to another scene.
     */
    var GatewayAction = /** @class */ (function (_super) {
        __extends(GatewayAction, _super);
        function GatewayAction() {
            var _this = _super.call(this) || this;
            _this.setInteractionType(exports.InteractionType.GO_TO);
            return _this;
        }
        GatewayAction.prototype.trigger = function () {
            // trigger event change
            SceneEventService.getInstance().changeScene(new GatewayActionEvent(this));
            return this.getResponse();
        };
        GatewayAction.prototype.reset = function () {
        };
        GatewayAction.prototype.getTargetSceneId = function () {
            return this.TargetSceneId;
        };
        GatewayAction.prototype.setTargetSceneId = function (id) {
            this.TargetSceneId = id;
        };
        GatewayAction.prototype.getTargetSceneName = function () {
            return this.TargetSceneName;
        };
        GatewayAction.prototype.setTargetSceneName = function (name) {
            this.TargetSceneName = name;
        };
        return GatewayAction;
    }(Action));

    var GatewayActionBuilder = /** @class */ (function (_super) {
        __extends(GatewayActionBuilder, _super);
        function GatewayActionBuilder(builder) {
            return _super.call(this, builder, new GatewayAction()) || this;
        }
        GatewayActionBuilder.prototype.setTargetSceneId = function (id) {
            if (id === undefined || id <= 0) {
                throw new EvalError('TargetSceneId Value has to be greater than 0.');
            }
            this.Action.setTargetSceneId(id);
            return this;
        };
        GatewayActionBuilder.prototype.setTargetSceneName = function (name) {
            if (!name) {
                throw new EvalError('TargetSceneName Value is invalid.');
            }
            this.Action.setTargetSceneName(name);
            return this;
        };
        GatewayActionBuilder.prototype.onFinish = function () {
            if (!this.Action.getTargetSceneId() && !this.Action.getTargetSceneName()) {
                throw new BuilderError('Action creation could not be finished. SceneId and/or TargetSceneName were not set.');
            }
        };
        return GatewayActionBuilder;
    }(BaseActionBuilder));

    var ItemConsumingActionEvent = /** @class */ (function () {
        function ItemConsumingActionEvent(action) {
            this.Item = action.getItem();
            this.Response = action.getResponse();
            this.ResponseAfterUse = action.getResponseAfterUse();
            this.WasTriggered = action.getWasTriggered();
        }
        return ItemConsumingActionEvent;
    }());

    /**
     * An ItemConsumingAction is only triggered once and uses an Item (once) in the players inventory.
     * It can only be triggered, if the user has got the Item in her inventory.
     */
    var ItemConsumingAction = /** @class */ (function (_super) {
        __extends(ItemConsumingAction, _super);
        function ItemConsumingAction() {
            var _this = _super.call(this) || this;
            _this.setInteractionType(exports.InteractionType.USE);
            return _this;
        }
        ItemConsumingAction.prototype.trigger = function () {
            if (this.getWasTriggered()) {
                return this.getResponseAfterUse();
            }
            ItemEventService.getInstance().consumeItem(new ItemConsumingActionEvent(this));
            this.setWasTriggered(true);
            return this.getResponse();
        };
        ItemConsumingAction.prototype.reset = function () {
            this.setWasTriggered(false);
        };
        ItemConsumingAction.prototype.getItem = function () {
            return this.Item;
        };
        ItemConsumingAction.prototype.setItem = function (item) {
            this.Item = item;
        };
        return ItemConsumingAction;
    }(OneTimeAction));

    var ItemConsumingActionBuilder = /** @class */ (function (_super) {
        __extends(ItemConsumingActionBuilder, _super);
        function ItemConsumingActionBuilder(builder) {
            return _super.call(this, builder, new ItemConsumingAction()) || this;
        }
        ItemConsumingActionBuilder.prototype.setWasTrigered = function (wasTriggered) {
            if (wasTriggered === undefined || wasTriggered === null) {
                throw new EvalError('WasTriggered was not set.');
            }
            this.Action.setWasTriggered(wasTriggered);
            return this;
        };
        ItemConsumingActionBuilder.prototype.setResponseAfterUse = function (response) {
            if (!response || response === '') {
                throw new EvalError('No Response found.');
            }
            this.Action.setResponseAfterUse(response);
            return this;
        };
        ItemConsumingActionBuilder.prototype.setInteractionType = function (type) {
            if (!type || !Object.values(exports.InteractionType).includes(type)) {
                throw new EvalError('InteractionType not set.');
            }
            this.Action.setInteractionType(type);
            return this;
        };
        ItemConsumingActionBuilder.prototype.addItemToBuilder = function (item) {
            if (!item) {
                throw new BuilderError('Item could not be added to the Action. Item was not set.');
            }
            this.Action.setItem(item);
        };
        ItemConsumingActionBuilder.prototype.addItem = function (item) {
            return new ItemBuilder(this, item);
        };
        ItemConsumingActionBuilder.prototype.onFinish = function () {
            if (!this.Action.getItem()) {
                throw new BuilderError('Action creation could not be finished. Item was not set.');
            }
            if (!this.Action.getResponseAfterUse()) {
                throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
            }
        };
        return ItemConsumingActionBuilder;
    }(BaseActionBuilder));

    var ItemRemovingActionEvent = /** @class */ (function () {
        function ItemRemovingActionEvent(action) {
            this.Item = action.getItem();
            this.Response = action.getResponse();
            this.ResponseAfterUse = action.getResponseAfterUse();
            this.WasTriggered = action.getWasTriggered();
        }
        return ItemRemovingActionEvent;
    }());

    /**
     * An ItemRemovingAction is only triggered once and removes an Item out of the players inventory without using it.
     * It can only be triggered, if the user has got the Item in her inventory.
     */
    var ItemRemovingAction = /** @class */ (function (_super) {
        __extends(ItemRemovingAction, _super);
        function ItemRemovingAction() {
            var _this = _super.call(this) || this;
            _this.setInteractionType(exports.InteractionType.USE);
            return _this;
        }
        ItemRemovingAction.prototype.trigger = function () {
            if (this.getWasTriggered()) {
                return this.getResponseAfterUse();
            }
            ItemEventService.getInstance().removeItem(new ItemRemovingActionEvent(this));
            this.setWasTriggered(true);
            return this.getResponse();
        };
        ItemRemovingAction.prototype.reset = function () {
            this.setWasTriggered(false);
        };
        ItemRemovingAction.prototype.getItem = function () {
            return this.Item;
        };
        ItemRemovingAction.prototype.setItem = function (item) {
            this.Item = item;
        };
        return ItemRemovingAction;
    }(OneTimeAction));

    var ItemRemovingActionBuilder = /** @class */ (function (_super) {
        __extends(ItemRemovingActionBuilder, _super);
        function ItemRemovingActionBuilder(builder) {
            return _super.call(this, builder, new ItemRemovingAction()) || this;
        }
        ItemRemovingActionBuilder.prototype.addItemToBuilder = function (item) {
            if (!item) {
                throw new BuilderError('Item could not be added to the Action. Item was not set.');
            }
            this.Action.setItem(item);
        };
        ItemRemovingActionBuilder.prototype.setWasTrigered = function (wasTriggered) {
            if (wasTriggered === undefined || wasTriggered === null) {
                throw new EvalError('WasTriggered was not set.');
            }
            this.Action.setWasTriggered(wasTriggered);
            return this;
        };
        ItemRemovingActionBuilder.prototype.setResponseAfterUse = function (response) {
            if (!response || response === '') {
                throw new EvalError('No Response found.');
            }
            this.Action.setResponseAfterUse(response);
            return this;
        };
        ItemRemovingActionBuilder.prototype.setInteractionType = function (type) {
            if (!type || !Object.values(exports.InteractionType).includes(type)) {
                throw new EvalError('InteractionType not set.');
            }
            this.Action.setInteractionType(type);
            return this;
        };
        ItemRemovingActionBuilder.prototype.addItem = function (item) {
            return new ItemBuilder(this, item);
        };
        ItemRemovingActionBuilder.prototype.onFinish = function () {
            if (!this.Action.getItem()) {
                throw new BuilderError('Action creation could not be finished. Item was not set.');
            }
            if (!this.Action.getResponseAfterUse()) {
                throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
            }
        };
        return ItemRemovingActionBuilder;
    }(BaseActionBuilder));

    var ItemYieldingActionBuilder = /** @class */ (function (_super) {
        __extends(ItemYieldingActionBuilder, _super);
        function ItemYieldingActionBuilder(builder) {
            return _super.call(this, builder, new ItemYieldingAction()) || this;
        }
        ItemYieldingActionBuilder.prototype.addItemToBuilder = function (item) {
            if (!item) {
                throw new BuilderError('Item could not be added to the Action. Item was not set.');
            }
            this.Action.setItem(item);
        };
        ItemYieldingActionBuilder.prototype.addItem = function (item) {
            return new ItemBuilder(this, item);
        };
        ItemYieldingActionBuilder.prototype.setWasTrigered = function (wasTriggered) {
            if (wasTriggered === undefined || wasTriggered === null) {
                throw new EvalError('WasTriggered was not set.');
            }
            this.Action.setWasTriggered(wasTriggered);
            return this;
        };
        ItemYieldingActionBuilder.prototype.setResponseAfterUse = function (response) {
            if (!response || response === '') {
                throw new EvalError('No Response found.');
            }
            this.Action.setResponseAfterUse(response);
            return this;
        };
        ItemYieldingActionBuilder.prototype.setAmountOfItems = function (amount) {
            if (amount === undefined || amount <= 0) {
                throw new EvalError('AmountOfItems Value has to be greater than 0.');
            }
            this.Action.setAmountOfItems(amount);
            return this;
        };
        ItemYieldingActionBuilder.prototype.setInteractionType = function (type) {
            if (!type || !Object.values(exports.InteractionType).includes(type)) {
                throw new EvalError('InteractionType not set.');
            }
            this.Action.setInteractionType(type);
            return this;
        };
        ItemYieldingActionBuilder.prototype.setResetItemUsagesToMaximum = function (reset) {
            if (reset === undefined || reset === null) {
                throw new EvalError('WasTriggered was not set.');
            }
            this.Action.setResetItemUsagesToMaximum(reset);
            return this;
        };
        ItemYieldingActionBuilder.prototype.onFinish = function () {
            if (!this.Action.getItem()) {
                throw new BuilderError('Action creation could not be finished. Item was not set.');
            }
            if (!this.Action.getResponseAfterUse()) {
                throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
            }
        };
        return ItemYieldingActionBuilder;
    }(BaseActionBuilder));

    /**
     * A MultiTimeAction can be activated multiple times.
     * The class allows you to pass an array of responses,
     * which will be returned one by one until the maximum usage count is reached.
     */
    var MultiTimeAction = /** @class */ (function (_super) {
        __extends(MultiTimeAction, _super);
        function MultiTimeAction() {
            var _this = _super.call(this) || this;
            _this.setInteractionType(exports.InteractionType.DO);
            return _this;
        }
        MultiTimeAction.prototype.trigger = function () {
            if (this.UsagesLeft <= this.MaximumUsages) {
                var responseString = this.Responses[this.UsagesLeft];
                this.UsagesLeft++;
                return responseString;
            }
            return this.getResponse();
        };
        MultiTimeAction.prototype.reset = function () {
            this.UsagesLeft = 0;
        };
        MultiTimeAction.prototype.getUsagesLeft = function () {
            return this.UsagesLeft;
        };
        MultiTimeAction.prototype.setUsagesLeft = function (usages) {
            this.UsagesLeft = usages;
        };
        MultiTimeAction.prototype.getMaximumUsages = function () {
            return this.MaximumUsages;
        };
        MultiTimeAction.prototype.setMaximumUsages = function (usages) {
            this.MaximumUsages = usages;
        };
        MultiTimeAction.prototype.getResponses = function () {
            return this.Responses;
        };
        MultiTimeAction.prototype.setResponses = function (responses) {
            this.Responses = responses;
        };
        return MultiTimeAction;
    }(Action));

    var MultiTimeActionBuilder = /** @class */ (function (_super) {
        __extends(MultiTimeActionBuilder, _super);
        function MultiTimeActionBuilder(builder) {
            return _super.call(this, builder, new MultiTimeAction()) || this;
        }
        MultiTimeActionBuilder.prototype.setUsagesLeft = function (count) {
            if (count === undefined || count <= 0) {
                throw new EvalError('UsagesLeft Value has to be greater than 0.');
            }
            if (this.Action.getMaximumUsages() && this.Action.getMaximumUsages() < count) {
                throw new EvalError('UsagesLeft Value has to be less than or equal to MaximumUsages Value.');
            }
            this.Action.setUsagesLeft(count);
            return this;
        };
        MultiTimeActionBuilder.prototype.setInteractionType = function (type) {
            if (!type || !Object.values(exports.InteractionType).includes(type)) {
                throw new EvalError('InteractionType not set.');
            }
            this.Action.setInteractionType(type);
            return this;
        };
        MultiTimeActionBuilder.prototype.setMaximumUsages = function (count) {
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
        };
        MultiTimeActionBuilder.prototype.setResponses = function (responses) {
            if (!responses) {
                throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
            }
            if (responses.length === 0) {
                throw new EvalError('Responses Array may not be empty.');
            }
            this.Action.setResponses(responses);
            return this;
        };
        MultiTimeActionBuilder.prototype.onFinish = function () {
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
        };
        return MultiTimeActionBuilder;
    }(BaseActionBuilder));

    /**
     * RandomResponseAction allows the use of multiple Responses.
     * Each time this Action is triggered, the response will be selected randomly out of the passed array.
     */
    var RandomResponseAction = /** @class */ (function (_super) {
        __extends(RandomResponseAction, _super);
        function RandomResponseAction() {
            var _this = _super.call(this) || this;
            // set normal response to avoid errors during build
            _this.setResponse(' ');
            _this.setInteractionType(exports.InteractionType.DO);
            return _this;
        }
        RandomResponseAction.prototype.trigger = function () {
            var rndm = Math.floor(Math.random() * this.Responses.length);
            return this.Responses[rndm];
        };
        RandomResponseAction.prototype.reset = function () {
        };
        RandomResponseAction.prototype.getResponses = function () {
            return this.Responses;
        };
        RandomResponseAction.prototype.setResponses = function (responses) {
            this.Responses = responses;
        };
        return RandomResponseAction;
    }(Action));

    var RandomResponseActionBuilder = /** @class */ (function (_super) {
        __extends(RandomResponseActionBuilder, _super);
        function RandomResponseActionBuilder(builder) {
            return _super.call(this, builder, new RandomResponseAction()) || this;
        }
        RandomResponseActionBuilder.prototype.setResponses = function (responses) {
            if (!responses) {
                throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
            }
            if (responses.length === 0) {
                throw new EvalError('Responses Array may not be empty.');
            }
            this.Action.setResponses(responses);
            return this;
        };
        RandomResponseActionBuilder.prototype.setInteractionType = function (type) {
            if (!type || !Object.values(exports.InteractionType).includes(type)) {
                throw new EvalError('InteractionType not set.');
            }
            this.Action.setInteractionType(type);
            return this;
        };
        RandomResponseActionBuilder.prototype.onFinish = function () {
            if (!this.Action.getResponses()) {
                throw new BuilderError('Action creation could not be finished. Responses Array was not set.');
            }
            if (!this.Action.getInteractionType()) {
                throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
            }
        };
        return RandomResponseActionBuilder;
    }(BaseActionBuilder));

    var OneTimeActionBuilder = /** @class */ (function (_super) {
        __extends(OneTimeActionBuilder, _super);
        function OneTimeActionBuilder(builder) {
            return _super.call(this, builder, new OneTimeAction()) || this;
        }
        OneTimeActionBuilder.prototype.setWasTrigered = function (wasTriggered) {
            if (wasTriggered === undefined || wasTriggered === null) {
                throw new EvalError('WasTriggered was not set.');
            }
            this.Action.setWasTriggered(wasTriggered);
            return this;
        };
        OneTimeActionBuilder.prototype.setResponseAfterUse = function (response) {
            if (!response || response === '') {
                throw new EvalError('No Response found.');
            }
            this.Action.setResponseAfterUse(response);
            return this;
        };
        OneTimeActionBuilder.prototype.setInteractionType = function (type) {
            if (!type || !Object.values(exports.InteractionType).includes(type)) {
                throw new EvalError('InteractionType not set.');
            }
            this.Action.setInteractionType(type);
            return this;
        };
        OneTimeActionBuilder.prototype.onFinish = function () {
            if (!this.Action.getResponseAfterUse()) {
                throw new BuilderError('Action creation could not be finished. ResponseAfterUse was not set.');
            }
            if (!this.Action.getInteractionType()) {
                throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
            }
        };
        return OneTimeActionBuilder;
    }(BaseActionBuilder));

    var SceneBuilder = /** @class */ (function (_super) {
        __extends(SceneBuilder, _super);
        function SceneBuilder(gameBuilder, game, sceneId) {
            if (sceneId === void 0) { sceneId = null; }
            var _this = _super.call(this) || this;
            _this.GameBuilder = gameBuilder;
            _this.Game = game;
            _this.Scene = new Scene(sceneId);
            return _this;
        }
        SceneBuilder.prototype.addActionToBuilder = function (action) {
            this.Scene.getActions().push(action);
            if (action instanceof ItemYieldingAction) {
                this.GameBuilder.IdGeneratorService.addActionItemId(action);
            }
        };
        SceneBuilder.prototype.addAction = function (action) {
            return new BaseActionBuilder(this, action);
        };
        SceneBuilder.prototype.addGatewayAction = function () {
            return new GatewayActionBuilder(this);
        };
        SceneBuilder.prototype.addItemConsumingAction = function () {
            return new ItemConsumingActionBuilder(this);
        };
        SceneBuilder.prototype.addItemRemovingAction = function () {
            return new ItemRemovingActionBuilder(this);
        };
        SceneBuilder.prototype.addItemYieldingAction = function () {
            return new ItemYieldingActionBuilder(this);
        };
        SceneBuilder.prototype.addMultiTimeAction = function (id) {
            return new MultiTimeActionBuilder(this);
        };
        SceneBuilder.prototype.addOneTimeAction = function () {
            return new OneTimeActionBuilder(this);
        };
        SceneBuilder.prototype.addRandomResponseAction = function () {
            return new RandomResponseActionBuilder(this);
        };
        SceneBuilder.prototype.addItemToBuilder = function (item) {
            this.Scene.getItems().push(item);
            if (item.getID()) {
                this.GameBuilder.IdGeneratorService.addItemId(item);
            }
        };
        SceneBuilder.prototype.addItem = function (item) {
            return new ItemBuilder(this, item);
        };
        SceneBuilder.prototype.setName = function (name) {
            if (!name) {
                throw new EvalError('Name was not set.');
            }
            this.Scene.setName(name);
            return this;
        };
        SceneBuilder.prototype.setDescription = function (description) {
            if (!description) {
                throw new EvalError('Description was not set.');
            }
            this.Scene.setDescription(description);
            return this;
        };
        SceneBuilder.prototype.setActionNotRecognizedResponse = function (response) {
            if (!response) {
                throw new EvalError('ActionNotRecognizedResponse was not set.');
            }
            this.Scene.setActionNotRecognizedResponse(response);
            return this;
        };
        SceneBuilder.prototype.setItemNotFoundResponse = function (response) {
            if (!response) {
                throw new EvalError('ItemNotFoundResponse was not set.');
            }
            this.Scene.setItemNotFoundResponse(response);
            return this;
        };
        SceneBuilder.prototype.setInvalidInputResponse = function (response) {
            if (!response) {
                throw new EvalError('InvalidInputResponse was not set.');
            }
            this.Scene.setInvalidInputResponse(response);
            return this;
        };
        SceneBuilder.prototype.finish = function () {
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
        };
        return SceneBuilder;
    }(BaseBuilder));

    /**
     * Assigns IDs to Objects by counting the amount of distinct types
     */
    var IDGeneratorService = /** @class */ (function () {
        function IDGeneratorService() {
            this.typeArray = [];
        }
        IDGeneratorService.prototype.generateIDs = function (game) {
            this.processScenes(game.getStage().getScenes());
            this.typeArray = [];
        };
        IDGeneratorService.prototype.processScenes = function (scenes) {
            var _this = this;
            scenes.forEach(function (element) {
                if (!element.getID()) {
                    element.setID(_this.getIdFromTypeName(element.constructor.name));
                }
                else {
                    _this.setUsedIdForTypeName(element.constructor.name, element.getID());
                }
                _this.processActions(element.getActions());
                _this.processItems(element.getItems());
            });
        };
        IDGeneratorService.prototype.processActions = function (actions) {
            var _this = this;
            actions.forEach(function (element) {
                if ((element instanceof ItemYieldingAction)
                    && !element.getItem().getID()) {
                    element.getItem().setID(_this.getIdFromTypeName(element.constructor.name));
                }
            });
        };
        IDGeneratorService.prototype.processItems = function (items) {
            var _this = this;
            items.forEach(function (element) {
                if (!element.getID()) {
                    element.setID(_this.getIdFromTypeName(element.constructor.name));
                }
                else {
                    _this.setUsedIdForTypeName(element.constructor.name, element.getID());
                }
            });
        };
        IDGeneratorService.prototype.getIdFromTypeName = function (name) {
            var index = this.typeArray.findIndex(function (element) {
                return element.Name === name;
            });
            if (index !== -1) {
                return this.typeArray[index].getAndIncrementCount();
            }
            return this.createTypeCountContainer(name).getAndIncrementCount();
        };
        IDGeneratorService.prototype.addItemId = function (item) {
            this.setUsedIdForTypeName(item.constructor.name, item.getID());
        };
        IDGeneratorService.prototype.addSceneId = function (scene) {
            this.setUsedIdForTypeName(scene.constructor.name, scene.getID());
        };
        IDGeneratorService.prototype.addActionItemId = function (action) {
            this.setUsedIdForTypeName(action.getItem().constructor.name, action.getItem().getID());
        };
        /**
         * Add the passed id to the corresponding typeNameContainer's usedID Array
         */
        IDGeneratorService.prototype.setUsedIdForTypeName = function (name, id) {
            var index = this.typeArray.findIndex(function (element) {
                return element.Name === name;
            });
            if (index !== -1) {
                this.typeArray[index].addUsedID(id);
                return;
            }
            this.createTypeCountContainer(name).addUsedID(id);
        };
        IDGeneratorService.prototype.createTypeCountContainer = function (name) {
            var container = new TypeCountContainer(name);
            this.typeArray.push(container);
            return container;
        };
        IDGeneratorService.prototype.getTypeCountContainers = function () {
            return this.typeArray;
        };
        return IDGeneratorService;
    }());
    IDGeneratorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IDGeneratorService_Factory() { return new IDGeneratorService(); }, token: IDGeneratorService, providedIn: "root" });
    IDGeneratorService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    IDGeneratorService.ctorParameters = function () { return []; };
    var TypeCountContainer = /** @class */ (function () {
        function TypeCountContainer(name) {
            this.Name = name;
            this.Count = 0;
            this.UsedIDs = [];
        }
        TypeCountContainer.prototype.getAndIncrementCount = function () {
            this.Count++;
            while (this.isCurrentCountUsed()) {
                this.Count++;
            }
            this.addUsedID(this.Count);
            return this.Count;
        };
        TypeCountContainer.prototype.addUsedID = function (usedId) {
            if (this.isIdUsed(usedId)) {
                throw new EvalError('Id is already being used.');
            }
            this.UsedIDs.push(usedId);
        };
        TypeCountContainer.prototype.isCurrentCountUsed = function () {
            var _this = this;
            return this.UsedIDs.filter(function (element) { return element === _this.Count; }).length > 0;
        };
        TypeCountContainer.prototype.isIdUsed = function (id) {
            return !(!this.UsedIDs.find(function (element) { return element === id; }));
        };
        return TypeCountContainer;
    }());

    var CommandBuilder = /** @class */ (function (_super) {
        __extends(CommandBuilder, _super);
        function CommandBuilder(builder, command) {
            if (command === void 0) { command = new Command(); }
            var _this = _super.call(this) || this;
            _this.Command = command;
            _this.Builder = builder;
            return _this;
        }
        CommandBuilder.prototype.setTrigger = function (trigger) {
            if (!trigger) {
                throw new EvalError('Trigger was undefined.');
            }
            this.Command.setTrigger(trigger);
            return this;
        };
        CommandBuilder.prototype.setResponse = function (response) {
            if (!response) {
                throw new EvalError('Response was undefined.');
            }
            this.Command.setResponse(response);
            return this;
        };
        CommandBuilder.prototype.setResponseFunction = function (respFunc) {
            if (!respFunc) {
                throw new EvalError('ResponseFunction was undefined.');
            }
            this.Command.setResponseFunction(respFunc);
            return this;
        };
        CommandBuilder.prototype.setUseTypeWritingAnimation = function (use) {
            if (use === undefined || use === null) {
                throw new EvalError('UseTypeWritingAnimation was undefined.');
            }
            this.Command.setUseTypeWritingAnimation(use);
            return this;
        };
        CommandBuilder.prototype.setDescription = function (descr) {
            if (!descr) {
                throw new EvalError('Description was undefined');
            }
            this.Command.setDescription(descr);
            return this;
        };
        CommandBuilder.prototype.finish = function () {
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
        };
        return CommandBuilder;
    }(BaseBuilder));

    /**
     * Use this class to chain the game building process.
     * Once your Game is build completely, call the 'build' method.
     */
    var GameBuilder = /** @class */ (function (_super) {
        __extends(GameBuilder, _super);
        function GameBuilder() {
            var _this = _super.call(this) || this;
            _this.Game = new Game();
            _this.IdGeneratorService = new IDGeneratorService();
            return _this;
        }
        GameBuilder.prototype.addInventory = function () {
            return new InventoryBuilder(this, this.Game);
        };
        GameBuilder.prototype.addScene = function (id) {
            return new SceneBuilder(this, this.Game, id);
        };
        GameBuilder.prototype.addCommand = function () {
            return new CommandBuilder(this);
        };
        GameBuilder.prototype.addCommandToBuilder = function (command) {
            if (!command) {
                throw new BuilderError('Command was undefined');
            }
            this.Game.getCommands().push(command);
            return this;
        };
        GameBuilder.prototype.removeExistingCommands = function () {
            this.Game.setCommands([]);
            return this;
        };
        GameBuilder.prototype.setTitle = function (title) {
            if (!title) {
                throw new EvalError('Title was undefined.');
            }
            this.Game.setTitle(title);
            return this;
        };
        GameBuilder.prototype.setIntroduction = function (intro) {
            if (!intro) {
                throw new EvalError('Introduction was undefined.');
            }
            this.Game.setIntroduction(intro);
            return this;
        };
        GameBuilder.prototype.setItemNotFoundInInventoryResponse = function (response) {
            if (!response) {
                throw new EvalError('ItemNotFoundInInventoryResponse was undefined.');
            }
            this.Game.setItemNotFoundInInventoryResponse(response);
            return this;
        };
        GameBuilder.prototype.setItemAddedToInventoryResponse = function (response) {
            if (!response) {
                throw new EvalError('ItemAddedToInventoryResponse was undefined.');
            }
            this.Game.setItemAddedToInventoryResponse(response);
            return this;
        };
        GameBuilder.prototype.setGatewayTargetNotFoundResponse = function (response) {
            if (!response) {
                throw new EvalError('GatewayTargetNotFoundResponse was undefined.');
            }
            this.Game.setGatewayTargetNotFoundResponse(response);
            return this;
        };
        GameBuilder.prototype.setInventoryEmptyResponse = function (response) {
            if (!response) {
                throw new EvalError('InventoryEmptyResponse was undefined.');
            }
            this.Game.setInventoryEmptyResponse(response);
            return this;
        };
        GameBuilder.prototype.finish = function () {
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
        };
        GameBuilder.prototype.generateUnassignedIds = function () {
            this.IdGeneratorService.generateIDs(this.Game);
        };
        return GameBuilder;
    }(BaseBuilder));

    /**
     * This class represents an Item in the game.
     */
    var InGameItem$1 = /** @class */ (function () {
        function InGameItem(id) {
            this.ID = id;
            this.CanPickUp = true;
        }
        InGameItem.prototype.CanUseFunction = function (item, currentScene, inventory) {
            return true;
        };
        InGameItem.prototype.use = function () {
            if (this.UsagesLeft >= 1) {
                this.UsagesLeft--;
                return this.ItemUsedResponse;
            }
            return this.NoUsagesLeftResponse;
        };
        InGameItem.prototype.resetUsages = function () {
            this.UsagesLeft = this.MaximumUsages;
        };
        InGameItem.prototype.setID = function (id) {
            this.ID = id;
        };
        InGameItem.prototype.getID = function () {
            return this.ID;
        };
        InGameItem.prototype.setName = function (name) {
            this.Name = name;
        };
        InGameItem.prototype.getName = function () {
            return this.Name;
        };
        InGameItem.prototype.setDescription = function (desc) {
            this.Description = desc;
        };
        InGameItem.prototype.getDescription = function () {
            return this.Description;
        };
        InGameItem.prototype.setMaximumUsages = function (usages) {
            this.MaximumUsages = usages;
        };
        InGameItem.prototype.getMaximumUsages = function () {
            return this.MaximumUsages;
        };
        InGameItem.prototype.setUsagesLeft = function (usages) {
            this.UsagesLeft = usages;
        };
        InGameItem.prototype.getUsagesLeft = function () {
            return this.UsagesLeft;
        };
        InGameItem.prototype.setItemUsedResponse = function (response) {
            this.ItemUsedResponse = response;
        };
        InGameItem.prototype.getItemUsedResponse = function () {
            return this.ItemUsedResponse;
        };
        InGameItem.prototype.setNoUsagesLeftResponse = function (response) {
            this.NoUsagesLeftResponse = response;
        };
        InGameItem.prototype.getNoUsagesLeftResponse = function () {
            return this.NoUsagesLeftResponse;
        };
        InGameItem.prototype.getCanPickUp = function () {
            return this.CanPickUp;
        };
        InGameItem.prototype.setCanPickUp = function (value) {
            this.CanPickUp = value;
        };
        InGameItem.prototype.setCannotPickUpResponse = function (response) {
            this.CannotPickUpResponse = response;
        };
        InGameItem.prototype.getCannotPickUpResponse = function () {
            return this.CannotPickUpResponse;
        };
        InGameItem.prototype.getInSceneDescription = function () {
            return this.InSceneDescription;
        };
        InGameItem.prototype.setInSceneDescription = function (descr) {
            this.InSceneDescription = descr;
        };
        InGameItem.prototype.setCanUseFunction = function (func) {
            this.CanUseFunction = func;
        };
        InGameItem.prototype.setCannotUseItemResponse = function (response) {
            this.CannotUseItemResponse = response;
        };
        InGameItem.prototype.getCannotUseItemResponse = function () {
            return this.CannotUseItemResponse;
        };
        InGameItem.prototype.getCanUseFunction = function () {
            return this.CanUseFunction;
        };
        return InGameItem;
    }());

    var TextInputType;
    (function (TextInputType) {
        TextInputType["UserInput"] = "input";
        TextInputType["Output"] = "output";
    })(TextInputType || (TextInputType = {}));

    var TextInput = /** @class */ (function () {
        function TextInput(Value, Type) {
            this.Value = Value;
            this.Type = Type;
        }
        return TextInput;
    }());

    var ParseInputResult = /** @class */ (function () {
        function ParseInputResult(result, typewriteAnimation, isEndGameResult) {
            if (typewriteAnimation === void 0) { typewriteAnimation = true; }
            if (isEndGameResult === void 0) { isEndGameResult = false; }
            this.Result = result;
            this.UseTypewriterAnimation = typewriteAnimation;
            this.IsEndGameResult = isEndGameResult;
        }
        return ParseInputResult;
    }());

    var language = 'EN';
    // see Penn Treebank Part-of-Speech Tags for more info on the tags
    var defaultCategory = 'N';
    var defaultCategoryCapitalized = 'NNP';
    var nounCategories = ['N', 'NN', 'NNS', 'NNP', 'NNPS'];
    var verbCategories = ['VB', 'VBD', 'VBG', 'VBN', 'VBO', 'VBZ'];
    /**
     * Helps to parse text input and call the corresponding action, returning a response
     */
    var InputParserService = /** @class */ (function () {
        function InputParserService() {
        }
        InputParserService.prototype.initialize = function (trainer) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.Tokenizer = new natural.WordTokenizer();
                var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
                var ruleSet = new natural.RuleSet('EN');
                _this.POSTagger = new natural.BrillPOSTagger(lexicon, ruleSet);
                _this.Classifier = new natural.BayesClassifier();
                trainer.trainClassifier(_this.Classifier).then(function () { return resolve(true); });
            });
        };
        InputParserService.prototype.setGame = function (game) {
            this.Game = game;
        };
        InputParserService.prototype.parseInput = function (input) {
            var commandsResult = this.getCommandsResponse(input);
            if (commandsResult) {
                return commandsResult;
            }
            // because imperatives are not so common in the brown/penn corpus, we add a 'they ' before
            // the whole sentence, in order to make it a legitimate sentence and identify imperatives as verbs instead of nouns
            input = 'they ' + input;
            var taggedTokens = this.POSTagger.tag(this.Tokenizer.tokenize(input)).taggedWords;
            // we get verbs and nouns, because in many cases a noun may be mistaken to be a verb and vice versa e.g. (a) stick & (to) stick
            var nounsAndVerbs = this.getNounsAndVerbsFromTokenizedInput(taggedTokens);
            var interactionType = this.getInteractionType(input);
            // no interaction type found
            if (interactionType === undefined || interactionType === null) {
                return new ParseInputResult(this.Game.getInvalidInputResponse());
            }
            switch (interactionType) {
                case exports.InteractionType.GO_TO:
                    // scenes/gateway actions
                    return this.getGoToResponse(nounsAndVerbs);
                case exports.InteractionType.LOOK_AT:
                    // item description
                    return this.getLookAtResponse(nounsAndVerbs);
                case exports.InteractionType.PICK_UP:
                    // add item to inventory
                    return this.getPickUpResponse(nounsAndVerbs);
                case exports.InteractionType.USE:
                    // use item in inventory or in scene
                    return this.getUseResponse(nounsAndVerbs);
                default:
                    // do something
                    return this.getDoResponse(nounsAndVerbs);
            }
        };
        InputParserService.prototype.getCommandsResponse = function (input) {
            var lowerCaseInput = input.toLocaleLowerCase();
            var commandsResult;
            this.Game.getCommands().some(function (command) {
                if (command.getTrigger().toLocaleLowerCase() === lowerCaseInput) {
                    commandsResult = new ParseInputResult(command.activate(), command.getUseTypeWritingAnimation());
                    return true;
                }
            });
            return commandsResult;
        };
        InputParserService.prototype.getGoToResponse = function (relevantWords) {
            var result = new ParseInputResult('');
            // get gateway actions
            var gatewayActions = this.Game.getActionsInScene().filter(function (val) {
                return val.getInteractionType() === exports.InteractionType.GO_TO;
            });
            if (!gatewayActions || gatewayActions.length <= 0) {
                result.Result = this.Game.getGatewayTargetNotFoundResponse();
                return result;
            }
            var actionDistances = this.getActionDistancesFromNouns(relevantWords, gatewayActions);
            if (!actionDistances || actionDistances.length <= 0) {
                result.Result = this.Game.getGatewayTargetNotFoundResponse();
                return result;
            }
            var action = actionDistances[0].Action;
            result.Result = action.trigger();
            result.IsEndGameResult = action.getIsEndGameAction();
            return result;
        };
        InputParserService.prototype.getLookAtResponse = function (relevantWords) {
            var result = new ParseInputResult('');
            var itemDistances = this.getItemDistancesFromNouns(relevantWords, this.Game.getItemsInScene(), this.Game.getItemsInInventory());
            if (!itemDistances || itemDistances.length <= 0) {
                result.Result = this.Game.getItemNotFoundResponse();
                return result;
            }
            result.Result = itemDistances[0].Item.getDescription();
            return result;
        };
        InputParserService.prototype.getPickUpResponse = function (relevantWords) {
            var result = new ParseInputResult('');
            var itemDistances = this.getItemDistancesFromNouns(relevantWords, this.Game.getItemsInScene(), undefined);
            if (!itemDistances || itemDistances.length <= 0) {
                result.Result = this.Game.getItemNotFoundResponse();
                return result;
            }
            var item = itemDistances[0].Item;
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
        };
        InputParserService.prototype.getUseResponse = function (relevantWords) {
            var result = new ParseInputResult('');
            var itemDistances = this.getItemDistancesFromNouns(relevantWords, this.Game.getItemsInScene(), this.Game.getItemsInInventory());
            if (!itemDistances || itemDistances.length <= 0) {
                result.Result = this.Game.getItemNotFoundResponse();
                return result;
            }
            var currentItem = itemDistances[0].Item;
            if (!currentItem.CanUseFunction(currentItem, this.Game.getStage().getCurrentScene(), this.Game.getInventory())) {
                result.Result = currentItem.getCannotUseItemResponse();
                return result;
            }
            result.Result = currentItem.use();
            // if the item was in the inventory and has no usages left anymore -> remove it from inventory
            if (currentItem.WasPickedUp && currentItem.getUsagesLeft() <= 0) {
                result.Result += "\r\n" + currentItem.getNoUsagesLeftResponse();
                this.Game.removeItemFromInventory(currentItem);
            }
            return result;
        };
        InputParserService.prototype.getDoResponse = function (relevantWords) {
            var result = new ParseInputResult('');
            var actions = this.Game.getActionsInScene().filter(function (val) {
                return val.getInteractionType() === exports.InteractionType.DO;
            });
            if (!actions || actions.length <= 0) {
                result.Result = this.Game.getActionNotRecognizedResponse();
                return result;
            }
            var actionDistances = this.getActionDistancesFromNouns(relevantWords, actions);
            if (!actionDistances || actionDistances.length <= 0) {
                result.Result = this.Game.getActionNotRecognizedResponse();
                return result;
            }
            var action = actionDistances[0].Action;
            result.Result = action.trigger();
            result.IsEndGameResult = action.getIsEndGameAction();
            return result;
        };
        InputParserService.prototype.getNounsAndVerbsFromTokenizedInput = function (taggedTokens) {
            return taggedTokens.reduce(function (result, token) {
                if (nounCategories.includes(token.tag) || verbCategories.includes(token.tag)) {
                    result.push(token.token);
                }
                return result;
            }, []);
        };
        InputParserService.prototype.getItemDistancesFromNouns = function (relevantWords, sceneItems, inventoryItems) {
            var _this = this;
            var itemDistances = [];
            var items = [];
            if (sceneItems) {
                items = items.concat(sceneItems);
            }
            if (inventoryItems) {
                items = items.concat(inventoryItems);
            }
            items.map(function (val) {
                var taggedName = _this.POSTagger.tag(_this.Tokenizer.tokenize(val.Name)).taggedWords;
                taggedName.map(function (name) {
                    relevantWords.map(function (input) {
                        var distance = natural.DamerauLevenshteinDistance(input, name.token, { transposition_cost: 0 });
                        if (distance <= 1) {
                            itemDistances.push(new ItemDistance(val, distance));
                        }
                    });
                });
            });
            return itemDistances.sort(function (val) { return val.Distance; });
        };
        InputParserService.prototype.getActionDistancesFromNouns = function (relevantWords, actions) {
            var _this = this;
            var actionDistances = [];
            actions.map(function (val) {
                var taggedTrigger = _this.POSTagger.tag(_this.Tokenizer.tokenize(val.getTrigger())).taggedWords;
                taggedTrigger.map(function (trigger) {
                    relevantWords.map(function (input) {
                        var distance = natural.DamerauLevenshteinDistance(input, trigger.token, { transposition_cost: 0 });
                        if (distance <= 1) {
                            actionDistances.push(new ActionDistance(val, distance));
                        }
                    });
                });
            });
            return actionDistances.sort(function (val) { return val.Distance; });
        };
        InputParserService.prototype.getInteractionType = function (input) {
            var result = this.Classifier.classify(input);
            return this.getInteractionTypeFromClassificationResult(result);
        };
        InputParserService.prototype.getInteractionTypeFromClassificationResult = function (result) {
            switch (result) {
                case 'use':
                    return exports.InteractionType.USE;
                case 'look_at':
                    return exports.InteractionType.LOOK_AT;
                case 'go_to':
                    return exports.InteractionType.GO_TO;
                case 'pick_up':
                    return exports.InteractionType.PICK_UP;
                case 'do':
                    return exports.InteractionType.DO;
                default:
                    return exports.InteractionType.DO;
            }
        };
        return InputParserService;
    }());
    InputParserService.ɵprov = i0.ɵɵdefineInjectable({ factory: function InputParserService_Factory() { return new InputParserService(); }, token: InputParserService, providedIn: "root" });
    InputParserService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    InputParserService.ctorParameters = function () { return []; };
    var ActionTag = /** @class */ (function () {
        function ActionTag(action, tag) {
            this.Action = action;
            this.Tag = tag;
        }
        return ActionTag;
    }());
    var ActionDistance = /** @class */ (function () {
        function ActionDistance(action, distance) {
            this.Action = action;
            this.Distance = distance;
        }
        return ActionDistance;
    }());
    var ItemDistance = /** @class */ (function () {
        function ItemDistance(item, distance) {
            this.Item = item;
            this.Distance = distance;
        }
        return ItemDistance;
    }());
    var ItemTag = /** @class */ (function () {
        function ItemTag(item, tag) {
            this.Item = item;
            this.Tag = tag;
        }
        return ItemTag;
    }());
    var TaggedToken = /** @class */ (function () {
        function TaggedToken() {
        }
        return TaggedToken;
    }());

    var ClassificationTrainer = /** @class */ (function () {
        function ClassificationTrainer() {
        }
        ClassificationTrainer.prototype.trainClassifier = function (classifier) {
            return new Promise(function (resolve) {
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
                classifier.events.on('trainedWithDocument', function () { return resolve(); });
                classifier.train();
                resolve();
            });
        };
        return ClassificationTrainer;
    }());
    ClassificationTrainer.ɵprov = i0.ɵɵdefineInjectable({ factory: function ClassificationTrainer_Factory() { return new ClassificationTrainer(); }, token: ClassificationTrainer, providedIn: "root" });
    ClassificationTrainer.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var GameResetEvent = /** @class */ (function () {
        function GameResetEvent(game) {
        }
        return GameResetEvent;
    }());

    var GameEndEvent = /** @class */ (function () {
        function GameEndEvent(game) {
        }
        return GameEndEvent;
    }());

    var GameStartEvent = /** @class */ (function () {
        function GameStartEvent() {
        }
        return GameStartEvent;
    }());

    /**
     * Main Component, that contains the input and output of the game.
     */
    var TextAdventureComponent = /** @class */ (function () {
        function TextAdventureComponent(inputParserService) {
            this.inputParserService = inputParserService;
            this.OutputArray = [];
            this.IsLoading = false;
            this.UseTypewritingAnimation = true;
            this.TypewriterSpeed = 40;
            this.OnGameStartEvent = new i0.EventEmitter();
            this.OnGameResetEvent = new i0.EventEmitter();
            this.OnGameEndEvent = new i0.EventEmitter();
            this.InputForm = new forms.FormGroup({
                userInput: new forms.FormControl({
                    value: '',
                    disabled: this.IsLoading
                }, [
                    forms.Validators.required
                ])
            });
            if (!this.ClassificationTrainer) {
                inputParserService.initialize(new ClassificationTrainer());
            }
            else {
                inputParserService.initialize(this.ClassificationTrainer);
            }
        }
        TextAdventureComponent.prototype.ngOnInit = function () {
            this.startLoading();
            if (!this.Game) {
                throw new GameError('Game not found.');
            }
            this.startGame();
        };
        TextAdventureComponent.prototype.OnSubmit = function () {
            var _this = this;
            this.startLoading();
            var inputString = this.userInput.value;
            if (!inputString) {
                this.stopLoading();
                return;
            }
            this.printInput(inputString);
            this.userInput.setValue('');
            var parseResult = this.inputParserService.parseInput(inputString);
            this.printOutput(parseResult.Result, parseResult.UseTypewriterAnimation).then(function () { return _this.stopLoading(); });
        };
        TextAdventureComponent.prototype.OnGameReset = function () {
            this.OnGameResetEvent.emit(new GameResetEvent(this.Game));
        };
        TextAdventureComponent.prototype.OnGameEnd = function () {
            this.OnGameEndEvent.emit(new GameEndEvent(this.Game));
        };
        Object.defineProperty(TextAdventureComponent.prototype, "userInput", {
            get: function () {
                return this.InputForm.get('userInput');
            },
            enumerable: false,
            configurable: true
        });
        TextAdventureComponent.prototype.startLoading = function () {
            this.IsLoading = true;
            this.userInput.disable();
        };
        TextAdventureComponent.prototype.stopLoading = function () {
            var _this = this;
            this.IsLoading = false;
            this.userInput.enable();
            setTimeout(function () {
                _this.inputElement.nativeElement.focus();
            });
        };
        TextAdventureComponent.prototype.startGame = function () {
            var _this = this;
            this.inputParserService.setGame(this.Game);
            this.OnGameStartEvent.emit(new GameStartEvent());
            this.printOutput(this.Game.getTitle()).then(function () { return _this.printOutput(_this.Game.getIntroduction()); }).then(function () { return _this.stopLoading(); });
        };
        TextAdventureComponent.prototype.printOutput = function (output, useTypewriteAnimationOnOutput) {
            var _this = this;
            if (useTypewriteAnimationOnOutput === void 0) { useTypewriteAnimationOnOutput = true; }
            return new Promise(function (outerResolve) {
                var e_1, _a;
                if (useTypewriteAnimationOnOutput && _this.UseTypewritingAnimation) {
                    var outputLines = output.split('\r\n');
                    // we create a promise chain, in order to avoid printing new lines written as '<br>'
                    var outputPromise = new Promise(function (resolve) { return resolve(); });
                    var _loop_1 = function (singleLine) {
                        outputPromise = outputPromise.then(function () { return _this.printLineAnimated(singleLine); });
                    };
                    try {
                        for (var outputLines_1 = __values(outputLines), outputLines_1_1 = outputLines_1.next(); !outputLines_1_1.done; outputLines_1_1 = outputLines_1.next()) {
                            var singleLine = outputLines_1_1.value;
                            _loop_1(singleLine);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (outputLines_1_1 && !outputLines_1_1.done && (_a = outputLines_1.return)) _a.call(outputLines_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    outputPromise = outputPromise.then(outerResolve);
                }
                else {
                    output = output.split('\r\n').join('<br>');
                    _this.OutputArray.push(new TextInput(output, TextInputType.Output));
                    outerResolve();
                }
            });
        };
        TextAdventureComponent.prototype.printLineAnimated = function (line) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.OutputArray.push(new TextInput('', TextInputType.Output));
                // exit the recursion with the "resolve" function of the promise
                _this.typewriteOutput(0, line, _this.OutputArray, resolve);
            });
        };
        TextAdventureComponent.prototype.typewriteOutput = function (i, output, outputArray, resolveFunction) {
            var _this = this;
            if (i >= output.length) {
                resolveFunction();
            }
            var char = output.charAt(i);
            outputArray[outputArray.length - 1].Value += char;
            i++;
            setTimeout(function () {
                _this.typewriteOutput(i, output, _this.OutputArray, resolveFunction);
            }, this.TypewriterSpeed);
        };
        TextAdventureComponent.prototype.printInput = function (input) {
            this.OutputArray.push(new TextInput(input, TextInputType.UserInput));
        };
        return TextAdventureComponent;
    }());
    TextAdventureComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tas-text-adventure',
                    template: "<div class=\"container-fluid text-adventure-root h-100 w-100\">\r\n  <div class=\"row output-container-wrapper\">\r\n    <div class=\"output-container\">\r\n      <table>\r\n        <tbody>\r\n          <tr *ngFor=\"let line of OutputArray; let index = i\"\r\n            [ngClass]=\"line.Type  === 'input'? 'input-line' : 'output-line'\">\r\n            <td [innerHTML]='line.Value'></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div class=\"row input-container-wrapper\">\r\n    <div class=\"row input-container\">\r\n      <form [formGroup]=\"InputForm\" (ngSubmit)=\"OnSubmit()\">\r\n        <div class=\"form-group\">\r\n          <input type=\"text\" class=\"form-control\" #input formControlName=\"userInput\" autofocus>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [".text-adventure-root{background:#222;color:#ddd;font-family:Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace;height:100%;margin:0}.text-adventure-root .row{margin:0}.text-adventure-root .output-container-wrapper{display:flex;flex-direction:column-reverse;height:95%;overflow:hidden;padding:8px}.text-adventure-root .output-container-wrapper .output-container{display:flex;text-overflow:ellipsis}.text-adventure-root .output-container-wrapper .output-container .input-line{font-style:italic}.text-adventure-root .input-container-wrapper .input-container form .form-group input{background-color:#222;border-radius:0;border-top:1px solid #ddd;border-width:0;box-sizing:border-box;color:#ddd;padding:8px;width:100%}"]
                },] }
    ];
    TextAdventureComponent.ctorParameters = function () { return [
        { type: InputParserService }
    ]; };
    TextAdventureComponent.propDecorators = {
        inputElement: [{ type: i0.ViewChild, args: ['input', { static: true },] }],
        UseTypewritingAnimation: [{ type: i0.Input }],
        TypewriterSpeed: [{ type: i0.Input }],
        Game: [{ type: i0.Input }],
        ClassificationTrainer: [{ type: i0.Input }],
        OnGameStartEvent: [{ type: i0.Output }],
        OnGameResetEvent: [{ type: i0.Output }],
        OnGameEndEvent: [{ type: i0.Output }]
    };

    var TextAdventureModule = /** @class */ (function () {
        function TextAdventureModule() {
        }
        return TextAdventureModule;
    }());
    TextAdventureModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        forms.ReactiveFormsModule,
                        common.CommonModule
                    ],
                    declarations: [
                        TextAdventureComponent
                    ],
                    exports: [
                        TextAdventureComponent
                    ],
                },] }
    ];

    /*
     * Public API Surface of text-adventure-sama
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Command = Command;
    exports.CommandBuilder = CommandBuilder;
    exports.Game = Game;
    exports.GameBuilder = GameBuilder;
    exports.InGameItem = InGameItem$1;
    exports.Inventory = Inventory;
    exports.InventoryBuilder = InventoryBuilder;
    exports.ItemBuilder = ItemBuilder;
    exports.Scene = Scene;
    exports.SceneBuilder = SceneBuilder;
    exports.Stage = Stage;
    exports.TextAdventureComponent = TextAdventureComponent;
    exports.TextAdventureModule = TextAdventureModule;
    exports.ɵa = BaseBuilder;
    exports.ɵb = InGameItem;
    exports.ɵc = InputParserService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=text-adventure-sama.umd.js.map
