export class BuilderError extends Error {
    constructor(m: string) {
        super(m);

        Object.setPrototypeOf(this, BuilderError.prototype);
    }
}
