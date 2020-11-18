/**
 * Global commands within the game that are evaluated before all of the other elements
 */
export class Command {
    Trigger: string;
    Response: string;
    ResponseFunction: () => string;
    UseTypeWritingAnimation: boolean;
    Description: string;

    public activate(): string {
        if (this.Response) {
            return this.Response;
        } else {
            return this.ResponseFunction();
        }
    }

    constructor() {
    }
}
