export class ClassificationDocument<ReturnType> {
    label: ReturnType;
    text: string;

    constructor(label: ReturnType, text: string) {
        this.label = label;
        this.text = text;
    }
}
