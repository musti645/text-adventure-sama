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

    public setTrigger(trigger: string): this {
        if (!trigger) {
            throw new EvalError('Trigger was undefined.');
        }

        this.Command.setTrigger(trigger.trim());
        return this;
    }

    public setResponse(response: string): this {
        if (!response) {
            throw new EvalError('Response was undefined.');
        }

        this.Command.setResponse(response.trim());
        return this;
    }

    public setResponseFunction(respFunc: () => string): this {
        if (!respFunc) {
            throw new EvalError('ResponseFunction was undefined.');
        }

        this.Command.setResponseFunction(respFunc);
        return this;
    }

    public setUseTypeWritingAnimation(use: boolean): this {
        if (use === undefined || use === null) {
            throw new EvalError('UseTypeWritingAnimation was undefined.');
        }

        this.Command.setUseTypeWritingAnimation(use);
        return this;
    }

    public setDescription(descr: string): this {
        if (!descr) {
            throw new EvalError('Description was undefined');
        }

        this.Command.setDescription(descr.trim());
        return this;
    }

    public setEndsGame(): this {
        this.Command.setEndGame(true);
        return this;
    }

    public setResetsGame(): this {
        this.Command.setResetsGame(true);
        return this;
    }

    public setClearsOutput(): this {
        this.Command.setClearsOutput(true);
        return this;
    }

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
