import { Inventory } from '../models/inventory.model';
import { BaseBuilder } from './base.builder';
import { ItemBuilder } from './item.builder';
import { BuilderError } from '../models/errors/builder.error';
export class InventoryBuilder extends BaseBuilder {
    constructor(gameBuilder, game) {
        super();
        this.GameBuilder = gameBuilder;
        this.Game = game;
        this.Inventory = new Inventory();
    }
    addItem(item) {
        return new ItemBuilder(this, item);
    }
    addItemToBuilder(item) {
        if (!item) {
            throw new BuilderError('Could not add Item to Inventory. Item was not set.');
        }
        this.Inventory.addItem(item);
        if (item.getID()) {
            this.GameBuilder.IdGeneratorService.addItemId(item);
        }
    }
    finish() {
        this.Game.setInventory(this.Inventory);
        return this.GameBuilder;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiRTovRG9rdW1lbnRlL1JlcG9zaXRvcmllcy9UZXh0QWR2ZW50dXJlU2FtYS90ZXh0LWFkdmVudHVyZS1zYW1hL3Byb2plY3RzL3RleHQtYWR2ZW50dXJlLXNhbWEvc3JjLyIsInNvdXJjZXMiOlsibGliL2J1aWxkZXIvaW52ZW50b3J5LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTlELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxXQUFXO0lBSzdDLFlBQVksV0FBd0IsRUFBRSxJQUFVO1FBQzVDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBaUI7UUFDNUIsT0FBTyxJQUFJLFdBQVcsQ0FBbUIsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFnQjtRQUM3QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxJQUFJLFlBQVksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFHTSxNQUFNO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQnVpbGRlciB9IGZyb20gJy4vZ2FtZS5idWlsZGVyJztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL21vZGVscy9nYW1lLm1vZGVsJztcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSAnLi4vbW9kZWxzL2ludmVudG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IEluR2FtZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvSXRlbS5tb2RlbCc7XHJcbmltcG9ydCB7IEJhc2VCdWlsZGVyIH0gZnJvbSAnLi9iYXNlLmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBJdGVtQ29udGFpbmluZ0J1aWxkZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvaXRlbS1jb250YWluaW5nLmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBJdGVtQnVpbGRlciB9IGZyb20gJy4vaXRlbS5idWlsZGVyJztcclxuaW1wb3J0IHsgQnVpbGRlckVycm9yIH0gZnJvbSAnLi4vbW9kZWxzL2Vycm9ycy9idWlsZGVyLmVycm9yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnZlbnRvcnlCdWlsZGVyIGV4dGVuZHMgQmFzZUJ1aWxkZXIgaW1wbGVtZW50cyBJdGVtQ29udGFpbmluZ0J1aWxkZXIge1xyXG4gICAgcHJpdmF0ZSBHYW1lQnVpbGRlcjogR2FtZUJ1aWxkZXI7XHJcbiAgICBwcml2YXRlIEdhbWU6IEdhbWU7XHJcbiAgICBwcm90ZWN0ZWQgSW52ZW50b3J5OiBJbnZlbnRvcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZUJ1aWxkZXI6IEdhbWVCdWlsZGVyLCBnYW1lOiBHYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkdhbWVCdWlsZGVyID0gZ2FtZUJ1aWxkZXI7XHJcbiAgICAgICAgdGhpcy5HYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLkludmVudG9yeSA9IG5ldyBJbnZlbnRvcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkSXRlbShpdGVtPzogSW5HYW1lSXRlbSk6IEl0ZW1CdWlsZGVyPEludmVudG9yeUJ1aWxkZXI+IHtcclxuICAgICAgICByZXR1cm4gbmV3IEl0ZW1CdWlsZGVyPEludmVudG9yeUJ1aWxkZXI+KHRoaXMsIGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW1Ub0J1aWxkZXIoaXRlbTogSW5HYW1lSXRlbSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQnVpbGRlckVycm9yKCdDb3VsZCBub3QgYWRkIEl0ZW0gdG8gSW52ZW50b3J5LiBJdGVtIHdhcyBub3Qgc2V0LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkludmVudG9yeS5hZGRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIGlmIChpdGVtLmdldElEKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5HYW1lQnVpbGRlci5JZEdlbmVyYXRvclNlcnZpY2UuYWRkSXRlbUlkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGZpbmlzaCgpOiBHYW1lQnVpbGRlciB7XHJcbiAgICAgICAgdGhpcy5HYW1lLnNldEludmVudG9yeSh0aGlzLkludmVudG9yeSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2FtZUJ1aWxkZXI7XHJcbiAgICB9XHJcbn1cclxuIl19