import { Injectable } from '@angular/core';

import * as natural from 'natural';
import * as _ from 'lodash';

import { IClassifier } from './interfaces/classifier.interface';
import { ClassificationDocument } from '../classification/helpers/classification-document.model';
import { ClassificationFeature } from './helpers/classification-feature.model';
import { ClassificationLabel } from './helpers/classification-label.model';
import { ClassificationResult } from './helpers/classification-result.model';
import { ClassificationError } from '../models/errors/classification.error';
import { TaggedToken } from '../models/other/tagged-token.model';

@Injectable()
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
    protected AllowedTags = ['N', 'NN', 'NNS', 'NNP', 'NNPS', 'VB', 'VBD', 'VBG', 'VBN', 'VBO',
        'VBZ', 'JJ', 'JJR', 'JJS', 'RB', 'RBR', 'RBS'];
    protected FilterAllowedTags: boolean;
    protected Tokenizer: natural.Tokenizer;
    protected POSTagger: natural.BrillPOSTagger;

    constructor(threshold: number = 0.7, tokenizer?: natural.Tokenizer, filterAllowedTags: boolean = true) {
        this.Documents = [];
        this.Features = [];
        this.Labels = [];
        this.ClassificationLabels = [];
        this.ClassificationThreshold = threshold;
        this.FilterAllowedTags = filterAllowedTags;

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
        this.Labels = _.uniqWith(this.Labels, _.isEqual);

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

        // get unique features
        this.Features = _.uniqWith(this.Features, _.isEqual);

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

        return undefined;
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
        let taggedTokens: TaggedToken[] = this.POSTagger.tag(this.Tokenizer.tokenize(input)).taggedWords;

        if(this.FilterAllowedTags){
            taggedTokens = taggedTokens.filter(val => this.AllowedTags.includes(val.tag));
        }

        // for each token of the input get the labels, that have a feature matching the token`s value
        taggedTokens.map(token => {
            this.Features.map(feature => {
                // increase the score of the label by one, if tokens match or if tags match
                if (feature.text === token.token) {
                    classificationResultsMap[feature.labelId].incrementScore();
                }
            });
        });

        let resultsArray: ClassificationResult<ReturnType>[] = [];

        const maxScore = taggedTokens.length;

        for (let classificationLabel of this.ClassificationLabels) {
            let result: ClassificationResult<ReturnType> = classificationResultsMap[classificationLabel.labelId];
            result.score = result.score / maxScore;
            resultsArray.push(result);
        }

        // sort descending
        resultsArray = resultsArray.sort((a, b) => b.score - a.score);

        return resultsArray;
    }
}

