import { Injectable } from '@angular/core';

import { ILookAtClassificationHelper } from './interfaces/look-at-classification-helper.interface';

@Injectable()
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