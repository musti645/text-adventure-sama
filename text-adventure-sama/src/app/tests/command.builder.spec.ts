import { TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { BaseBuilder } from '../builder/base.builder';
import { CommandBuilder } from '../builder/command.builder';
import { CommandContainingBuilder } from '../builder/interfaces/command-containing.builder';
import { Command } from '../models/command.model';
import { BuilderError } from '../models/errors/builder.error';


describe('CommandBuilder.', () => {
    let parentBuilder: TestCommandBuilder;
    let testBuilder: TestCommandContainingBuilder;
    let testCommand: Command;

    beforeEach(() => {
        parentBuilder = new TestCommandBuilder();
        testBuilder = new TestCommandContainingBuilder(parentBuilder);

        testCommand = new Command();
        testCommand.setTrigger('testtrigger');
        testCommand.setResponse('testresponse');
        testCommand.setDescription('testdescription');
        testCommand.setResponseFunction(() => 'responsefunctionresponse');
        testCommand.setUseTypeWritingAnimation(true);

        TestBed.configureTestingModule({
            providers: [
            ]
        });
    });

    it('should throw an error when trying to set an undefined Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testCommand.getTrigger());
        expect(() => testBuilder.setTrigger(undefined)).toThrowError(EvalError);
        expect(testBuilder.getCommand().getTrigger()).toBe(testCommand.getTrigger());
    });

    it('should throw an error when trying to set a null Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testCommand.getTrigger());
        expect(() => testBuilder.setTrigger(null)).toThrowError(EvalError);
        expect(testBuilder.getCommand().getTrigger()).toBe(testCommand.getTrigger());
    });

    it('should throw an error when trying to set an empty Trigger AND not set the Property.', () => {
        testBuilder.setTrigger(testCommand.getTrigger());
        expect(() => testBuilder.setTrigger('')).toThrowError(EvalError);
        expect(testBuilder.getCommand().getTrigger()).toBe(testCommand.getTrigger());
    });

    it('should set the Trigger to the passed value', () => {
        const trigger = 'someothertrigger';
        testBuilder.getCommand().setTrigger(testCommand.getTrigger());
        testBuilder.setTrigger(trigger);
        expect(testBuilder.getCommand().getTrigger()).toBe(trigger);
    });

    it('should throw an error when trying to set an undefined Response AND not set the Property.', () => {
        testBuilder.setResponse(testCommand.getResponse());
        expect(() => testBuilder.setResponse(undefined)).toThrowError(EvalError);
        expect(testBuilder.getCommand().getResponse()).toBe(testCommand.getResponse());
    });

    it('should throw an error when trying to set a null Response AND not set the Property.', () => {
        testBuilder.setResponse(testCommand.getResponse());
        expect(() => testBuilder.setResponse(null)).toThrowError(EvalError);
        expect(testBuilder.getCommand().getResponse()).toBe(testCommand.getResponse());
    });

    it('should throw an error when trying to set an empty Response AND not set the Property.', () => {
        testBuilder.setResponse(testCommand.getResponse());
        expect(() => testBuilder.setResponse('')).toThrowError(EvalError);
        expect(testBuilder.getCommand().getResponse()).toBe(testCommand.getResponse());
    });

    it('should set the Response to the passed value', () => {
        const response = 'someresponse';
        testBuilder.getCommand().setResponse(testCommand.getResponse());
        testBuilder.setResponse(response);
        expect(testBuilder.getCommand().getResponse()).toBe(response);
    });

    it('should throw a builder error when trying to finish creation process of an action without a Trigger AND not add the action to the parent builder.', () => {
        testBuilder.setResponse(testCommand.getResponse())
        .setDescription(testCommand.getDescription())
        .setResponseFunction(testCommand.getResponseFunction())
        .setUseTypeWritingAnimation(testCommand.getUseTypeWritingAnimation());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Commands.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an action with neither a Response nor a ResponseFunction AND not add the action to the parent builder.', () => {
        testBuilder.setTrigger(testCommand.getTrigger())
        .setDescription(testCommand.getDescription())
        .setUseTypeWritingAnimation(testCommand.getUseTypeWritingAnimation());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Commands.length).toBe(0);
    });

    it('should throw a builder error when trying to finish creation process of an action without a Description AND not add the action to the parent builder.', () => {
        testBuilder.setTrigger(testCommand.getTrigger())
        .setResponse(testCommand.getResponse())
        .setResponseFunction(testCommand.getResponseFunction())
        .setUseTypeWritingAnimation(testCommand.getUseTypeWritingAnimation());

        expect(() => testBuilder.finish()).toThrowError(BuilderError);
        expect(parentBuilder.Commands.length).toBe(0);
    });

    it('should add the action to the parent builder.', () => {
        testBuilder.setTrigger(testCommand.getTrigger())
        .setResponse(testCommand.getResponse())
        .setDescription(testCommand.getDescription())
        .setResponseFunction(testCommand.getResponseFunction())
        .setUseTypeWritingAnimation(testCommand.getUseTypeWritingAnimation())
        .finish();

        expect(parentBuilder.Commands.length).toBe(1);

        const areEqual = _.isEqual(parentBuilder.Commands[0], testCommand);
        expect(areEqual).toBeTrue();
    });

});


class TestCommandContainingBuilder extends CommandBuilder<TestCommandBuilder> {
    public getCommand(): Command {
        return this.Command;
    }
}


class TestCommandBuilder extends BaseBuilder implements CommandContainingBuilder {
    public Commands: Command[] = [];

    addCommandToBuilder(command: Command): void {
        this.Commands.push(command);
    }

    addCommand(command?: Command): CommandBuilder<CommandContainingBuilder> {
        return new CommandBuilder<TestCommandBuilder>(this);
    }

    public finish() {
    }
}
