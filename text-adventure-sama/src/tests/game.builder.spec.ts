import { TestBed } from '@angular/core/testing';
import { CommandBuilder } from '../builder/command.builder';
import { GameBuilder } from '../builder/game.builder';
import { InventoryBuilder } from '../builder/inventory.builder';
import { SceneBuilder } from '../builder/scene.builder';
import { BuilderError } from '../models/errors/builder.error';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';
import * as _ from 'lodash';

describe('GameBuilder', () => {
    let testBuilder: GameBuilderChild;
    let testGame: Game;

    beforeEach(() => {
        testBuilder = new GameBuilderChild();

        testGame = new Game();
        testGame.setTitle('title');
        testGame.setIntroduction('introduction');
        testGame.setInventoryEmptyResponse('inventoryempty');
        testGame.setItemAddedToInventoryResponse('itemaddedtoinventory');
        testGame.setItemNotFoundInInventoryResponse('itemnotfoundininventory');
        testGame.setGatewayTargetNotFoundResponse('gatewaytargetnotfound');

        testGame.getStage().addScene(new Scene());

        TestBed.configureTestingModule({
            providers: [
            ]
        });
    });



    it('should return an InventoryBuilder when calling addInventory.', () => {
        expect(testBuilder.addInventory()).toBeInstanceOf(InventoryBuilder);
    });

    it('should return a SceneBuilder when calling addScene.', () => {
        expect(testBuilder.addScene()).toBeInstanceOf(SceneBuilder);
    });

    it('should return a CommandBuilder when calling addCommand.', () => {
        expect(testBuilder.addCommand()).toBeInstanceOf(CommandBuilder);
    });

    // Title
    it('should set the Title of the Game to the passed value', () => {
        testBuilder.setTitle(testGame.getTitle());
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });

    it('should throw an error when trying to set an undefined Title AND not set the Property', () => {
        testBuilder.getGame().setTitle(testGame.getTitle());
        expect(() => testBuilder.setTitle(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });

    it('should throw an error when trying to set a null Title AND not set the Property', () => {
        testBuilder.getGame().setTitle(testGame.getTitle());
        expect(() => testBuilder.setTitle(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });


    it('should throw an error when trying to set an empty Title AND not set the Property', () => {
        testBuilder.getGame().setTitle(testGame.getTitle());
        expect(() => testBuilder.setTitle('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });

    // Introduction
    it('should set the Introduction of the Game to the passed value', () => {
        testBuilder.setIntroduction(testGame.getIntroduction());
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    it('should throw an error when trying to set an undefined Introduction AND not set the Property', () => {
        testBuilder.getGame().setIntroduction(testGame.getIntroduction());
        expect(() => testBuilder.setIntroduction(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    it('should throw an error when trying to set a null Introduction AND not set the Property', () => {
        testBuilder.getGame().setIntroduction(testGame.getIntroduction());
        expect(() => testBuilder.setIntroduction(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    it('should throw an error when trying to set an empty Introduction AND not set the Property', () => {
        testBuilder.getGame().setIntroduction(testGame.getIntroduction());
        expect(() => testBuilder.setIntroduction('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    // ItemNotFoundInInventoryResponse
    it('should set the ItemNotFoundInInventoryResponse of the Game to the passed value', () => {
        testBuilder.setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
        expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
    });

    it('should throw an error when trying to set an undefined ItemNotFoundInInventoryResponse AND not set the Property', () => {
        testBuilder.getGame().setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
        expect(() => testBuilder.setItemNotFoundInInventoryResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
    });

    it('should throw an error when trying to set a null ItemNotFoundInInventoryResponse AND not set the Property', () => {
        testBuilder.getGame().setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
        expect(() => testBuilder.setItemNotFoundInInventoryResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
    });

    it('should throw an error when trying to set an empty ItemNotFoundInInventoryResponse AND not set the Property', () => {
        testBuilder.getGame().setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
        expect(() => testBuilder.setItemNotFoundInInventoryResponse('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
    });

    // ItemAddedToInventoryResponse
    it('should set the ItemAddedToInventoryResponse of the Game to the passed value', () => {
        testBuilder.setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
        expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
    });

    it('should throw an error when trying to set an undefined ItemAddedToInventoryResponse AND not set the Property', () => {
        testBuilder.getGame().setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
        expect(() => testBuilder.setItemAddedToInventoryResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
    });

    it('should throw an error when trying to set a null ItemAddedToInventoryResponse AND not set the Property', () => {
        testBuilder.getGame().setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
        expect(() => testBuilder.setItemAddedToInventoryResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
    });

    it('should throw an error when trying to set an empty ItemAddedToInventoryResponse AND not set the Property', () => {
        testBuilder.getGame().setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
        expect(() => testBuilder.setItemAddedToInventoryResponse('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
    });

    // GatewayTargetNotFoundResponse
    it('should set the GatewayTargetNotFoundResponse of the Game to the passed value', () => {
        testBuilder.setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
        expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
    });

    it('should throw an error when trying to set an undefined GatewayTargetNotFoundResponse AND not set the Property', () => {
        testBuilder.getGame().setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
        expect(() => testBuilder.setGatewayTargetNotFoundResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
    });

    it('should throw an error when trying to set a null GatewayTargetNotFoundResponse AND not set the Property', () => {
        testBuilder.getGame().setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
        expect(() => testBuilder.setGatewayTargetNotFoundResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
    });

    it('should throw an error when trying to set an empty GatewayTargetNotFoundResponse AND not set the Property', () => {
        testBuilder.getGame().setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
        expect(() => testBuilder.setGatewayTargetNotFoundResponse('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
    });

    // InventoryEmptyResponse
    it('should set the InventoryEmptyResponse of the Game to the passed value', () => {
        testBuilder.setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
        expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
    });

    it('should throw an error when trying to set an undefined InventoryEmptyResponse AND not set the Property', () => {
        testBuilder.getGame().setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
        expect(() => testBuilder.setInventoryEmptyResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
    });

    it('should throw an error when trying to set a null InventoryEmptyResponse AND not set the Property', () => {
        testBuilder.getGame().setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
        expect(() => testBuilder.setInventoryEmptyResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
    });

    it('should throw an error when trying to set an empty InventoryEmptyResponse AND not set the Property', () => {
        testBuilder.getGame().setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
        expect(() => testBuilder.setInventoryEmptyResponse('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
    });

    // finish
    it('should throw a builder error when trying to finish creating a game without a Title', () => {
        testBuilder.setIntroduction(testGame.getIntroduction())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        testBuilder.getGame().getStage().addScene(new Scene());


        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should throw a builder error when trying to finish creating a game without an Introduction', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        testBuilder.getGame().getStage().addScene(new Scene());


        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should throw a builder error when trying to finish creating a game without an InventoryEmptyResponse', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setIntroduction(testGame.getIntroduction())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        testBuilder.getGame().getStage().addScene(new Scene());

        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should throw a builder error when trying to finish creating a game without an ItemAddedToInventoryResponse', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setIntroduction(testGame.getIntroduction())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        testBuilder.getGame().getStage().addScene(new Scene());

        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should throw a builder error when trying to finish creating a game without an ItemNotFoundInInventoryResponse', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setIntroduction(testGame.getIntroduction())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        testBuilder.getGame().getStage().addScene(new Scene());

        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should throw a builder error when trying to finish creating a game without a GatewayTargetNotFoundResponse', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setIntroduction(testGame.getIntroduction())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());

        testBuilder.getGame().getStage().addScene(new Scene());

        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should throw a builder error when trying to finish creating a game without a Scene', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setIntroduction(testGame.getIntroduction())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        let game: Game;
        expect(() => game = testBuilder.finish()).toThrowError(BuilderError);
        expect(game).toBeUndefined();
    });

    it('should create a game', () => {
        testBuilder.setTitle(testGame.getTitle())
            .setIntroduction(testGame.getIntroduction())
            .setInventoryEmptyResponse(testGame.getInventoryEmptyResponse())
            .setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse())
            .setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse())
            .setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());

        testBuilder.getGame().getStage().addScene(testGame.getStage().getScenes()[0]);

        const game = testBuilder.finish();

        delete (game as any).Commands;
        delete (testGame as any).Commands;

        const areEqual = _.isEqual(game, testGame);

        expect(areEqual).toBeTrue();
    });

});

class GameBuilderChild extends GameBuilder {
    public getGame(): Game {
        return this.Game;
    }
}
