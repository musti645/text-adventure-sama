/**
 * Global commands within the game that are evaluated before all of the other elements
 */
export declare class Command {
    private Trigger;
    private Response;
    private ResponseFunction;
    private UseTypeWritingAnimation;
    private Description;
    activate(): string;
    constructor();
    setTrigger(trigger: string): void;
    getTrigger(): string;
    setResponse(response: string): void;
    getResponse(): string;
    setResponseFunction(func: () => string): void;
    getResponseFunction(): () => string;
    setUseTypeWritingAnimation(use: boolean): void;
    getUseTypeWritingAnimation(): boolean;
    getDescription(): string;
    setDescription(desc: string): void;
}
