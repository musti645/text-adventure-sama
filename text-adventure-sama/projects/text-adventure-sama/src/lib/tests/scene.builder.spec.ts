import { TestBed } from '@angular/core/testing';
import { GameBuilder } from '../builder/game.builder';
import { SceneBuilder } from '../builder/scene.builder';
import { BuilderError } from '../models/errors/builder.error';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import * as _ from 'lodash';

describe('SceneBuilder.', () => {
    let parentBuilder: GameBuilderChild;
    let testBuilder: SceneBuilderChild;
    let testScene: Scene;
    let testGame: Game;

    beforeEach(() => {
        parentBuilder = new GameBuilderChild();
        testGame = new Game();

        testBuilder = new SceneBuilderChild(parentBuilder, testGame);
        testScene = new Scene();
        testScene.setID(null);
        testScene.setName('testname');
        testScene.setDescription('testdescription');
        testScene.setActionNotRecognizedResponse('actionnotrecognized');
        testScene.setInvalidInputResponse('invalid input');
        testScene.setItemNotFoundResponse('item not found');

        TestBed.configureTestingModule({
            providers: [
            ]
        });
    });

    // Name
    it('should set the Name of the Scene to the passed Value', () => {
        testBuilder.setName(testScene.getName());
        expect(testBuilder.getScene().getName()).toBe(testScene.getName());
    });

    it('should throw an error when trying to set an undefined Name AND not set the Property.', () => {
        testBuilder.setName(testScene.getName());
        expect(() => testBuilder.setName(undefined)).toThrowError(EvalError);
        expect(testBuilder.getScene().getName()).toBe(testScene.getName());
    });

    it('should throw an error when trying to set a null Name AND not set the Property.', () => {
        testBuilder.setName(testScene.getName());
        expect(() => testBuilder.setName(null)).toThrowError(EvalError);
        expect(testBuilder.getScene().getName()).toBe(testScene.getName());
    });

    it('should throw an error when trying to set an empty Name AND not set the Property.', () => {
        testBuilder.setName(testScene.getName());
        expect(() => testBuilder.setName('')).toThrowError(EvalError);
        expect(testBuilder.getScene().getName()).toBe(testScene.getName());
    });

    // Description
    it('should set the Description of the Scene to the passed Value', () => {
        testBuilder.setDescription(testScene.getDescription());
        expect(testBuilder.getScene().getDescription()).toBe(testScene.getDescription());
    });

    it('should throw an error when trying to set an undefined Description AND not set the Property.', () => {
        testBuilder.setDescription(testScene.getDescription());
        expect(() => testBuilder.setDescription(undefined)).toThrowError(EvalError);
        expect(testBuilder.getScene().getDescription()).toBe(testScene.getDescription());
    });

    it('should throw an error when trying to set a null Description AND not set the Property.', () => {
        testBuilder.setDescription(testScene.getDescription());
        expect(() => testBuilder.setDescription(null)).toThrowError(EvalError);
        expect(testBuilder.getScene().getDescription()).toBe(testScene.getDescription());
    });

    it('should throw an error when trying to set an empty Description AND not set the Property.', () => {
        testBuilder.setDescription(testScene.getDescription());
        expect(() => testBuilder.setDescription('')).toThrowError(EvalError);
        expect(testBuilder.getScene().getDescription()).toBe(testScene.getDescription());
    });

    // ActionNotRecognizedResponse
    it('should set the ActionNotRecognizedResponse of the Scene to the passed Value', () => {
        testBuilder.setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse());
        expect(testBuilder.getScene().getActionNotRecognizedResponse()).toBe(testScene.getActionNotRecognizedResponse());
    });


    it('should throw an error when trying to set an undefined ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse());
        expect(() => testBuilder.setActionNotRecognizedResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getScene().getActionNotRecognizedResponse()).toBe(testScene.getActionNotRecognizedResponse());
    });

    it('should throw an error when trying to set a null ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse());
        expect(() => testBuilder.setActionNotRecognizedResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getScene().getActionNotRecognizedResponse()).toBe(testScene.getActionNotRecognizedResponse());
    });

    it('should throw an error when trying to set an empty ActionNotRecognizedResponse AND not set the Property.', () => {
        testBuilder.setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse());
        expect(() => testBuilder.setActionNotRecognizedResponse('')).toThrowError(EvalError);
        expect(testBuilder.getScene().getActionNotRecognizedResponse()).toBe(testScene.getActionNotRecognizedResponse());
    });

    // ItemNotFoundResponse
    it('should set the ItemNotFoundResponse of the Scene to the passed Value', () => {
        testBuilder.setItemNotFoundResponse(testScene.getItemNotFoundResponse());
        expect(testBuilder.getScene().getItemNotFoundResponse()).toBe(testScene.getItemNotFoundResponse());
    });


    it('should throw an error when trying to set an undefined ItemNotFoundResponse AND not set the Property.', () => {
        testBuilder.setItemNotFoundResponse(testScene.getItemNotFoundResponse());
        expect(() => testBuilder.setItemNotFoundResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getScene().getItemNotFoundResponse()).toBe(testScene.getItemNotFoundResponse());
    });

    it('should throw an error when trying to set a null ItemNotFoundResponse AND not set the Property.', () => {
        testBuilder.setItemNotFoundResponse(testScene.getItemNotFoundResponse());
        expect(() => testBuilder.setItemNotFoundResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getScene().getItemNotFoundResponse()).toBe(testScene.getItemNotFoundResponse());
    });

    it('should throw an error when trying to set an empty ItemNotFoundResponse AND not set the Property.', () => {
        testBuilder.setItemNotFoundResponse(testScene.getItemNotFoundResponse());
        expect(() => testBuilder.setItemNotFoundResponse('')).toThrowError(EvalError);
        expect(testBuilder.getScene().getItemNotFoundResponse()).toBe(testScene.getItemNotFoundResponse());
    });

    // InvalidInputResponse
    it('should set the InvalidInputResponse of the Scene to the passed Value', () => {
        testBuilder.setInvalidInputResponse(testScene.getInvalidInputResponse());
        expect(testBuilder.getScene().getInvalidInputResponse()).toBe(testScene.getInvalidInputResponse());
    });


    it('should throw an error when trying to set an undefined InvalidInputResponse AND not set the Property.', () => {
        testBuilder.setInvalidInputResponse(testScene.getInvalidInputResponse());
        expect(() => testBuilder.setInvalidInputResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getScene().getInvalidInputResponse()).toBe(testScene.getInvalidInputResponse());
    });

    it('should throw an error when trying to set a null InvalidInputResponse AND not set the Property.', () => {
        testBuilder.setInvalidInputResponse(testScene.getInvalidInputResponse());
        expect(() => testBuilder.setInvalidInputResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getScene().getInvalidInputResponse()).toBe(testScene.getInvalidInputResponse());
    });

    it('should throw an error when trying to set an empty InvalidInputResponse AND not set the Property.', () => {
        testBuilder.setInvalidInputResponse(testScene.getInvalidInputResponse());
        expect(() => testBuilder.setInvalidInputResponse('')).toThrowError(EvalError);
        expect(testBuilder.getScene().getInvalidInputResponse()).toBe(testScene.getInvalidInputResponse());
    });

    // finish
    it('should throw a builder error when trying to finish creation process of an scene without a Name AND not add the scene to the parent builder.', () => {
        testBuilder.setDescription(testScene.getDescription())
            .setInvalidInputResponse(testScene.getInvalidInputResponse())
            .setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse())
            .setItemNotFoundResponse(testScene.getItemNotFoundResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(testGame.getScenesCount()).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a Description AND not add the scene to the parent builder.', () => {
        testBuilder.setName(testScene.getName())
            .setInvalidInputResponse(testScene.getInvalidInputResponse())
            .setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse())
            .setItemNotFoundResponse(testScene.getItemNotFoundResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(testGame.getScenesCount()).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a InvalidInputResponse AND not add the scene to the parent builder.', () => {
        testBuilder.setName(testScene.getName())
            .setDescription(testScene.getDescription())
            .setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse())
            .setItemNotFoundResponse(testScene.getItemNotFoundResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(testGame.getScenesCount()).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a ItemNotFoundresponse AND not add the scene to the parent builder.', () => {
        testBuilder.setName(testScene.getName())
            .setDescription(testScene.getDescription())
            .setInvalidInputResponse(testScene.getInvalidInputResponse())
            .setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(testGame.getScenesCount()).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an scene without a ActionNotRecognizedResponse AND not add the scene to the parent builder.', () => {
        testBuilder.setName(testScene.getName())
            .setDescription(testScene.getDescription())
            .setInvalidInputResponse(testScene.getInvalidInputResponse())
            .setItemNotFoundResponse(testScene.getItemNotFoundResponse());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(testGame.getScenesCount()).toBe(0);
    });

    it('should add the scene to the parent builder.', () => {
        testBuilder.setName(testScene.getName())
            .setDescription(testScene.getDescription())
            .setInvalidInputResponse(testScene.getInvalidInputResponse())
            .setActionNotRecognizedResponse(testScene.getActionNotRecognizedResponse())
            .setItemNotFoundResponse(testScene.getItemNotFoundResponse())
            .finish();

        expect(testGame.getScenesCount()).toBe(1);

        const areEqual = _.isEqual(testGame.getStage().getScenes()[0], testScene);
        expect(areEqual).toBeTrue();
    });

});

class GameBuilderChild extends GameBuilder {
    public getGame(): Game {
        return this.Game;
    }
}

class SceneBuilderChild extends SceneBuilder {
    public getScene(): Scene {
        return this.Scene;
    }
}
