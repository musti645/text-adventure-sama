import { TestBed } from '@angular/core/testing';
import { IDGeneratorService, TypeCountContainer } from './id-generator.service';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/item.model';
import { Action } from '../models/actions/action.model';
import { Injectable } from '@angular/core';
import { GatewayAction } from '../models/actions/gateway-action.model';
import { ItemYieldingAction } from '../models/actions/item-yielding-action.model';
import { ItemRemovingAction } from '../models/actions/item-removing-action.model';
import { ItemConsumingAction } from '../models/actions/item-consuming-action.model';

describe('IDGeneratorService', () => {
  let service: IDGeneratorServiceChild;
  beforeEach(() => {
    service = new IDGeneratorServiceChild();
  });

  it('#processScenes should set the SceneID to 1', () => {
    const scenes: Scene[] = [];
    // don't set the id
    scenes.push(new Scene());

    service.processScenes(scenes);

    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect(scenes[0].getID()).toBe(1);
  });

  it('#processScenes should set not override the SceneID', () => {
    const scenes: Scene[] = [];
    // set the id
    scenes.push(new Scene(4));

    service.processScenes(scenes);

    expect(scenes[0].getID()).toBe(4);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);

  });

  it('#processScenes should set both SceneID and InGameItemID to 1', () => {
    const scenes: Scene[] = [];

    const scene = new Scene();
    scene.getActions().push(new GatewayAction());
    scene.getItems().push(new InGameItem());

    scenes.push(scene);

    service.processScenes(scenes);

    const resultScene = scenes[0];
    expect(resultScene.getID()).toBe(1);
    expect(resultScene.getItems()[0].getID());

    expect(service.getTypeCountContainers().length).toBe(2);
    expect(service.getTypeCountContainers().filter(e => e.UsedIDs.length > 0).length).toBe(2);
  });

  it('#processScenes should set SceneID for multiple unset Scenes', () => {
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

  it('#processScenes should set SceneID for the unset Scene and should not set the SceneID for the set Scene', () => {
    const scenes: Scene[] = [];

    scenes.push(new Scene());
    scenes.push(new Scene(17));

    service.processScenes(scenes);

    expect(scenes[0].getID()).toBe(1);
    expect(scenes[1].getID()).toBe(17);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 1)).toBeGreaterThanOrEqual(0);
  });

  it('#processItems should set the InGameItemID to 1', () => {
    const items: InGameItem[] = [];
    // don't set id
    items.push(new InGameItem());

    service.processItems(items);

    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect(items[0].getID()).toBe(1);
  });

  it('#processItems should set not set the InGameItemID', () => {
    const items: InGameItem[] = [];
    // set the id
    items.push(new InGameItem(2));

    service.processItems(items);

    expect(items[0].getID()).toBe(2);
    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);
  });

  it('#processActions should set the ItemID of ItemYieldingAction to 1', () => {
    const actions: Action[] = [];
    const itemYieldingAction = new ItemYieldingAction();
    itemYieldingAction.setItem(new InGameItem());

    // don't set id
    actions.push(itemYieldingAction);

    service.processActions(actions);

    expect(service.getTypeCountContainers().length).toBe(1);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect((actions[0] as ItemYieldingAction).getItem().getID()).toBe(1);
  });

  it('#processActions should not set the ItemID of ItemConsumingAction', () => {
    const actions: Action[] = [];
    const itemConsumingAction = new ItemConsumingAction();
    itemConsumingAction.setItem(new InGameItem());

    // don't set id
    actions.push(itemConsumingAction);

    service.processActions(actions);

    expect(service.getTypeCountContainers().length).toBe(0);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(-1);
    expect((actions[0] as ItemConsumingAction).getItem().getID()).toBe(undefined);
  });

  it('#processActions should not set the ItemID of ItemRemovingAction', () => {
    const actions: Action[] = [];
    const itemRemovingAction = new ItemRemovingAction();
    itemRemovingAction.setItem(new InGameItem());

    // don't set id
    actions.push(itemRemovingAction);

    service.processActions(actions);

    expect(service.getTypeCountContainers().length).toBe(0);
    expect(service.getTypeCountContainers().findIndex(e => e.UsedIDs.length > 0)).toBe(-1);
    expect((actions[0] as ItemRemovingAction).getItem().getID()).toBe(undefined);
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
