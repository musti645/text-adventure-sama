export class TaggedToken {
    token: string;
    tag: string;
    distance: number;

    constructor(token?: string, tag?: string) {
        this.token = token;
        this.tag = tag;
    }
}
