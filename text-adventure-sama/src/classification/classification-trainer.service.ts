import { Injectable } from '@angular/core';
import { IClassificationTrainer } from './interfaces/classification-trainer.interface';
import * as natural from 'natural';

@Injectable()
export class ClassificationTrainer implements IClassificationTrainer {
    trainClassifier(classifier: natural.BayesClassifier): Promise<void> {
        return new Promise<void>((resolve) => {
            classifier.addDocument('use keys', 'use');
            classifier.addDocument('use knob', 'use');
            classifier.addDocument('use old pen', 'use');
            classifier.addDocument('use rusty knife', 'use');
            classifier.addDocument('open door', 'use');
            classifier.addDocument('open oven', 'use');
            classifier.addDocument('open window', 'use');
            classifier.addDocument('interact with animal', 'use');
            classifier.addDocument('interact person', 'use');
            classifier.addDocument('close door', 'use');
            classifier.addDocument('close chest', 'use');
            classifier.addDocument('shut window', 'use');
            classifier.addDocument('shut the lid', 'use');
            classifier.addDocument('drink soda', 'use');
            classifier.addDocument('drink water', 'use');
            classifier.addDocument('eat mushrooms', 'use');
            classifier.addDocument('eat food', 'use');

            classifier.addDocument('look at house', 'look_at');
            classifier.addDocument('look at the chair', 'look_at');
            classifier.addDocument('inspect door', 'look_at');
            classifier.addDocument('inspect knife', 'look_at');
            classifier.addDocument('check window', 'look_at');
            classifier.addDocument('check fireplace', 'look_at');
            classifier.addDocument('analyze notes', 'look_at');
            classifier.addDocument('analyze keys', 'look_at');
            classifier.addDocument('read book', 'look_at');
            classifier.addDocument('read letter', 'look_at');
            classifier.addDocument('observe darkness', 'look_at');
            classifier.addDocument('observe forrest', 'look_at');


            classifier.addDocument('go inside', 'go_to');
            classifier.addDocument('go outside', 'go_to');
            classifier.addDocument('enter building', 'go_to');
            classifier.addDocument('enter home', 'go_to');
            classifier.addDocument('leave house', 'go_to');
            classifier.addDocument('leave hut', 'go_to');
            classifier.addDocument('run away', 'go_to');
            classifier.addDocument('run into the darkness', 'go_to');
            classifier.addDocument('walk to place', 'go_to');
            classifier.addDocument('walk to the shed', 'go_to');
            classifier.addDocument('walk into the bar', 'go_to');
            classifier.addDocument('go to Peter', 'go_to');
            classifier.addDocument('go in to the forrest', 'go_to');
            classifier.addDocument('go into the cellar', 'go_to');


            classifier.addDocument('take keys', 'pick_up');
            classifier.addDocument('take up book', 'pick_up');
            classifier.addDocument('take notebook', 'pick_up');
            classifier.addDocument('pick up a lighter', 'pick_up');
            classifier.addDocument('pick up leash', 'pick_up');
            classifier.addDocument('put something into bag', 'pick_up');
            classifier.addDocument('put water bottle into inventory', 'pick_up');
            classifier.addDocument('gather mushrooms', 'pick_up');
            classifier.addDocument('collect stones', 'pick_up');
            classifier.addDocument('acquire medal', 'pick_up');

            classifier.addDocument('dance', 'do');
            classifier.addDocument('sit', 'do');
            classifier.addDocument('stand', 'do');
            classifier.addDocument('sleep', 'do');
            classifier.addDocument('fish', 'do');
            classifier.addDocument('do', 'do');
            classifier.addDocument('write', 'do');
            classifier.addDocument('read', 'do');
            classifier.addDocument('find', 'do');
            classifier.addDocument('work', 'do');
            classifier.addDocument('try', 'do');
            classifier.addDocument('feel', 'do');
            classifier.addDocument('create', 'do');
            classifier.addDocument('speak', 'do');
            classifier.addDocument('talk', 'do');
            classifier.addDocument('offer', 'do');
            classifier.addDocument('buy', 'do');
            classifier.addDocument('kill', 'do');
            classifier.addDocument('beat', 'do');
            classifier.addDocument('harm', 'do');
            classifier.addDocument('jump', 'do');
            classifier.addDocument('sell', 'do');
            classifier.addDocument('pull', 'do');
            classifier.addDocument('push', 'do');
            classifier.addDocument('put', 'do');

            classifier.events.on('trainedWithDocument', () => resolve());

            classifier.train();
        });

    }

}
