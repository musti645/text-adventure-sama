export class ParseInputResult {
    public Result: string;
    public UseTypewriterAnimation: boolean;
    public IsEndGameResult: boolean;
    public IsResetGameResult: boolean;
    public IsClearOutputResult: boolean;

    constructor(result: string,
        typewriteAnimation: boolean = true,
        isEndGameResult: boolean = false,
        isResetGameResult: boolean = false,
        isClearOutputResult: boolean = false) {
        this.Result = result;
        this.UseTypewriterAnimation = typewriteAnimation;
        this.IsEndGameResult = isEndGameResult;
        this.IsResetGameResult = isResetGameResult;
        this.IsClearOutputResult = isClearOutputResult;
    }
}
