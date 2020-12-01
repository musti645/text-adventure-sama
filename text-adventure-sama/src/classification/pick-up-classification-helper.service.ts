import { Injectable } from '@angular/core';

import { IPickUpClassificationHelper } from './interfaces/pick-up-classification-helper.interface';

@Injectable()
export class PickUpClassificationHelper implements IPickUpClassificationHelper {
    getPickUpClassificationStrings(): string[] {
        return [
            'take',
            'pick up',
            'gather',
            'acquire',
            'collect'
        ];
    }
    
}