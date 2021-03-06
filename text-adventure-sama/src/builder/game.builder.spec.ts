import { CommandBuilder } from './command.builder';
import { GameBuilder } from './game.builder';
import { InventoryBuilder } from './inventory.builder';
import { SceneBuilder } from './scene.builder';
import { BuilderError } from '../models/errors/builder.error';
import { Game } from '../models/game.model';
import { Scene } from '../models/scene.model';

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
    });

    afterEach(() => {
        testGame.getStage().unsubscribe();
        testGame.getInventory().unsubscribe();
        testBuilder.getGame().getInventory().unsubscribe();
        testBuilder.getGame().getStage().unsubscribe();
    });



    it('#addInventory should return an InventoryBuilder when calling addInventory.', () => {
        const builder = testBuilder.addInventory();
        expect(builder).toBeInstanceOf(InventoryBuilder);
        builder.finish();
    });

    it('#addScene should return a SceneBuilder when calling addScene.', () => {
        expect(testBuilder.addScene()).toBeInstanceOf(SceneBuilder);
    });

    it('#addCommand should return a CommandBuilder when calling addCommand.', () => {
        expect(testBuilder.addCommand()).toBeInstanceOf(CommandBuilder);
    });

    // Title
    it('#setTitle should set the Title of the Game to the passed value', () => {
        testBuilder.setTitle(testGame.getTitle());
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });

    it('#setTitle should throw an error when trying to set an undefined Title AND not set the Property', () => {
        testBuilder.getGame().setTitle(testGame.getTitle());
        expect(() => testBuilder.setTitle(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });

    it('#setTitle should throw an error when trying to set a null Title AND not set the Property', () => {
        testBuilder.getGame().setTitle(testGame.getTitle());
        expect(() => testBuilder.setTitle(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });


    it('#setTitle should throw an error when trying to set an empty Title AND not set the Property', () => {
        testBuilder.getGame().setTitle(testGame.getTitle());
        expect(() => testBuilder.setTitle('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getTitle()).toBe(testGame.getTitle());
    });

    // Introduction
    it('#setIntroduction should set the Introduction of the Game to the passed value', () => {
        testBuilder.setIntroduction(testGame.getIntroduction());
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    it('#setIntroduction should throw an error when trying to set an undefined Introduction AND not set the Property', () => {
        testBuilder.getGame().setIntroduction(testGame.getIntroduction());
        expect(() => testBuilder.setIntroduction(undefined)).toThrowError(EvalError);
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    it('#setIntroduction should throw an error when trying to set a null Introduction AND not set the Property', () => {
        testBuilder.getGame().setIntroduction(testGame.getIntroduction());
        expect(() => testBuilder.setIntroduction(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    it('#setIntroduction should throw an error when trying to set an empty Introduction AND not set the Property', () => {
        testBuilder.getGame().setIntroduction(testGame.getIntroduction());
        expect(() => testBuilder.setIntroduction('')).toThrowError(EvalError);
        expect(testBuilder.getGame().getIntroduction()).toBe(testGame.getIntroduction());
    });

    // ItemNotFoundInInventoryResponse
    it('#setItemNotFoundInInventoryResponse should set the ItemNotFoundInInventoryResponse of the Game to the passed value', () => {
        testBuilder.setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
        expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
    });

    it('#setItemNotFoundInInventoryResponse should throw an error when trying to set an undefined ItemNotFoundInInventoryResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
            expect(() => testBuilder.setItemNotFoundInInventoryResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
        });

    it('#setItemNotFoundInInventoryResponse should throw an error when trying to set a null ItemNotFoundInInventoryResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
            expect(() => testBuilder.setItemNotFoundInInventoryResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
        });

    it('#setItemNotFoundInInventoryResponse should throw an error when trying to set an empty ItemNotFoundInInventoryResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setItemNotFoundInInventoryResponse(testGame.getItemNotFoundInInventoryResponse());
            expect(() => testBuilder.setItemNotFoundInInventoryResponse('')).toThrowError(EvalError);
            expect(testBuilder.getGame().getItemNotFoundInInventoryResponse()).toBe(testGame.getItemNotFoundInInventoryResponse());
        });

    // ItemAddedToInventoryResponse
    it('#setItemAddedToInventoryResponse should set the ItemAddedToInventoryResponse of the Game to the passed value', () => {
        testBuilder.setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
        expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
    });

    it('#setItemAddedToInventoryResponse should throw an error when trying to set an undefined ItemAddedToInventoryResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
            expect(() => testBuilder.setItemAddedToInventoryResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
        });

    it('#setItemAddedToInventoryResponse should throw an error when trying to set a null ItemAddedToInventoryResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
            expect(() => testBuilder.setItemAddedToInventoryResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
        });

    it('#setItemAddedToInventoryResponse should throw an error when trying to set an empty ItemAddedToInventoryResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setItemAddedToInventoryResponse(testGame.getItemAddedToInventoryResponse());
            expect(() => testBuilder.setItemAddedToInventoryResponse('')).toThrowError(EvalError);
            expect(testBuilder.getGame().getItemAddedToInventoryResponse()).toBe(testGame.getItemAddedToInventoryResponse());
        });

    // GatewayTargetNotFoundResponse
    it('#setGatewayTargetNotFoundResponse should set the GatewayTargetNotFoundResponse of the Game to the passed value', () => {
        testBuilder.setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
        expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
    });

    it('#setGatewayTargetNotFoundResponse should throw an error when trying to set an undefined GatewayTargetNotFoundResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
            expect(() => testBuilder.setGatewayTargetNotFoundResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
        });

    it('#setGatewayTargetNotFoundResponse should throw an error when trying to set a null GatewayTargetNotFoundResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
            expect(() => testBuilder.setGatewayTargetNotFoundResponse(null)).toThrowError(EvalError);
            expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
        });

    it('#setGatewayTargetNotFoundResponse should throw an error when trying to set an empty GatewayTargetNotFoundResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setGatewayTargetNotFoundResponse(testGame.getGatewayTargetNotFoundResponse());
            expect(() => testBuilder.setGatewayTargetNotFoundResponse('')).toThrowError(EvalError);
            expect(testBuilder.getGame().getGatewayTargetNotFoundResponse()).toBe(testGame.getGatewayTargetNotFoundResponse());
        });

    // InventoryEmptyResponse
    it('#setInventoryEmptyResponse should set the InventoryEmptyResponse of the Game to the passed value', () => {
        testBuilder.setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
        expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
    });

    it('#setInventoryEmptyResponse should throw an error when trying to set an undefined InventoryEmptyResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
            expect(() => testBuilder.setInventoryEmptyResponse(undefined)).toThrowError(EvalError);
            expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
        });

    it('#setInventoryEmptyResponse should throw an error when trying to set a null InventoryEmptyResponse AND not set the Property', () => {
        testBuilder.getGame().setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
        expect(() => testBuilder.setInventoryEmptyResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
    });

    it('#setInventoryEmptyResponse should throw an error when trying to set an empty InventoryEmptyResponse'
        + ' AND not set the Property', () => {
            testBuilder.getGame().setInventoryEmptyResponse(testGame.getInventoryEmptyResponse());
            expect(() => testBuilder.setInventoryEmptyResponse('')).toThrowError(EvalError);
            expect(testBuilder.getGame().getInventoryEmptyResponse()).toBe(testGame.getInventoryEmptyResponse());
        });

    // finish
    it('#finish should throw a builder error when trying to finish creating a game without a Title', () => {
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

    it('#finish should throw a builder error when trying to finish creating a game without an Introduction', () => {
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

    it('#finish should throw a builder error when trying to finish creating a game without an InventoryEmptyResponse', () => {
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

    it('#finish should throw a builder error when trying to finish creating a game without an ItemAddedToInventoryResponse', () => {
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

    it('#finish should throw a builder error when trying to finish creating a game without an ItemNotFoundInInventoryResponse', () => {
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

    it('#finish should throw a builder error when trying to finish creating a game without a GatewayTargetNotFoundResponse', () => {
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

    it('#finish should throw a builder error when trying to finish creating a game without a Scene', () => {
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

    it('#finish should create a game', () => {
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

        testGame.getStage().unsubscribe();
        testGame.getInventory().unsubscribe();
        testBuilder.getGame().getInventory().unsubscribe();
        testBuilder.getGame().getStage().unsubscribe();

        expect(game).toEqual(testGame);
    });

});

class GameBuilderChild extends GameBuilder {
    public getGame(): Game {
        return this.Game;
    }
}
