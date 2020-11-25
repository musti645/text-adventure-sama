import { InteractionType } from '../interactions/interaction-type.enum';
import { Action } from './action.model';
/**
 * A OneTimeAction is only triggered once
 * Each subsequent trigger returns the same response.
 */
export class OneTimeAction extends Action {
    constructor() {
        super();
        this.setInteractionType(InteractionType.DO);
    }
    trigger() {
        if (this.WasTriggered) {
            return this.ResponseAfterUse;
        }
        this.WasTriggered = true;
        return this.getResponse();
    }
    reset() {
        this.WasTriggered = false;
    }
    getWasTriggered() {
        return this.WasTriggered;
    }
    setWasTriggered(triggered) {
        this.WasTriggered = triggered;
    }
    getResponseAfterUse() {
        return this.ResponseAfterUse;
    }
    setResponseAfterUse(response) {
        this.ResponseAfterUse = response;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25lLXRpbWUtYWN0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IkU6L0Rva3VtZW50ZS9SZXBvc2l0b3JpZXMvVGV4dEFkdmVudHVyZVNhbWEvdGV4dC1hZHZlbnR1cmUtc2FtYS9wcm9qZWN0cy90ZXh0LWFkdmVudHVyZS1zYW1hL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvYWN0aW9ucy9vbmUtdGltZS1hY3Rpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sYUFBYyxTQUFRLE1BQU07SUFJckM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE9BQU87UUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDaEM7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSxlQUFlO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRU0sZUFBZSxDQUFDLFNBQWtCO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxtQkFBbUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQUVNLG1CQUFtQixDQUFDLFFBQWdCO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7SUFDckMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW50ZXJhY3Rpb25UeXBlIH0gZnJvbSAnLi4vaW50ZXJhY3Rpb25zL2ludGVyYWN0aW9uLXR5cGUuZW51bSc7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vYWN0aW9uLm1vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBBIE9uZVRpbWVBY3Rpb24gaXMgb25seSB0cmlnZ2VyZWQgb25jZVxyXG4gKiBFYWNoIHN1YnNlcXVlbnQgdHJpZ2dlciByZXR1cm5zIHRoZSBzYW1lIHJlc3BvbnNlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9uZVRpbWVBY3Rpb24gZXh0ZW5kcyBBY3Rpb24ge1xyXG4gICAgcHJpdmF0ZSBXYXNUcmlnZ2VyZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIFJlc3BvbnNlQWZ0ZXJVc2U6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0SW50ZXJhY3Rpb25UeXBlKEludGVyYWN0aW9uVHlwZS5ETyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyaWdnZXIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5XYXNUcmlnZ2VyZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUmVzcG9uc2VBZnRlclVzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuV2FzVHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNwb25zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLldhc1RyaWdnZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXNUcmlnZ2VyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuV2FzVHJpZ2dlcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRXYXNUcmlnZ2VyZWQodHJpZ2dlcmVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5XYXNUcmlnZ2VyZWQgPSB0cmlnZ2VyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlc3BvbnNlQWZ0ZXJVc2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5SZXNwb25zZUFmdGVyVXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSZXNwb25zZUFmdGVyVXNlKHJlc3BvbnNlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlJlc3BvbnNlQWZ0ZXJVc2UgPSByZXNwb25zZTtcclxuICAgIH1cclxufVxyXG4iXX0=