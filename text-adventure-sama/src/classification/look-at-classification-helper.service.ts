import { ILookAtClassificationHelper } from './interfaces/look-at-classification-helper.interface';

export class LookAtClassificationHelper implements ILookAtClassificationHelper {
    getLookAtClassificationStrings(): string[] {
        return [
            'look at',
            'inspect',
            'check',
            'analyze',
            'read',
            'observe'
        ];
    }
    
}