import { IGoToClassificationHelper } from './interfaces/go-to-classification-helper.interface';

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