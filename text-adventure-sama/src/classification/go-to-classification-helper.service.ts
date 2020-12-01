import { Injectable } from '@angular/core';

import { IGoToClassificationHelper } from './interfaces/go-to-classification-helper.interface';

@Injectable()
export class GoToClassificationHelper implements IGoToClassificationHelper {
    getGoToClassificationStrings(): string[] {
        return [
            'go to',
            'walk to',
            'go inside',
            'go into',
            'leave',
            'enter'
        ];
    }
    
}