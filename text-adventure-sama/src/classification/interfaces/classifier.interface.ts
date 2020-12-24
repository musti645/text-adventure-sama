import { ClassificationResult } from '../helpers/classification-result.model';

/**
 * A classifier is trained with documents to create features.
 * Documents, as features, link to a label.
 * 
 * These features are then used to classify the input to their corresponding label.
 */
export interface IClassifier<ReturnType> {
    /**
     * Adds a document to train this classifier with.
     */
    addDocument(document: string, label: ReturnType): void;

    /**
     * Adds multiple documents to train this classifier with.
     */
    addDocuments(document: string[], label: ReturnType): void;

    /**
     * Converts documents to features.
     * 
     * This should be used after all documents have been added.
     * A classifier cannot classify without being trained before.
     */
    train(): void;

    /**
     * Uses the features to create a score for each label
     * The label with the highest score, that also matches some other criteria, is then returned as the result.
     * Should return undefined or null, if no certain classification could be made.
     */
    classify(input: string): ReturnType;

    /**
     * Classify the input against all labels and return an array of those results including the scores and the corresponding labels
     */
    getClassifications(input: string): ClassificationResult<ReturnType>[];
}