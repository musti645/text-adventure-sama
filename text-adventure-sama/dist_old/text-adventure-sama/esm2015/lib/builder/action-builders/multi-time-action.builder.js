import { BaseActionBuilder } from './base-action.builder';
import { MultiTimeAction } from '../../models/actions/multi-time-action.model';
import { InteractionType } from '../../models/interactions/interaction-type.enum';
import { BuilderError } from '../../models/errors/builder.error';
export class MultiTimeActionBuilder extends BaseActionBuilder {
    constructor(builder) {
        super(builder, new MultiTimeAction());
    }
    setUsagesLeft(count) {
        if (count === undefined || count <= 0) {
            throw new EvalError('UsagesLeft Value has to be greater than 0.');
        }
        if (this.Action.getMaximumUsages() && this.Action.getMaximumUsages() < count) {
            throw new EvalError('UsagesLeft Value has to be less than or equal to MaximumUsages Value.');
        }
        this.Action.setUsagesLeft(count);
        return this;
    }
    setInteractionType(type) {
        if (!type || !Object.values(InteractionType).includes(type)) {
            throw new EvalError('InteractionType not set.');
        }
        this.Action.setInteractionType(type);
        return this;
    }
    setMaximumUsages(count) {
        if (count === undefined || count <= 0) {
            throw new EvalError('MaximumUsages Value has to be greater than 0.');
        }
        if (this.Action.getUsagesLeft() !== undefined &&
            this.Action.getUsagesLeft() > count) {
            throw new EvalError('MaximumUsages Value has to be greater than or equal to UsagesLeft Value.');
        }
        if (this.Action.getResponses() &&
            this.Action.getResponses().length !== count) {
            throw new EvalError('MaximumUsages Value has to match the Amount of Responses.');
        }
        this.Action.setMaximumUsages(count);
        return this;
    }
    setResponses(responses) {
        if (!responses) {
            throw new EvalError('Invalid Value for Responses. Has to be an Array of Strings.');
        }
        if (responses.length === 0) {
            throw new EvalError('Responses Array may not be empty.');
        }
        this.Action.setResponses(responses);
        return this;
    }
    onFinish() {
        if (!this.Action.getUsagesLeft()) {
            throw new BuilderError('Action creation could not be finished. UsagesLeft was not set.');
        }
        if (!this.Action.getMaximumUsages()) {
            throw new BuilderError('Action creation could not be finished. MaximumUsages was not set.');
        }
        if (!this.Action.getResponses()) {
            throw new BuilderError('Action creation could not be finished. Responses Array was not set.');
        }
        if (!this.Action.getInteractionType()) {
            throw new BuilderError('Action creation could not be finished. InteractionType was not set.');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktdGltZS1hY3Rpb24uYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9Eb2t1bWVudGUvUmVwb3NpdG9yaWVzL1RleHRBZHZlbnR1cmVTYW1hL3RleHQtYWR2ZW50dXJlLXNhbWEvcHJvamVjdHMvdGV4dC1hZHZlbnR1cmUtc2FtYS9zcmMvIiwic291cmNlcyI6WyJsaWIvYnVpbGRlci9hY3Rpb24tYnVpbGRlcnMvbXVsdGktdGltZS1hY3Rpb24uYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRSxNQUFNLE9BQU8sc0JBQ1QsU0FBUSxpQkFBcUQ7SUFFN0QsWUFBWSxPQUEwQjtRQUNsQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQWE7UUFDOUIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEtBQUssRUFBRTtZQUMxRSxNQUFNLElBQUksU0FBUyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7U0FDaEc7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR00sa0JBQWtCLENBQUMsSUFBcUI7UUFDM0MsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pELE1BQU0sSUFBSSxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUNuRDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQWE7UUFDakMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLFNBQVM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxLQUFLLEVBQUU7WUFDckMsTUFBTSxJQUFJLFNBQVMsQ0FBQywwRUFBMEUsQ0FBQyxDQUFDO1NBQ25HO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDN0MsTUFBTSxJQUFJLFNBQVMsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQ3BGO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sWUFBWSxDQUFDLFNBQW1CO1FBQ25DLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixNQUFNLElBQUksU0FBUyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7U0FDdEY7UUFFRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxJQUFJLFlBQVksQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1NBQzVGO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNqQyxNQUFNLElBQUksWUFBWSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7U0FDL0Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM3QixNQUFNLElBQUksWUFBWSxDQUFDLHFFQUFxRSxDQUFDLENBQUM7U0FDakc7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQ25DLE1BQU0sSUFBSSxZQUFZLENBQUMscUVBQXFFLENBQUMsQ0FBQztTQUNqRztJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VBY3Rpb25CdWlsZGVyIH0gZnJvbSAnLi9iYXNlLWFjdGlvbi5idWlsZGVyJztcclxuaW1wb3J0IHsgQWN0aW9uQ29udGFpbmluZ0J1aWxkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FjdGlvbi1jb250YWluaW5nLmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBNdWx0aVRpbWVBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvYWN0aW9ucy9tdWx0aS10aW1lLWFjdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEludGVyYWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbnRlcmFjdGlvbnMvaW50ZXJhY3Rpb24tdHlwZS5lbnVtJztcclxuaW1wb3J0IHsgQnVpbGRlckVycm9yIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Vycm9ycy9idWlsZGVyLmVycm9yJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTXVsdGlUaW1lQWN0aW9uQnVpbGRlcjxSZXR1cm5CdWlsZGVyVHlwZSBleHRlbmRzIEFjdGlvbkNvbnRhaW5pbmdCdWlsZGVyPlxyXG4gICAgZXh0ZW5kcyBCYXNlQWN0aW9uQnVpbGRlcjxNdWx0aVRpbWVBY3Rpb24sIFJldHVybkJ1aWxkZXJUeXBlPiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYnVpbGRlcjogUmV0dXJuQnVpbGRlclR5cGUpIHtcclxuICAgICAgICBzdXBlcihidWlsZGVyLCBuZXcgTXVsdGlUaW1lQWN0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVc2FnZXNMZWZ0KGNvdW50OiBudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICBpZiAoY291bnQgPT09IHVuZGVmaW5lZCB8fCBjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ1VzYWdlc0xlZnQgVmFsdWUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQWN0aW9uLmdldE1heGltdW1Vc2FnZXMoKSAmJiB0aGlzLkFjdGlvbi5nZXRNYXhpbXVtVXNhZ2VzKCkgPCBjb3VudCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXZhbEVycm9yKCdVc2FnZXNMZWZ0IFZhbHVlIGhhcyB0byBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gTWF4aW11bVVzYWdlcyBWYWx1ZS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQWN0aW9uLnNldFVzYWdlc0xlZnQoY291bnQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0SW50ZXJhY3Rpb25UeXBlKHR5cGU6IEludGVyYWN0aW9uVHlwZSk6IHRoaXMge1xyXG4gICAgICAgIGlmICghdHlwZSB8fCAhT2JqZWN0LnZhbHVlcyhJbnRlcmFjdGlvblR5cGUpLmluY2x1ZGVzKHR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ0ludGVyYWN0aW9uVHlwZSBub3Qgc2V0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5BY3Rpb24uc2V0SW50ZXJhY3Rpb25UeXBlKHR5cGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNYXhpbXVtVXNhZ2VzKGNvdW50OiBudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICBpZiAoY291bnQgPT09IHVuZGVmaW5lZCB8fCBjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ01heGltdW1Vc2FnZXMgVmFsdWUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQWN0aW9uLmdldFVzYWdlc0xlZnQoKSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uLmdldFVzYWdlc0xlZnQoKSA+IGNvdW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ01heGltdW1Vc2FnZXMgVmFsdWUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBVc2FnZXNMZWZ0IFZhbHVlLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQWN0aW9uLmdldFJlc3BvbnNlcygpICYmXHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uLmdldFJlc3BvbnNlcygpLmxlbmd0aCAhPT0gY291bnQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEV2YWxFcnJvcignTWF4aW11bVVzYWdlcyBWYWx1ZSBoYXMgdG8gbWF0Y2ggdGhlIEFtb3VudCBvZiBSZXNwb25zZXMuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFjdGlvbi5zZXRNYXhpbXVtVXNhZ2VzKGNvdW50KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UmVzcG9uc2VzKHJlc3BvbnNlczogc3RyaW5nW10pOiB0aGlzIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXZhbEVycm9yKCdJbnZhbGlkIFZhbHVlIGZvciBSZXNwb25zZXMuIEhhcyB0byBiZSBhbiBBcnJheSBvZiBTdHJpbmdzLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEV2YWxFcnJvcignUmVzcG9uc2VzIEFycmF5IG1heSBub3QgYmUgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFjdGlvbi5zZXRSZXNwb25zZXMocmVzcG9uc2VzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25GaW5pc2goKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkFjdGlvbi5nZXRVc2FnZXNMZWZ0KCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJ1aWxkZXJFcnJvcignQWN0aW9uIGNyZWF0aW9uIGNvdWxkIG5vdCBiZSBmaW5pc2hlZC4gVXNhZ2VzTGVmdCB3YXMgbm90IHNldC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5BY3Rpb24uZ2V0TWF4aW11bVVzYWdlcygpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCdWlsZGVyRXJyb3IoJ0FjdGlvbiBjcmVhdGlvbiBjb3VsZCBub3QgYmUgZmluaXNoZWQuIE1heGltdW1Vc2FnZXMgd2FzIG5vdCBzZXQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuQWN0aW9uLmdldFJlc3BvbnNlcygpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCdWlsZGVyRXJyb3IoJ0FjdGlvbiBjcmVhdGlvbiBjb3VsZCBub3QgYmUgZmluaXNoZWQuIFJlc3BvbnNlcyBBcnJheSB3YXMgbm90IHNldC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5BY3Rpb24uZ2V0SW50ZXJhY3Rpb25UeXBlKCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJ1aWxkZXJFcnJvcignQWN0aW9uIGNyZWF0aW9uIGNvdWxkIG5vdCBiZSBmaW5pc2hlZC4gSW50ZXJhY3Rpb25UeXBlIHdhcyBub3Qgc2V0LicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19