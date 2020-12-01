export class ClassificationError extends Error {
    constructor(m: string) {
        super('Classification failed. ' + m);

        Object.setPrototypeOf(this, ClassificationError.prototype);
    }
}
