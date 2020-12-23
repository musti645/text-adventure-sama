import { Command } from '../models/command.model';
import { BuilderError } from '../models/errors/builder.error';
import { BaseBuilder } from './base.builder';
import { CommandContainingBuilder } from './interfaces/command-containing.builder';

export class CommandBuilder<ReturnBuilderType extends CommandContainingBuilder> extends BaseBuilder {
    protected Command: Command;
    private Builder: ReturnBuilderType;

    constructor(builder: ReturnBuilderType, command: Command = new Command()) {
        super();
        this.Command = command;
        this.Builder = builder;
    }

    /**
     * Sets the trigger of the command.
     * The trigger is a string, that has to be exactly match to activate (trigger) this command.
     */
    public setTrigger(trigger: string): this {
        if (!trigger) {
            throw new EvalError('Trigger was undefined.');
        }

        this.Command.setTrigger(trigger.trim());
        return this;
    }

    /**
     * Set the response, that is returned when the command was triggered.
     * Either use this OR the ResponseFunction.
     */
    public setResponse(response: string): this {
        if (!response) {
            throw new EvalError('Response was undefined.');
        }

        this.Command.setResponse(response.trim());
        return this;
    }

    /**
     * Sets the function, that is called when the command was triggered.
     * This function is supposed to return the response.
     * You could use it to return different responses or to generate a response out of something.
     */
    public setResponseFunction(respFunc: () => string): this {
        if (!respFunc) {
            throw new EvalError('ResponseFunction was undefined.');
        }

        this.Command.setResponseFunction(respFunc);
        return this;
    }

    /**
     * Determines if this specific command will use the TypeWritingAnimation when its being printed.
     * 
     * This is useful for long responses, like a "help" command.
     */
    public setUseTypeWritingAnimation(use: boolean): this {
        if (use === undefined || use === null) {
            throw new EvalError('UseTypeWritingAnimation was undefined.');
        }

        this.Command.setUseTypeWritingAnimation(use);
        return this;
    }

    /**
     * Sets the description of this command.
     * The description is currently used by the predefined "help" command.
     * @param descr 
     */
    public setDescription(descr: string): this {
        if (!descr) {
            throw new EvalError('Description was undefined');
        }

        this.Command.setDescription(descr.trim());
        return this;
    }

    /**
     * Determines if this command ends the game when triggered.
     */
    public setEndsGame(): this {
        this.Command.setEndGame(true);
        return this;
    }

    /**
     * Determines if this command resets the game when triggered.
     */
    public setResetsGame(): this {
        this.Command.setResetsGame(true);
        return this;
    }

    /**
     * Determines if this command clears the output of the game when triggered.
     */
    public setClearsOutput(): this {
        this.Command.setClearsOutput(true);
        return this;
    }

    /**
     * The finish method makes all the necessary checks on the current creation process 
     * and throws errors, if something is undefined or falsy.
     * 
     * It returns the builder, that started this creation process.
     */
    public finish(): ReturnBuilderType {
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
    }

}
