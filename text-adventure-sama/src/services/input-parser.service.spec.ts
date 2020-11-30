import { TestBed } from '@angular/core/testing';
import { Action } from 'src/models/actions/action.model';
import { GatewayAction } from 'src/models/actions/gateway-action.model';
import { OneTimeAction } from 'src/models/actions/one-time-action.model';
import { Game } from 'src/models/game.model';
import { InteractionType } from 'src/models/interactions/interaction-type.enum';
import { InGameItem } from 'src/models/item.model';
import { Scene } from 'src/models/scene.model';
import { ClassificationTrainer } from './classification-trainer.service';
import { InputParserService } from './input-parser.service';

describe('InputParserService', () => {
  let service: InputParserServiceChild;
  let game: Game;
  let scene: Scene;

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

    const action1 = new OneTimeAction();
    action1.setTrigger('open door');
    action1.setAlternativeTriggers(['unlock gate', 'unbarr exit', 'open entryway']);
    action1.setResponse('response gateway action');
    action1.setResponseAfterUse('you did that already');
    action1.setWasTriggered(false);
    scene.getActions().push(action1);

    const action2 = new GatewayAction();
    action2.setTrigger('close door');
    action2.setAlternativeTriggers(['shut door', 'lock gate', 'slam exit', 'bolt entryway']);
    action2.setIsEndGameAction(true);
    action2.setTargetSceneId(2);
    action2.setResponse('response gateway action');
    scene.getActions().push(action2);

    const item1 = new InGameItem();
    item1.setName('door');
    item1.setNoUsagesLeftResponse('Can\'t use it anymore.');
    item1.setDescription('Just a simple door.');
    item1.setInSceneDescription('The door is made out of wood and looks like it\'s not locked.');
    item1.setCanPickUp(false);
    scene.getItems().push(item1);

    const item2 = new InGameItem();
    item2.setName('stone');
    item2.setNoUsagesLeftResponse('You can\'t use the stone anymore. It\'s broken now.');
    item2.setDescription('An unnatural looking stone.');
    item2.setInSceneDescription('Just infront of the door lays a stone. It\'s shape seems very unnatural to you.');
    item2.setCanPickUp(true);
    scene.getItems().push(item2);

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
    expect(result).toEqual(scene.getActions()[0]);
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
    expect(result).toEqual(scene.getItems()[0]);
  });

  // parseInput - Look At
  it('#parseInput to return the item description of an item with a spelling mistake (1 char difference)', () => {
    const input = 'looke ata dooe';

    const result = service.parseInput(input);

    expect(result.Result).toBe(scene.getItems()[0].getDescription());
    expect(result.IsEndGameResult).toBe(false);
  });

  it('#parseInput to return the item description of an item without a spelling mistake', () => {
    const input = 'look at door';

    const result = service.parseInput(input);

    expect(result.Result).toBe(scene.getItems()[0].getDescription());
    expect(result.IsEndGameResult).toBe(false);
  });

  it('#parseInput to return the ItemNotFoundResponse when no matching item was found', () => {
    const input = 'look at window';

    const result = service.parseInput(input);

    expect(result.Result).toBe(scene.getItemNotFoundResponse());
    expect(result.IsEndGameResult).toBe(false);
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

  public getNounCategories(): string[] {
    return this.nounCategories;
  }

  public getVerbCategories(): string[] {
    return this.verbCategories;
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
}
