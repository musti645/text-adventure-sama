import { ClassificationError } from 'src/models/errors/classification.error';
import { IClassifier } from './interfaces/classifier.interface';
import * as natural from 'natural';
import { TaggedToken } from 'src/models/other/tagged-token.model';
import { ClassificationLabel } from 'src/models/other/classification-label.model';
import { ClassificationDocument } from 'src/models/other/classification-document.model';
import { ClassificationFeature } from 'src/models/other/classification-feature.model';
import { ClassificationResult } from 'src/models/other/classification-result.model';

export class BaseClassifier<ReturnType> implements IClassifier<ReturnType> {
    protected Labels: ReturnType[];
    protected ClassificationLabels: ClassificationLabel<ReturnType>[];
    protected Documents: ClassificationDocument<ReturnType>[];
    protected Features: ClassificationFeature<ReturnType>[];

    /**
     * A number between 0 and 1.
     * 1 means a full match of the input with one of the labels
     */
    protected ClassificationThreshold: number;

    private language = 'EN';
    private defaultCategory = 'N';
    private defaultCategoryCapitalized = 'NNP';
    protected nounCategories = ['N', 'NN', 'NNS', 'NNP', 'NNPS'];
    protected verbCategories = ['VB', 'VBD', 'VBG', 'VBN', 'VBO', 'VBZ'];
    protected Tokenizer: natural.Tokenizer;
    protected POSTagger: natural.BrillPOSTagger;

    constructor(threshold: number = 0.7, tokenizer?: natural.Tokenizer) {
        this.Documents = [];
        this.Features = [];
        this.Labels = [];
        this.ClassificationLabels = [];
        threshold = threshold;

        const lexicon = new natural.Lexicon(this.language, this.defaultCategory, this.defaultCategoryCapitalized);
        const ruleSet = new natural.RuleSet('EN');
        this.POSTagger = new natural.BrillPOSTagger(lexicon, ruleSet);

        if (tokenizer) {
            this.Tokenizer = tokenizer;
        } else {
            this.Tokenizer = new natural.WordTokenizer();
        }
    }


    addDocuments(document: string[], label: ReturnType): void {
        if (!document || document.length <= 0) {
            throw new ClassificationError('Document has to be of type string[] and may not be empty.');
        }

        if (!label) {
            throw new ClassificationError('Label has to be defined.');
        }

        this.Labels.push(label);

        for (const text of document) {
            this.Documents.push(new ClassificationDocument(label, text));
        }
    }

    addDocument(document: string, label: ReturnType) {
        if (!document) {
            throw new ClassificationError('Document has to be of type string and may not be empty.');
        }

        if (!label) {
            throw new ClassificationError('Label has to be defined.');
        }

        this.Labels.push(label);

        this.Documents.push(new ClassificationDocument(label, document));
    }

    train(): void {
        if (this.Documents.length <= 0) {
            throw new ClassificationError('No documents found to train with');
        }

        this.Documents.map(val => this.Features.push(...this.documentToFeature(val)));
        this.Documents = [];

        // get unique labels
        this.Labels = [...new Set(this.Labels)];

        // set labelIds for each feature
        for (let i = 0; i < this.Labels.length; i++) {
            let label = this.Labels[i];
            this.Features = this.Features.map(val => {
                // skip those, that already have a labelId
                if (val.labelId !== undefined && val.labelId !== null) {
                    return val;
                }
                if (label === val.label) {
                    val.labelId = i;
                    val.label = undefined;
                }
                return val;
            });
            this.ClassificationLabels.push(new ClassificationLabel<ReturnType>(i, label));
        }

        this.Labels = [];

    }

    protected documentToFeature(document: ClassificationDocument<ReturnType>): ClassificationFeature<ReturnType>[] {
        const features = [];
        const taggedTokens: TaggedToken[] = this.POSTagger.tag(this.Tokenizer.tokenize(document.text)).taggedWords;
        for (const token of taggedTokens) {
            features.push(new ClassificationFeature(document.label, token.token, token.tag));
        }

        return features;
    }

    classify(input: string): ReturnType {
        const classificationResults = this.getClassifications(input);

        if (classificationResults[0].score >= this.ClassificationThreshold) {
            return classificationResults[0].label;
        }

        return null;
    }

    getClassifications(input: string): ClassificationResult<ReturnType>[] {
        if (!input) {
            throw new ClassificationError('Invalid input.');
        }

        if (!this.Features || this.Features.length <= 0) {
            throw new ClassificationError('No features found. Please train the Classifier before trying to classify your input.');
        }

        const classificationResultsMap = {};
        for (const label of this.ClassificationLabels) {
            classificationResultsMap[label.labelId] = new ClassificationResult<ReturnType>(label.label);
        }

        // tokenize and tag words
        const taggedTokens: TaggedToken[] = this.POSTagger.tag(this.Tokenizer.tokenize(input)).taggedWords;

        // for each token of the input get the labels, that have a feature matching the token`s value
        taggedTokens.map(token => {
            this.Features.map(feature => {
                // increase the score of the label by one, if tokens match or if tags match
                if (feature.text === token.token) {
                    classificationResultsMap[feature.labelId].incrementScore();
                }

                if (feature.tag === token.tag) {
                    classificationResultsMap[feature.labelId].incrementScore();
                }
            });
        });

        let resultsArray: ClassificationResult<ReturnType>[] = [];

        const maxScore = ((taggedTokens.length+1) * 2);

        for (let classificationLabel of this.ClassificationLabels) {
            let result: ClassificationResult<ReturnType> = classificationResultsMap[classificationLabel.labelId];
            result.score = result.score/maxScore;
            resultsArray.push(result);
        }

        // sort descending
        resultsArray = resultsArray.sort((a, b) => b.score - a.score);

        return resultsArray;
    }
}

