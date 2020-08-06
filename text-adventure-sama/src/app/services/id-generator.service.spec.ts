import { TestBed } from '@angular/core/testing';
import { IDGeneratorService, TypeCountContainer } from './id-generator.service';
import { SceneBuilder } from '../builder/scene.builder';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { Action } from '../models/actions/action.model';
import { Injectable } from '@angular/core';
import { SceneEventService } from './scene-event.service';
import { GatewayAction } from '../models/actions/gateway-action.model';
import { MultiTimeAction } from '../models/actions/multi-time-action.model';

describe('IDGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IDGeneratorServiceChild
    ]
  }));

  it('should be created', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    expect(service).toBeTruthy();
  });

  it('should set the SceneID to 1', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const scenes: Scene[] = [];
    // don't set the id
    scenes.push(new Scene());

    service.processScenes(scenes);

    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect(scenes[0].getID()).toBe(1);
  });

  it('should set not set the SceneID', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const scenes: Scene[] = [];
    // set the id
    scenes.push(new Scene(4));

    service.processScenes(scenes);

    expect(scenes[0].getID()).toBe(4);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);

  });

  it('should set SceneID, InGameItemID and ActionID to 1', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);

    const scenes: Scene[] = [];

    const scene = new Scene();
    scene.Actions.push(new GatewayAction());
    scene.Items.push(new InGameItem());

    scenes.push(scene);

    service.processScenes(scenes);

    const resultScene = scenes[0];
    expect(resultScene.getID()).toBe(1);
    expect(resultScene.Actions[0].getID()).toBe(1);
    expect(resultScene.Items[0].getID());

    expect(service.getTypeCountContainers().length).toBe(3);
    expect(service.getTypeCountContainers().filter(e => e.UsedIDs.length > 0).length).toBe(3);
  });

  it('should set SceneID for multiple unset Scenes', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);

    const scenes: Scene[] = [];

    scenes.push(new Scene());
    scenes.push(new Scene());

    service.processScenes(scenes);

    scenes.forEach((element, index) => {
      expect(element.getID()).toBe(index + 1);
    });
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 1)).toBeGreaterThanOrEqual(0);
  });

  it('should set SceneID for the unset Scene and should not set the SceneID for the set Scene', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);

    const scenes: Scene[] = [];

    scenes.push(new Scene());
    scenes.push(new Scene(17));

    service.processScenes(scenes);

    expect(scenes[0].getID()).toBe(1);
    expect(scenes[1].getID()).toBe(17);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 1)).toBeGreaterThanOrEqual(0);
  });

  it('should set the InGameItemID to 1', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const items: InGameItem[] = [];
    // don't set id
    items.push(new InGameItem());

    service.processItems(items);

    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect(items[0].getID()).toBe(1);
  });

  it('should set not set the InGameItemID', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const items: InGameItem[] = [];
    // set the id
    items.push(new InGameItem(2));

    service.processItems(items);

    expect(items[0].getID()).toBe(2);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);
  });

  it('should set the ActionID to 1', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const actions: Action[] = [];
    // don't set id
    actions.push(new GatewayAction());

    service.processActions(actions);

    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect(actions[0].getID()).toBe(1);
  });

  it('should set not set the ActionID', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const actions: Action[] = [];
    // don't set id
    actions.push(new GatewayAction(2));

    service.processActions(actions);

    expect(actions[0].getID()).toBe(2);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);
  });

  //TODO: is this legit? Shouldn't they share the same typecount container?
  it('should set a different ID for each type of action', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const actions: Action[] = [];
    // don't set id
    actions.push(new GatewayAction());
    actions.push(new MultiTimeAction());

    service.processActions(actions);

    actions.forEach((element) => {
      expect(element.getID()).toBe(1);
    });
    expect(service.getTypeCountContainers().length).toBe(2);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);
  });

});

@Injectable()
class IDGeneratorServiceChild extends IDGeneratorService {
  public processScenes(scenes: Scene[]): void {
    super.processScenes(scenes);
  }

  public processActions(actions: Action[]): void {
    super.processActions(actions);
  }

  public processItems(items: InGameItem[]): void {
    super.processItems(items);
  }

  public setUsedIdForTypeName(name: string, id: number): void {
    super.setUsedIdForTypeName(name, id);
  }

  public getIdFromTypeName(name: string): number {
    return super.getIdFromTypeName(name);
  }

  public getTypeCountContainers(): TypeCountContainer[] {
    return super.getTypeCountContainers();
  }
}
