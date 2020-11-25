import * as natural from 'natural';
export interface IClassificationTrainer {
    trainClassifier(classifier: natural.BayesClassifier): Promise<any>;
}
