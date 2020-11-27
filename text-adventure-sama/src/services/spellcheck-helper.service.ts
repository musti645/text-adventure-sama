import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpellcheckHelperService {
    constructor() {
    }

    /**
     * Returns an array of words, that may occur frequently in a sentence
     */
    public static getInputRelevantWords(): string[] {
        return [
            'they',
            'look',
            'at',
            'pick',
            'up',
            'around',
            'up',
            'down',
            'inventory',
            'help',
            'of',
            'an',
            'a',
            'get',
            'set',
            'that',
            'this',
            'these',
            'not',
            'do',
            'use',
            'close',
            'open',
            'go',
            'to',
            'leave',
            'enter',
            'shut',
            'dance',
            'sit',
            'stand',
            'sleep',
            'fish',
            'do',
            'write',
            'read',
            'find',
            'work',
            'try',
            'feel',
            'create',
            'speak',
            'talk',
            'offer',
            'buy',
            'kill',
            'beat',
            'harm',
            'jump',
            'sell',
            'pull',
            'push',
            'put',
            'inspect',
            'check',
            'observe',
            'analyze',
            'interact',
            'run',
            'walk',
            'into',
            'in',
            'the',
            'take',
            'collect',
            'acquire'
        ];
    }
}
