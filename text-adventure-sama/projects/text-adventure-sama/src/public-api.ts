/*
 * Public API Surface of text-adventure-sama
 */

export * from './lib/builder/game.builder';

// are these really necessary?
export * from './lib/builder/command.builder';
export * from './lib/builder/inventory.builder';
export * from './lib/builder/item.builder';
export * from './lib/builder/scene.builder';

/* Models */
export * from './lib/models/game.model';
export * from './lib/models/interactions/interaction-type.enum';

// Are these really necessary?
export * from './lib/models/scene.model';
export * from './lib/models/command.model';
export * from './lib/models/inventory.model';
export * from './lib/models/item.model';
export * from './lib/models/stage.model';

/* ClassificationTrainerInterface */
export * from './lib/services/classification-trainer.interface';


/* Component & Module */
export * from './lib/text-adventure/text-adventure.module';
export * from './lib/text-adventure/text-adventure.component';

