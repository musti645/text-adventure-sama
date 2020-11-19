
/**
 * Allows us to pass multiple parameters without altering the function too much
 */
export class ParseInputResult {
    public Result: string;
    public UseTypewriterAnimation: boolean;
    public IsEndGameResult: boolean;

    constructor(result: string, typewriteAnimation: boolean = true, isEndGameResult: boolean = false) {
        this.Result = result;
        this.UseTypewriterAnimation = typewriteAnimation;
        this.IsEndGameResult = isEndGameResult;
    }
}