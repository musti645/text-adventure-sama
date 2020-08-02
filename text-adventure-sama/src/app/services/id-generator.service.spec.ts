import { TestBed } from '@angular/core/testing';
import { IDGeneratorService, TypeCountContainer } from './id-generator.service';
import { SceneBuilder } from '../builder/scene.builder';
import { Scene } from '../models/scene.model';
import { InGameItem } from '../models/Item.model';
import { Action } from '../models/actions/action.model';
import { Injectable } from '@angular/core';

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
    scenes.push(new Scene());
    service.processScenes(scenes);

    const typeCountContainers = service.getTypeCountContainers();
    expect(typeCountContainers.length).toBe(1);
    expect(typeCountContainers.findIndex(e => e.UsedIDs.length > 0)).toBe(0);
    expect(scenes[0].getID()).toBe(1);
  });

  it('should set not set the SceneID', () => {
    const service: IDGeneratorServiceChild = TestBed.inject(IDGeneratorServiceChild);
    const scenes: Scene[] = [];
    scenes.push(new Scene(4));
    service.processScenes(scenes);

    expect(scenes[0].getID()).toBe(4);
    const typeCountContainers = service.getTypeCountContainers();
    expect(typeCountContainers.length).toBe(1);
    expect(typeCountContainers.findIndex(e => e.UsedIDs.length > 0)).toBeGreaterThanOrEqual(0);

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
