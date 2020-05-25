import { TextInputType } from './text-input.enum';

export class TextInput {
    Value: string;
    Type: TextInputType;

    constructor(Value: string, Type: TextInputType) {
        this.Value = Value;
        this.Type = Type;
    }
}
