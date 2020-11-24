/**
 * Global commands within the game that are evaluated before all of the other elements
 */
export class Command {
    private Trigger: string;
    private Response: string;
    private ResponseFunction: () => string;
    private UseTypeWritingAnimation: boolean;
    private Description: string;

    public activate(): string {
        if (this.Response) {
            return this.Response;
        } else {
            return this.ResponseFunction();
        }
    }

    constructor() {
    }

    public setTrigger(trigger: string): void {
        this.Trigger = trigger;
    }

    public getTrigger(): string {
        return this.Trigger;
    }

    public setResponse(response: string): void {
        this.Response = response;
    }

    public getResponse(): string {
        return this.Response;
    }

    public setResponseFunction(func: () => string): void {
        this.ResponseFunction = func;
    }

    public getResponseFunction(): () => string {
        return this.ResponseFunction;
    }

    public setUseTypeWritingAnimation(use: boolean): void {
        this.UseTypeWritingAnimation = use;
    }

    public getUseTypeWritingAnimation(): boolean {
        return this.UseTypeWritingAnimation;
    }

    public getDescription(): string {
        return this.Description;
    }

    public setDescription(desc: string): void {
        this.Description = desc;
    }

}
