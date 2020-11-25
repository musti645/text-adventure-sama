import { Command } from '../models/command.model';
import { BaseBuilder } from './base.builder';
import { CommandContainingBuilder } from './interfaces/command-containing.builder';
export declare class CommandBuilder<ReturnBuilderType extends CommandContainingBuilder> extends BaseBuilder {
    protected Command: Command;
    private Builder;
    constructor(builder: ReturnBuilderType, command?: Command);
    setTrigger(trigger: string): this;
    setResponse(response: string): this;
    setResponseFunction(respFunc: () => string): this;
    setUseTypeWritingAnimation(use: boolean): this;
    setDescription(descr: string): this;
    finish(): ReturnBuilderType;
}
