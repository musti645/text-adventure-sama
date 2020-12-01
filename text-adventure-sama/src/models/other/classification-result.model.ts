export class ClassificationResult<ReturnType> {
    label: ReturnType;
    score: number;

    constructor(label: ReturnType) {
        this.label = label;
        this.score = 0;
    }

    public incrementScore(): void {
        this.score++;
    }
}