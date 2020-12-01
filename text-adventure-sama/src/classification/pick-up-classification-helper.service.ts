import { IPickUpClassificationHelper } from './interfaces/pick-up-classification-helper.interface';

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