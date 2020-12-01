export interface IGoToClassificationHelper {
    /**
     * returns an array of strings, that are used to increase the classification score of GO_TO type inputs
     */
    getGoToClassificationStrings(): string[];
}