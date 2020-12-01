export class ClassificationFeature<ReturnType> {
    label: ReturnType;
    labelId: number = undefined;
    text: string;
    tag: string;

    constructor(label: ReturnType, text: string, tag: string) {
        this.label = label;
        this.text = text;
        this.tag = tag;
    }
}
