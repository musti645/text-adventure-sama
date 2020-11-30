import { Command } from './command.model';

describe('Command', () => {
    let command: Command;
    let responseFunctionResponse = 'responseFunctionResponse';

    beforeEach(() => {
        command = new Command();
        command.setResponse('response');
        command.setResponseFunction(() => responseFunctionResponse);
    });

    it('#activate should return the Response, when Response is set', () => {
        expect(command.activate()).toBe(command.getResponse());
    });
    
    it('#activate should return call the ResponseFunction, when the Response is not set', () => {
        command.setResponse(undefined);
        expect(command.activate()).toBe(responseFunctionResponse);
    });
});