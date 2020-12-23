import { ClassificationError } from 'src/models/errors/classification.error';
import { BaseClassifier } from './classifier.base';
import { ClassificationDocument } from './helpers/classification-document.model';
import { ClassificationFeature } from './helpers/classification-feature.model';
import { ClassificationLabel } from './helpers/classification-label.model';

describe('BaseClassifier.', () => {
    let testClassifier: BaseClassifierChild;
    let label: string;
    let documents: string[];

    beforeEach(() => {
        testClassifier = new BaseClassifierChild();
        label = 'someLabel';
        documents = ['doc1', 'doc2', 'doc3'];
    });

    // constructor
    it('#constructor should initialize values properly', () => {
        expect(testClassifier.getLabels()).toHaveSize(0);
        expect(testClassifier.getClassificationLabels()).toHaveSize(0);
        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getFeatures()).toHaveSize(0);
        expect(testClassifier.getFilterAllowedTags()).toBeTrue();
        expect(testClassifier.getIsCaseSensitive()).toBeFalse();
        expect(testClassifier.getClassificationThreshold()).toBe(0.7);
        expect(testClassifier.getPOSTagger()).toBeDefined();
        expect(testClassifier.getTokenizer()).toBeDefined();
    });

    it('#constructor should set the passed tokenizer as the classifiers tokenizer', () => {
        const tokenizer = {};
        
        testClassifier = new BaseClassifierChild(undefined, tokenizer);

        expect(testClassifier.getTokenizer()).toEqual(tokenizer);
    })

    // addDocuments
    it('#addDocuments should add all strings to the list of documents and a label to the list of labels', () => {
        testClassifier.addDocuments(documents, label);

        expect(testClassifier.getDocuments()).toHaveSize(documents.length);
        expect(testClassifier.getLabels()).toHaveSize(1);
    });

    it('#addDocuments should throw an error, when documents is null', () => {
        expect(() => testClassifier.addDocuments(null, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocuments should throw an error, when documents is undefined', () => {
        expect(() => testClassifier.addDocuments(undefined, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocuments should throw an error, when documents is empty', () => {
        expect(() => testClassifier.addDocuments([], label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocuments should throw an error, when one of the values of documents is null', () => {
        documents[1] = null;
        expect(() => testClassifier.addDocuments(documents, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocuments should throw an error, when one of the values of documents is undefined', () => {
        documents[1] = undefined;
        expect(() => testClassifier.addDocuments(documents, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocuments should throw an error, when one of the values of documents is empty', () => {
        documents[1] = '';
        expect(() => testClassifier.addDocuments(documents, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocuments should throw an error, when one of the values of documents is of a different type', () => {
        const alternativeDocuments: any = documents;
        alternativeDocuments[1] = 2;
        expect(() => testClassifier.addDocuments(alternativeDocuments, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });


    // addDocument
    it('#addDocument should throw an error, when document is null', () => {
        expect(() => testClassifier.addDocument(null, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocument should throw an error, when document is undefined', () => {
        expect(() => testClassifier.addDocument(undefined, label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });

    it('#addDocument should throw an error, when document is empty', () => {
        expect(() => testClassifier.addDocument('', label)).toThrowError(ClassificationError);

        expect(testClassifier.getDocuments()).toHaveSize(0);
        expect(testClassifier.getLabels()).toHaveSize(0);
    });


    it('#addDocument should add the document and label to the corresponding lists', () => {
        testClassifier.addDocument('doc9', label);

        expect(testClassifier.getDocuments()).toHaveSize(1);
        expect(testClassifier.getLabels()).toHaveSize(1);
    });

    //train
    it('#train should add a feature for each token in the document', () => {
        const documentsString = documents.join(' ');
        testClassifier.addDocument(documentsString, label);
        testClassifier.train();

        const result = testClassifier.getFeatures()
        expect(result).toHaveSize(documents.length);
        expect(testClassifier.getClassificationLabels()).toHaveSize(1);

        for (const feature of result) {
            const value = documents.find(val => val === feature.text)
            expect(value).toBeDefined();
        }
    });

    it('#train should only add unique features', () => {
        documents[0] = documents[1];
        testClassifier.addDocuments(documents, label);
        testClassifier.train();

        expect(testClassifier.getFeatures()).toHaveSize(documents.length - 1);
        expect(testClassifier.getClassificationLabels()).toHaveSize(1);
    });

    it('#train should only add unique classification labels', () => {
        testClassifier.addDocuments(documents, label);
        testClassifier.addDocument('somedoc', label);
        testClassifier.train();

        expect(testClassifier.getFeatures()).toHaveSize(documents.length + 1);
        expect(testClassifier.getClassificationLabels()).toHaveSize(1);
    });

    it('#train should throw an error, when there are no documents to be trained with', () => {
        expect(() => testClassifier.train()).toThrowError(ClassificationError);

        expect(testClassifier.getFeatures()).toHaveSize(0);
        expect(testClassifier.getClassificationLabels()).toHaveSize(0);
    });

    it('#train should transform document strings to lowercase when CaseSensitivity is not set', () => {
        testClassifier.setCaseSensitivity(false);

        const upperCaseDocuments = documents.map(val => val.toLocaleUpperCase());
        testClassifier.addDocuments(upperCaseDocuments, label);
        testClassifier.train();

        const result = testClassifier.getFeatures();

        for(let i = 0; i < upperCaseDocuments.length; i++) {
            expect(result[i].text).toEqual(documents[i]);
        }
    });

    it('#train should not transform document strings when CaseSensitivity is set', () => {
        testClassifier.setCaseSensitivity(true);

        const upperCaseDocuments = documents.map(val => val.toLocaleUpperCase());
        testClassifier.addDocuments(upperCaseDocuments, label);
        testClassifier.train();

        const result = testClassifier.getFeatures();

        for(let i = 0; i < upperCaseDocuments.length; i++) {
            expect(result[i].text).toEqual(upperCaseDocuments[i]);
        }
    });

    //getClassifications
    it('#getClassifications should throw an error when input is undefined', () => {
        expect(() => testClassifier.getClassifications(undefined)).toThrowError(ClassificationError);
    });

    it('#getClassifications should throw an error when input is null', () => {
        expect(() => testClassifier.getClassifications(null)).toThrowError(ClassificationError);
    });

    it('#getClassifications should throw an error when input is empty', () => {
        expect(() => testClassifier.getClassifications('')).toThrowError(ClassificationError);
    });

    it('#getClassifications should throw an error when the classifier has not been trained yet', () => {
        expect(() => testClassifier.getClassifications('input')).toThrowError(ClassificationError);
    });

    it('#getClassifications should return a score of 0 on every label with no matching input', () => {
        testClassifier.addDocuments(documents, label);
        testClassifier.train();
        const result = testClassifier.getClassifications('input');

        expect(result).toHaveSize(1);

        for (const classification of result) {
            expect(classification.score).toBe(0);
        }
    });

    it('#getClassifications should return a score of 1 on the label with matching input', () => {
        testClassifier.addDocuments(documents, label);
        testClassifier.train();
        const result = testClassifier.getClassifications(documents[0]);

        expect(result).toHaveSize(1);

        for (const classification of result) {
            expect(classification.score).toBe(1);
        }
    });

    it('#getClassifications should return a score of 1 on the label with upper case input and case sentitivity set to false', () => {
        testClassifier.setCaseSensitivity(false);
        testClassifier.addDocuments(documents, label);
        testClassifier.train();
        const result = testClassifier.getClassifications(documents[0].toUpperCase());

        expect(result).toHaveSize(1);

        for (const classification of result) {
            expect(classification.score).toBe(1);
        }
    });

    it('#getClassifications should return a score of 0 on the label with upper case input and case sentitivity set to true', () => {
        testClassifier.setCaseSensitivity(true);
        testClassifier.addDocuments(documents, label);
        testClassifier.train();
        const result = testClassifier.getClassifications(documents[0].toUpperCase());

        expect(result).toHaveSize(1);

        for (const classification of result) {
            expect(classification.score).toBe(0);
        }
    });

    it('#getClassifications should not filter the input by tags when FilterAllowedTags is set to false', () => {
        testClassifier.setFilterAllowedTags(false);
        testClassifier.addDocuments(documents, label);
        testClassifier.train();
        const input = documents[0] + ' the and you';

        const result = testClassifier.getClassifications(input);
        
        expect(result).toHaveSize(1);

        const inputTokensCount = input.split(' ').length;

        for (const classification of result) {
            expect(classification.score).toBe(1/inputTokensCount);
        }
    });

    
    //classify
    it('#classify should throw an error when input is undefined', () => {
        expect(() => testClassifier.classify(undefined)).toThrowError(ClassificationError);
    });

    it('#classify should throw an error when input is null', () => {
        expect(() => testClassifier.classify(null)).toThrowError(ClassificationError);
    });

    it('#classify should throw an error when input is empty', () => {
        expect(() => testClassifier.classify('')).toThrowError(ClassificationError);
    });

    it('#classify should throw an error when the classifier has not been trained yet', () => {
        expect(() => testClassifier.classify('input')).toThrowError(ClassificationError);
    });

    it('#classify should return the label with classification score higher than threshold', () => {
        testClassifier.addDocuments(documents, label);
        testClassifier.train();

        const result = testClassifier.classify(documents[0]);
        
        expect(result).toBe(label);
    });

    it('#classify should return the undefined with classification score lower than threshold', () => {
        testClassifier.addDocuments(documents, label);
        testClassifier.train();
        
        const result = testClassifier.classify('input');
        expect(result).toBeUndefined()
    });
});


class BaseClassifierChild extends BaseClassifier<string> {
    public getLabels(): string[] {
        return this.Labels;
    }

    public getClassificationLabels(): ClassificationLabel<string>[] {
        return this.ClassificationLabels;
    }

    public getDocuments(): ClassificationDocument<string>[] {
        return this.Documents;
    }

    public getFeatures(): ClassificationFeature<string>[] {
        return this.Features;
    }

    public getPOSTagger(): any {
        return this.POSTagger;
    }

    public getTokenizer(): any {
        return this.Tokenizer;
    }

    public getAllowedTags(): string[] {
        return this.AllowedTags;
    }

    public getClassificationThreshold(): number {
        return this.ClassificationThreshold;
    }

    public getFilterAllowedTags(): boolean {
        return this.FilterAllowedTags;
    }

    public getIsCaseSensitive(): boolean {
        return this.IsCaseSensitive;
    }

    public setThreshold(no: number): void {
        this.ClassificationThreshold = no;
    }

    public setFilterAllowedTags(val: boolean): void {
        this.FilterAllowedTags = val;
    }

    public setCaseSensitivity(val: boolean): void {
        this.IsCaseSensitive = val;
    }
}