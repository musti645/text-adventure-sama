import { IClassificationTrainer } from './classification-trainer.interface';
import * as natural from 'natural';
export declare class ClassificationTrainer implements IClassificationTrainer {
    trainClassifier(classifier: natural.BayesClassifier): Promise<void>;
}
