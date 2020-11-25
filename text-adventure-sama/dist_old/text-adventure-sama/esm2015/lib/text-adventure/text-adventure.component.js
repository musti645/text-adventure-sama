import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextInputType } from '../models/other/text-input.enum';
import { TextInput } from '../models/other/text-input.model';
import { InputParserService } from '../services/input-parser.service';
import { ClassificationTrainer } from '../services/classification-trainer.service';
import { GameResetEvent } from '../models/events/game-reset.event';
import { GameEndEvent } from '../models/events/game-end.event';
import { GameStartEvent } from '../models/events/game-start.event';
import { GameError } from '../models/errors/game.error';
/**
 * Main Component, that contains the input and output of the game.
 */
export class TextAdventureComponent {
    constructor(inputParserService) {
        this.inputParserService = inputParserService;
        this.OutputArray = [];
        this.IsLoading = false;
        this.UseTypewritingAnimation = true;
        this.TypewriterSpeed = 40;
        this.OnGameStartEvent = new EventEmitter();
        this.OnGameResetEvent = new EventEmitter();
        this.OnGameEndEvent = new EventEmitter();
        this.InputForm = new FormGroup({
            userInput: new FormControl({
                value: '',
                disabled: this.IsLoading
            }, [
                Validators.required
            ])
        });
        if (!this.ClassificationTrainer) {
            inputParserService.initialize(new ClassificationTrainer());
        }
        else {
            inputParserService.initialize(this.ClassificationTrainer);
        }
    }
    ngOnInit() {
        this.startLoading();
        if (!this.Game) {
            throw new GameError('Game not found.');
        }
        this.startGame();
    }
    OnSubmit() {
        this.startLoading();
        const inputString = this.userInput.value;
        if (!inputString) {
            this.stopLoading();
            return;
        }
        this.printInput(inputString);
        this.userInput.setValue('');
        const parseResult = this.inputParserService.parseInput(inputString);
        this.printOutput(parseResult.Result, parseResult.UseTypewriterAnimation).then(() => this.stopLoading());
    }
    OnGameReset() {
        this.OnGameResetEvent.emit(new GameResetEvent(this.Game));
    }
    OnGameEnd() {
        this.OnGameEndEvent.emit(new GameEndEvent(this.Game));
    }
    get userInput() {
        return this.InputForm.get('userInput');
    }
    startLoading() {
        this.IsLoading = true;
        this.userInput.disable();
    }
    stopLoading() {
        this.IsLoading = false;
        this.userInput.enable();
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    startGame() {
        this.inputParserService.setGame(this.Game);
        this.OnGameStartEvent.emit(new GameStartEvent());
        this.printOutput(this.Game.getTitle()).then(() => this.printOutput(this.Game.getIntroduction())).then(() => this.stopLoading());
    }
    printOutput(output, useTypewriteAnimationOnOutput = true) {
        return new Promise((outerResolve) => {
            if (useTypewriteAnimationOnOutput && this.UseTypewritingAnimation) {
                const outputLines = output.split('\r\n');
                // we create a promise chain, in order to avoid printing new lines written as '<br>'
                let outputPromise = new Promise((resolve) => resolve());
                for (const singleLine of outputLines) {
                    outputPromise = outputPromise.then(() => this.printLineAnimated(singleLine));
                }
                outputPromise = outputPromise.then(outerResolve);
            }
            else {
                output = output.split('\r\n').join('<br>');
                this.OutputArray.push(new TextInput(output, TextInputType.Output));
                outerResolve();
            }
        });
    }
    printLineAnimated(line) {
        return new Promise((resolve) => {
            this.OutputArray.push(new TextInput('', TextInputType.Output));
            // exit the recursion with the "resolve" function of the promise
            this.typewriteOutput(0, line, this.OutputArray, resolve);
        });
    }
    typewriteOutput(i, output, outputArray, resolveFunction) {
        if (i >= output.length) {
            resolveFunction();
        }
        const char = output.charAt(i);
        outputArray[outputArray.length - 1].Value += char;
        i++;
        setTimeout(() => {
            this.typewriteOutput(i, output, this.OutputArray, resolveFunction);
        }, this.TypewriterSpeed);
    }
    printInput(input) {
        this.OutputArray.push(new TextInput(input, TextInputType.UserInput));
    }
}
TextAdventureComponent.decorators = [
    { type: Component, args: [{
                selector: 'tas-text-adventure',
                template: "<div class=\"container-fluid text-adventure-root h-100 w-100\">\r\n  <div class=\"row output-container-wrapper\">\r\n    <div class=\"output-container\">\r\n      <table>\r\n        <tbody>\r\n          <tr *ngFor=\"let line of OutputArray; let index = i\"\r\n            [ngClass]=\"line.Type  === 'input'? 'input-line' : 'output-line'\">\r\n            <td [innerHTML]='line.Value'></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div class=\"row input-container-wrapper\">\r\n    <div class=\"row input-container\">\r\n      <form [formGroup]=\"InputForm\" (ngSubmit)=\"OnSubmit()\">\r\n        <div class=\"form-group\">\r\n          <input type=\"text\" class=\"form-control\" #input formControlName=\"userInput\" autofocus>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".text-adventure-root{background:#222;color:#ddd;font-family:Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace;height:100%;margin:0}.text-adventure-root .row{margin:0}.text-adventure-root .output-container-wrapper{display:flex;flex-direction:column-reverse;height:95%;overflow:hidden;padding:8px}.text-adventure-root .output-container-wrapper .output-container{display:flex;text-overflow:ellipsis}.text-adventure-root .output-container-wrapper .output-container .input-line{font-style:italic}.text-adventure-root .input-container-wrapper .input-container form .form-group input{background-color:#222;border-radius:0;border-top:1px solid #ddd;border-width:0;box-sizing:border-box;color:#ddd;padding:8px;width:100%}"]
            },] }
];
TextAdventureComponent.ctorParameters = () => [
    { type: InputParserService }
];
TextAdventureComponent.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['input', { static: true },] }],
    UseTypewritingAnimation: [{ type: Input }],
    TypewriterSpeed: [{ type: Input }],
    Game: [{ type: Input }],
    ClassificationTrainer: [{ type: Input }],
    OnGameStartEvent: [{ type: Output }],
    OnGameResetEvent: [{ type: Output }],
    OnGameEndEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hZHZlbnR1cmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkU6L0Rva3VtZW50ZS9SZXBvc2l0b3JpZXMvVGV4dEFkdmVudHVyZVNhbWEvdGV4dC1hZHZlbnR1cmUtc2FtYS9wcm9qZWN0cy90ZXh0LWFkdmVudHVyZS1zYW1hL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90ZXh0LWFkdmVudHVyZS90ZXh0LWFkdmVudHVyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBc0IsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXhEOztHQUVHO0FBTUgsTUFBTSxPQUFPLHNCQUFzQjtJQTRCakMsWUFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUF6QjFELGdCQUFXLEdBQWdCLEVBQUUsQ0FBQztRQUM5QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ1QsNEJBQXVCLEdBQUcsSUFB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O1lBeElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw4MUJBQThDOzthQUUvQzs7O1lBaEJRLGtCQUFrQjs7OzJCQWtCeEIsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7c0NBSW5DLEtBQUs7OEJBQ0wsS0FBSzttQkFFTCxLQUFLO29DQUNMLEtBQUs7K0JBRUwsTUFBTTsrQkFDTixNQUFNOzZCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVGV4dElucHV0VHlwZSB9IGZyb20gJy4uL21vZGVscy9vdGhlci90ZXh0LWlucHV0LmVudW0nO1xyXG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi9tb2RlbHMvb3RoZXIvdGV4dC1pbnB1dC5tb2RlbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi9tb2RlbHMvZ2FtZS5tb2RlbCc7XHJcbmltcG9ydCB7IEdhbWVCdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlci9nYW1lLmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBJbnB1dFBhcnNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbnB1dC1wYXJzZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsYXNzaWZpY2F0aW9uVHJhaW5lciB9IGZyb20gJy4uL3NlcnZpY2VzL2NsYXNzaWZpY2F0aW9uLXRyYWluZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdhbWVSZXNldEV2ZW50IH0gZnJvbSAnLi4vbW9kZWxzL2V2ZW50cy9nYW1lLXJlc2V0LmV2ZW50JztcclxuaW1wb3J0IHsgR2FtZUVuZEV2ZW50IH0gZnJvbSAnLi4vbW9kZWxzL2V2ZW50cy9nYW1lLWVuZC5ldmVudCc7XHJcbmltcG9ydCB7IEdhbWVTdGFydEV2ZW50IH0gZnJvbSAnLi4vbW9kZWxzL2V2ZW50cy9nYW1lLXN0YXJ0LmV2ZW50JztcclxuaW1wb3J0IHsgSW50ZXJhY3Rpb25UeXBlIH0gZnJvbSAnLi4vbW9kZWxzL2ludGVyYWN0aW9ucy9pbnRlcmFjdGlvbi10eXBlLmVudW0nO1xyXG5pbXBvcnQgeyBJQ2xhc3NpZmljYXRpb25UcmFpbmVyIH0gZnJvbSAnLi4vc2VydmljZXMvY2xhc3NpZmljYXRpb24tdHJhaW5lci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHYW1lRXJyb3IgfSBmcm9tICcuLi9tb2RlbHMvZXJyb3JzL2dhbWUuZXJyb3InO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gQ29tcG9uZW50LCB0aGF0IGNvbnRhaW5zIHRoZSBpbnB1dCBhbmQgb3V0cHV0IG9mIHRoZSBnYW1lLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0YXMtdGV4dC1hZHZlbnR1cmUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWFkdmVudHVyZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1hZHZlbnR1cmUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGV4dEFkdmVudHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIE91dHB1dEFycmF5OiBUZXh0SW5wdXRbXSA9IFtdO1xyXG4gIElzTG9hZGluZyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIFVzZVR5cGV3cml0aW5nQW5pbWF0aW9uID0gdHJ1ZTtcclxuICBASW5wdXQoKSBUeXBld3JpdGVyU3BlZWQgPSA0MDtcclxuXHJcbiAgQElucHV0KCkgR2FtZTogR2FtZTtcclxuICBASW5wdXQoKSBDbGFzc2lmaWNhdGlvblRyYWluZXI6IElDbGFzc2lmaWNhdGlvblRyYWluZXI7XHJcblxyXG4gIEBPdXRwdXQoKSBPbkdhbWVTdGFydEV2ZW50OiBFdmVudEVtaXR0ZXI8R2FtZVN0YXJ0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxHYW1lU3RhcnRFdmVudD4oKTtcclxuICBAT3V0cHV0KCkgT25HYW1lUmVzZXRFdmVudDogRXZlbnRFbWl0dGVyPEdhbWVSZXNldEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8R2FtZVJlc2V0RXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIE9uR2FtZUVuZEV2ZW50OiBFdmVudEVtaXR0ZXI8R2FtZUVuZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8R2FtZUVuZEV2ZW50PigpO1xyXG5cclxuICBHYW1lQnVpbGRlcjogR2FtZUJ1aWxkZXI7XHJcblxyXG4gIElucHV0Rm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cChcclxuICAgIHtcclxuICAgICAgdXNlcklucHV0OiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5Jc0xvYWRpbmdcclxuICAgICAgfSwgW1xyXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcclxuICAgICAgXSlcclxuICAgIH1cclxuICApO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlucHV0UGFyc2VyU2VydmljZTogSW5wdXRQYXJzZXJTZXJ2aWNlKSB7XHJcbiAgICBpZiAoIXRoaXMuQ2xhc3NpZmljYXRpb25UcmFpbmVyKSB7XHJcbiAgICAgIGlucHV0UGFyc2VyU2VydmljZS5pbml0aWFsaXplKG5ldyBDbGFzc2lmaWNhdGlvblRyYWluZXIoKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaW5wdXRQYXJzZXJTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5DbGFzc2lmaWNhdGlvblRyYWluZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YXJ0TG9hZGluZygpO1xyXG4gICAgaWYgKCF0aGlzLkdhbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEdhbWVFcnJvcignR2FtZSBub3QgZm91bmQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gIH1cclxuXHJcbiAgT25TdWJtaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YXJ0TG9hZGluZygpO1xyXG4gICAgY29uc3QgaW5wdXRTdHJpbmcgPSB0aGlzLnVzZXJJbnB1dC52YWx1ZTtcclxuICAgIGlmICghaW5wdXRTdHJpbmcpIHtcclxuICAgICAgdGhpcy5zdG9wTG9hZGluZygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnByaW50SW5wdXQoaW5wdXRTdHJpbmcpO1xyXG4gICAgdGhpcy51c2VySW5wdXQuc2V0VmFsdWUoJycpO1xyXG5cclxuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gdGhpcy5pbnB1dFBhcnNlclNlcnZpY2UucGFyc2VJbnB1dChpbnB1dFN0cmluZyk7XHJcblxyXG4gICAgdGhpcy5wcmludE91dHB1dChwYXJzZVJlc3VsdC5SZXN1bHQsIHBhcnNlUmVzdWx0LlVzZVR5cGV3cml0ZXJBbmltYXRpb24pLnRoZW4oKCkgPT4gdGhpcy5zdG9wTG9hZGluZygpKTtcclxuICB9XHJcblxyXG4gIE9uR2FtZVJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5PbkdhbWVSZXNldEV2ZW50LmVtaXQobmV3IEdhbWVSZXNldEV2ZW50KHRoaXMuR2FtZSkpO1xyXG4gIH1cclxuXHJcbiAgT25HYW1lRW5kKCk6IHZvaWQge1xyXG4gICAgdGhpcy5PbkdhbWVFbmRFdmVudC5lbWl0KG5ldyBHYW1lRW5kRXZlbnQodGhpcy5HYW1lKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCB1c2VySW5wdXQoKTogRm9ybUNvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuSW5wdXRGb3JtLmdldCgndXNlcklucHV0JykgYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0TG9hZGluZygpOiB2b2lkIHtcclxuICAgIHRoaXMuSXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudXNlcklucHV0LmRpc2FibGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcExvYWRpbmcoKTogdm9pZCB7XHJcbiAgICB0aGlzLklzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy51c2VySW5wdXQuZW5hYmxlKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0R2FtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5wdXRQYXJzZXJTZXJ2aWNlLnNldEdhbWUodGhpcy5HYW1lKTtcclxuICAgIHRoaXMuT25HYW1lU3RhcnRFdmVudC5lbWl0KG5ldyBHYW1lU3RhcnRFdmVudCgpKTtcclxuICAgIHRoaXMucHJpbnRPdXRwdXQodGhpcy5HYW1lLmdldFRpdGxlKCkpLnRoZW4oKCkgPT4gdGhpcy5wcmludE91dHB1dCh0aGlzLkdhbWUuZ2V0SW50cm9kdWN0aW9uKCkpKS50aGVuKCgpID0+IHRoaXMuc3RvcExvYWRpbmcoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByaW50T3V0cHV0KG91dHB1dDogc3RyaW5nLCB1c2VUeXBld3JpdGVBbmltYXRpb25Pbk91dHB1dDogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigob3V0ZXJSZXNvbHZlKSA9PiB7XHJcbiAgICAgIGlmICh1c2VUeXBld3JpdGVBbmltYXRpb25Pbk91dHB1dCAmJiB0aGlzLlVzZVR5cGV3cml0aW5nQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0TGluZXMgPSBvdXRwdXQuc3BsaXQoJ1xcclxcbicpO1xyXG4gICAgICAgIC8vIHdlIGNyZWF0ZSBhIHByb21pc2UgY2hhaW4sIGluIG9yZGVyIHRvIGF2b2lkIHByaW50aW5nIG5ldyBsaW5lcyB3cml0dGVuIGFzICc8YnI+J1xyXG4gICAgICAgIGxldCBvdXRwdXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlc29sdmUoKSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBzaW5nbGVMaW5lIG9mIG91dHB1dExpbmVzKSB7XHJcbiAgICAgICAgICBvdXRwdXRQcm9taXNlID0gb3V0cHV0UHJvbWlzZS50aGVuKCgpID0+IHRoaXMucHJpbnRMaW5lQW5pbWF0ZWQoc2luZ2xlTGluZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRwdXRQcm9taXNlID0gb3V0cHV0UHJvbWlzZS50aGVuKG91dGVyUmVzb2x2ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnNwbGl0KCdcXHJcXG4nKS5qb2luKCc8YnI+Jyk7XHJcbiAgICAgICAgdGhpcy5PdXRwdXRBcnJheS5wdXNoKG5ldyBUZXh0SW5wdXQob3V0cHV0LCBUZXh0SW5wdXRUeXBlLk91dHB1dCkpO1xyXG4gICAgICAgIG91dGVyUmVzb2x2ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJpbnRMaW5lQW5pbWF0ZWQobGluZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgdGhpcy5PdXRwdXRBcnJheS5wdXNoKG5ldyBUZXh0SW5wdXQoJycsIFRleHRJbnB1dFR5cGUuT3V0cHV0KSk7XHJcbiAgICAgIC8vIGV4aXQgdGhlIHJlY3Vyc2lvbiB3aXRoIHRoZSBcInJlc29sdmVcIiBmdW5jdGlvbiBvZiB0aGUgcHJvbWlzZVxyXG4gICAgICB0aGlzLnR5cGV3cml0ZU91dHB1dCgwLCBsaW5lLCB0aGlzLk91dHB1dEFycmF5LCByZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0eXBld3JpdGVPdXRwdXQoaTogbnVtYmVyLCBvdXRwdXQ6IHN0cmluZywgb3V0cHV0QXJyYXk6IFRleHRJbnB1dFtdLCByZXNvbHZlRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmIChpID49IG91dHB1dC5sZW5ndGgpIHtcclxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjaGFyID0gb3V0cHV0LmNoYXJBdChpKTtcclxuICAgIG91dHB1dEFycmF5W291dHB1dEFycmF5Lmxlbmd0aCAtIDFdLlZhbHVlICs9IGNoYXI7XHJcbiAgICBpKys7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy50eXBld3JpdGVPdXRwdXQoaSwgb3V0cHV0LCB0aGlzLk91dHB1dEFycmF5LCByZXNvbHZlRnVuY3Rpb24pO1xyXG4gICAgfSwgdGhpcy5UeXBld3JpdGVyU3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmludElucHV0KGlucHV0OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuT3V0cHV0QXJyYXkucHVzaChuZXcgVGV4dElucHV0KGlucHV0LCBUZXh0SW5wdXRUeXBlLlVzZXJJbnB1dCkpO1xyXG4gIH1cclxufVxyXG4iXX0=