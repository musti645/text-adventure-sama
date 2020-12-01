import { ClassificationResult } from '../helpers/classification-result.model';


export interface IClassifier<ReturnType> {
    addDocument(document: string, label: ReturnType): void;

    addDocuments(document: string[], label: ReturnType): void;

    train(): void;

    classify(input: string): ReturnType;

    getClassifications(input: string): ClassificationResult<ReturnType>[];
}