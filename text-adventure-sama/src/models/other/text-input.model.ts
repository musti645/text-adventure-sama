import { TextInputType } from './text-input-type.enum';

export class TextInput {
    Id: number;
    Value: string;
    Type: TextInputType;

    constructor(Value: string, Type: TextInputType, Id: number) {
        this.Value = Value;
        this.Type = Type;
        this.Id = Id;
    }
}
