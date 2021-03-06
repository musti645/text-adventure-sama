import { Injectable } from '@angular/core';

import { IUseClassificationHelper } from './interfaces/use-classification-helper.interface';

@Injectable()
export class UseClassificationHelper implements IUseClassificationHelper {
    getUseClassificationStrings(): string[] {
        return [
            'use',
            'interact with',
            'eat',
            'drink',
            'consume',
            'utilize',
            'do with',
            'play with'
        ];
    }
    
}