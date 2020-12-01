export interface IPickUpClassificationHelper {
    /**
     * returns an array of strings, that are used to increase the classification score of PICK_UP type inputs
     */
    getPickUpClassificationStrings(): string[];
}