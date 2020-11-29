import { Command } from '../../models/command.model';
import { CommandBuilder } from '../command.builder';

export interface CommandContainingBuilder {
    addCommandToBuilder(command: Command): void;

    addCommand(command?: Command): CommandBuilder<CommandContainingBuilder>;
}
