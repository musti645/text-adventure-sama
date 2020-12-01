export interface ILookAtClassificationHelper {
    /**
     * returns an array of strings, that are used to increase the classification score of LOOK_AT type inputs
     */
    getLookAtClassificationStrings(): string[];
}