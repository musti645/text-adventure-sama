export class ClassificationLabel<ReturnType> {
    labelId: number;
    label: ReturnType;

    constructor(labelId: number, label: ReturnType) {
        this.labelId = labelId;
        this.label = label;
    }
}
