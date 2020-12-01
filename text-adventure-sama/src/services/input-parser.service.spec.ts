import { TestBed } from '@angular/core/testing';
import { Action } from 'src/models/actions/action.model';
import { GatewayAction } from 'src/models/actions/gateway-action.model';
import { OneTimeAction } from 'src/models/actions/one-time-action.model';
import { Game } from 'src/models/game.model';
import { InteractionType } from 'src/models/interactions/interaction-type.enum';
import { InGameItem } from 'src/models/item.model';
import { ParseInputResult } from 'src/models/other/parse-input-result.model';
import { Scene } from 'src/models/scene.model';
import { ClassificationTrainer } from '../classification/classification-trainer.service';
import { InputParserService } from './input-parser.service';

describe('InputParserService', () => {
  let service: InputParserServiceChild;
  let game: Game;
  let scene: Scene;

  let gatewayAction: GatewayAction;
  let oneTimeActionDoOpen: OneTimeAction;
  let oneTimeActionDoClose: OneTimeAction;
  let oneTimeActionUseKey: OneTimeAction;

  let doorItem: InGameItem;
  let stoneItem: InGameItem;

  beforeEach((done) => {
    service = new InputParserServiceChild();

    game = new Game();
    game.setTitle('title');
    game.setIntroduction('intro');
    game.setGatewayTargetNotFoundResponse('gateway not found');
    game.setInventoryEmptyResponse('inventory empty');
    game.setItemAddedToInventoryResponse('item added to inventory');
    game.setItemNotFoundInInventoryResponse('item not found in inventory');

    scene = new Scene();
    scene.setName('sceneName');
    scene.setItemNotFoundResponse('item not found.');
    scene.setActionNotRecognizedResponse('action not recognized response');
    scene.setInvalidInputResponse('invalid input');
    scene.setDescription('description of the scene');

    oneTimeActionDoOpen = new OneTimeAction();
    oneTimeActionDoOpen.setTrigger('open door');
    oneTimeActionDoOpen.setAlternativeTriggers(['unlock gate', 'unbarr exit', 'open entryway']);
    oneTimeActionDoOpen.setResponse('response onetime action1');
    oneTimeActionDoOpen.setResponseAfterUse('you did that already');
    oneTimeActionDoOpen.setWasTriggered(false);
    scene.getActions().push(oneTimeActionDoOpen);

    oneTimeActionDoClose = new OneTimeAction();
    oneTimeActionDoClose.setTrigger('close door');
    oneTimeActionDoClose.setAlternativeTriggers(['shut door', 'lock gate', 'slam exit', 'bolt entryway']);
    oneTimeActionDoClose.setIsEndGameAction(true);
    oneTimeActionDoClose.setResponse('response onetime action2');
    scene.getActions().push(oneTimeActionDoClose);

    oneTimeActionUseKey = new OneTimeAction();
    oneTimeActionUseKey.setResponse('Since the door was unlocked, you just put it in the lock, locked the door and unlocked it again.');
    oneTimeActionUseKey.setResponseAfterUse('You did that already.');
    oneTimeActionUseKey.setTrigger('key');
    oneTimeActionUseKey.setInteractionType(InteractionType.USE);
    scene.getActions().push(oneTimeActionUseKey);

    gatewayAction = new GatewayAction();
    gatewayAction.setTrigger('house');
    gatewayAction.setAlternativeTriggers(['home', 'shed', 'building']);
    gatewayAction.setResponse('going to the house');
    gatewayAction.setTargetSceneId(2);
    scene.getActions().push(gatewayAction);

    doorItem = new InGameItem();
    doorItem.setName('door');
    doorItem.setNoUsagesLeftResponse('Can\'t use it anymore.');
    doorItem.setDescription('Just a simple door.');
    doorItem.setInSceneDescription('The door is made out of wood and looks like it\'s not locked.');
    doorItem.setCanPickUp(false);
    scene.getItems().push(doorItem);

    stoneItem = new InGameItem();
    stoneItem.setName('stone');
    stoneItem.setNoUsagesLeftResponse('You can\'t use the stone anymore. It\'s broken now.');
    stoneItem.setDescription('An unnatural looking stone.');
    stoneItem.setInSceneDescription('Just infront of the door lays a stone. It\'s shape seems very unnatural to you.');
    stoneItem.setCanPickUp(true);
    scene.getItems().push(stoneItem);

    game.getStage().addScene(scene);

    service.setGame(game);
    service.initialize(new ClassificationTrainer()).then(() => {
      done();
    });

  });

  afterEach(() => {
    game.getStage().unsubscribe();
    game.getInventory().unsubscribe();
    service.getGame().getStage().unsubscribe();
    service.getGame().getInventory().unsubscribe();
  });

  // Initialize and ClassificationTrainer Test
  it('#initialize should initialize successfully', (done) => {
    const serviceChild = new InputParserServiceChild();
    serviceChild.setGame(game);
    serviceChild.initialize(new ClassificationTrainer()).then(result => {
      expect(result).toBeTrue();
      done();
    });
  });

  // getLikelyAction
  it('#getLikelyAction should return no action with trigger not matching input', () => {
    const input = 'something else';

    const result = service.getLikelyActionPublic(input, scene.getActions());
    expect(result).toBeUndefined();
  });

  it('#getLikelyAction should return the action with trigger nearly matching the input (1 char difference)', () => {
    const input = 'opesn door';

    const result = service.getLikelyActionPublic(input, scene.getActions());
    expect(result).toBeDefined();
    expect(result).toEqual(oneTimeActionDoOpen);
  });

  // getLikelyItem
  it('#getLikelyItem should return no action with trigger not matching input', () => {
    const input = 'look at window';

    const result = service.getLikelyItemPublic(input, scene.getItems());
    expect(result).toBeUndefined();
  });

  it('#getLikelyItem should return the action with trigger nearly matching the input (1 char difference)', () => {
    const input = 'look at dooe';

    const result = service.getLikelyItemPublic(input, scene.getItems());
    expect(result).toBeDefined();
    expect(result).toEqual(doorItem);
  });

  // parseInput - Look At
  it('#parseInput to return the item description of an item with a spelling mistake (1 char difference)', () => {
    const input = 'looke ata dooe';

    const result = service.parseInput(input);

    expect(result.Result).toBe(doorItem.getDescription());
    expect(result.IsEndGameResult).toBe(false);
  });

  it('#parseInput to return the item description of an item without a spelling mistake', () => {
    const input = 'look at door';

    const result = service.parseInput(input);

    expect(result.Result).toBe(doorItem.getDescription());
    expect(result.IsEndGameResult).toBe(false);
  });

  it('#parseInput to return the ItemNotFoundResponse when no matching item was found', () => {
    const input = 'look at window';

    const result = service.parseInput(input);

    expect(result.Result).toBe(scene.getItemNotFoundResponse());
    expect(result.IsEndGameResult).toBe(false);
  });

  // getCommandsResponse
  it('#getCommandsResponse should return the Help-Command response with all other commands drescribed in it', () => {
    const input = 'help';

    const result = service.getCommandsResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.UseTypewriterAnimation).toBeFalse();
    for (const command of game.getCommands()) {
      expect(result.Result).toContain(command.getTrigger());
      expect(result.Result).toContain(command.getDescription());
    }
  });

  it('#getCommandsResponse should return undefined when no input machtes any command', () => {
    const input = 'something';

    const result = service.getCommandsResponsePublic(input);

    expect(result).toBeUndefined();
  });

  it('#getCommandsResponse should return the Inventory-Command response containing the names of all items in the inventory', () => {
    const input = 'inventory';

    const item1 = new InGameItem();
    item1.setName('name');
    item1.setDescription('description');

    game.addItemToInventory(item1);

    const result = service.getCommandsResponsePublic(input);

    expect(result).toBeDefined();
    expect(result.IsEndGameResult).toBeFalse();
    expect(result.UseTypewriterAnimation).toBeFalse();
    for (const item of game.getInventory().getItems()) {
      expect(result.Result).toContain(item.getName());
    }
  });

  it('#getCommandsResponse should return the Look-Around-Command response to contain all items in the Scene', () => {
    const input = 'look around';

    const result = service.getCommandsResponsePublic(input);

    expect(result).toBeDefined();
    expect(result.IsEndGameResult).toBeFalse();
    expect(result.UseTypewriterAnimation).toBeTrue();
    for (const item of game.getStage().getCurrentScene().getItems()) {
      expect(result.Result).toContain(item.getInSceneDescription());
    }
  });

  //getGoToResponse
  it('#getGoToResponse should return GatewayAction response with only one gateway action in the scene', () => {
    const scene2 = new Scene(2);
    scene2.setName('scene2name');
    scene2.setDescription('scene2descripiton');

    game.getStage().addScene(scene2);

    const input = 'go to house';

    const result = service.getGoToResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(gatewayAction.getResponse());
  });

  it('#getGoToResponse should return desired GatewayAction response with a spelling mistake'
    + ' and with multiple gateway action in the scene', () => {
      const gatewayActionShop = new GatewayAction();
      gatewayActionShop.setTrigger('shop');
      gatewayActionShop.setAlternativeTriggers(['market', 'store']);
      gatewayActionShop.setResponse('going to the shop');
      gatewayActionShop.setTargetSceneId(2);
  
      const gatewayActionGarden = new GatewayAction();
      gatewayActionGarden.setTrigger('garden');
      gatewayActionGarden.setAlternativeTriggers(['lawn']);
      gatewayActionGarden.setResponse('going to the garden');
      gatewayActionGarden.setTargetSceneId(2);

      // add more gateway actions to the scene
      game.getStage().getCurrentScene().getActions().push(gatewayActionGarden);
      game.getStage().getCurrentScene().getActions().push(gatewayActionShop);

      const scene2 = new Scene(2);
      scene2.setName('scene2name');
      scene2.setDescription('scene2descripiton');
      game.getStage().addScene(scene2);

      const input = 'go to chouse';

      const result = service.getGoToResponsePublic(input);

      expect(result.IsEndGameResult).toBeFalse();
      expect(result.Result).toBe(gatewayAction.getResponse());
    });

  it('#getGoToResponse should return GatewayTargetNotFoundResponse when the input does not match any trigger', () => {
    const input = 'go to shop';

    const result = service.getGoToResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(game.getGatewayTargetNotFoundResponse());
  });

  //getLookAtResponse
  it('#getLookAtResponse should return Item Description when the input matches an items name', () => {
    const input = 'look at stone';

    const result = service.getLookAtResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(scene.getItems()[1].getDescription());
  });

  it('#getLookAtResponse should return Item Description when the input matches an items name with a spelling mistake', () => {
    const input = 'look at sctone';

    const result = service.getLookAtResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(scene.getItems()[1].getDescription());
  });

  it('#getLookAtResponse should return ItemNotFoundResponse when input doesn\'t match anything', () => {
    const input = 'look at insect';

    const result = service.getLookAtResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(scene.getItemNotFoundResponse());
  });

  //getDoResponse
  it('#getDoResponse should return action Response with matching input', () => {
    const input = 'open door';

    const result = service.getDoResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(scene.getActions()[0].getResponse());
  });

  it('#getDoResponse should return action Response with matching input with a spelling mistake', () => {
    const input = 'open doore';

    const result = service.getDoResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(scene.getActions()[0].getResponse());
  });

  it('#getDoResponse should return ActionNotRecognizedResponse when input does not matach anything', () => {
    const input = 'just dance';

    const result = service.getDoResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(scene.getActionNotRecognizedResponse());
  });

  //getUseResponse
  it('#getUseResponse should return item Response with matching input', () => {
    const input = 'use key';

    const result = service.getUseResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(oneTimeActionUseKey.getResponse());
  });

  it('#getUseResponse should return item Response with matching input with a spelling mistake', () => {
    const input = 'use krey';

    const result = service.getUseResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(oneTimeActionUseKey.getResponse());
  });

  it('#getUseResponse should return ItemNotFoundResposne when input does not match anything', () => {
    const input = 'use jelly';

    const result = service.getUseResponsePublic(input);

    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(game.getItemNotFoundResponse());
  });

  //getPickUpResponse
  it('#getPickUpResponse should return ItemAddedToInventoryResponse with matching input', () => {
    const input = 'pick up stone';

    const result = service.getPickUpResponsePublic(input);
    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(game.getItemAddedToInventoryResponse());
  });

  it('#getPickUpResponse should return ItemAddedToInventoryResponse with matching input and a spelling mistake', () => {
    const input = 'pick up sctone';

    const result = service.getPickUpResponsePublic(input);
    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(game.getItemAddedToInventoryResponse());
  });

  it('#getPickUpResponse should return ItemNotFoundResponse when input does not match anything', () => {
    const input = 'pick up slime';

    const result = service.getPickUpResponsePublic(input);
    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(game.getItemNotFoundResponse());
  });

  it('#getPickUpResponse should return CannotPickUpResponse with matching input when item can not be picked up', () => {
    stoneItem.setCanPickUp(false);
    stoneItem.setCannotPickUpResponse('that is not possible');

    
    const input = 'pick up stone';

    const result = service.getPickUpResponsePublic(input);
    expect(result.IsEndGameResult).toBeFalse();
    expect(result.Result).toBe(stoneItem.getCannotPickUpResponse());
  });


  // getInteractionTypeFromClassificationResult
  it('#getInteractionTypeFromClassificationResult should return InteractionType.USE from the input use', () => {
    const result = service.getInteractionTypeFromClassificationResult('use');
    expect(result).toBe(InteractionType.USE);
  });

  it('#getInteractionTypeFromClassificationResult should return InteractionType.LOOK_AT from the input look_at', () => {
    const result = service.getInteractionTypeFromClassificationResult('look_at');
    expect(result).toBe(InteractionType.LOOK_AT);
  });

  it('#getInteractionTypeFromClassificationResult should return InteractionType.GO_TO from the input go_to', () => {
    const result = service.getInteractionTypeFromClassificationResult('go_to');
    expect(result).toBe(InteractionType.GO_TO);
  });

  it('#getInteractionTypeFromClassificationResult should return InteractionType.PICK_UP from the input pick_up', () => {
    const result = service.getInteractionTypeFromClassificationResult('pick_up');
    expect(result).toBe(InteractionType.PICK_UP);
  });

  it('#getInteractionTypeFromClassificationResult should return InteractionType.DO from the input do', () => {
    const result = service.getInteractionTypeFromClassificationResult('do');
    expect(result).toBe(InteractionType.DO);
  });

  it('#getInteractionTypeFromClassificationResult should return InteractionType.DO from an invalid input', () => {
    let result = service.getInteractionTypeFromClassificationResult(undefined);
    expect(result).toBe(InteractionType.DO);
    result = service.getInteractionTypeFromClassificationResult(null);
    expect(result).toBe(InteractionType.DO);
    result = service.getInteractionTypeFromClassificationResult('');
    expect(result).toBe(InteractionType.DO);
    result = service.getInteractionTypeFromClassificationResult('asdasdas');
    expect(result).toBe(InteractionType.DO);
  });

});

class InputParserServiceChild extends InputParserService {
  public getGame(): Game {
    return this.Game;
  }

  public getInteractionTypePublic(input: string): InteractionType {
    return this.getInteractionType(input);
  }

  public getLikelyActionPublic(input: string, actions: Action[]): Action {
    return this.getLikelyAction(input, actions);
  }

  public getLikelyItemPublic(input: string, items: InGameItem[]): InGameItem {
    return this.getLikelyItem(input, items);
  }

  public getCommandsResponsePublic(input: string): ParseInputResult {
    return this.getCommandsResponse(input);
  }

  public getGoToResponsePublic(input: string): ParseInputResult {
    return this.getGoToResponse(input);
  }

  public getLookAtResponsePublic(input: string): ParseInputResult {
    return this.getLookAtResponse(input);
  }

  public getDoResponsePublic(input: string): ParseInputResult {
    return this.getDoResponse(input);
  }

  public getUseResponsePublic(input: string): ParseInputResult {
    return this.getUseResponse(input);
  }

  public getPickUpResponsePublic(input: string): ParseInputResult {
    return this.getPickUpResponse(input);
  }
}
