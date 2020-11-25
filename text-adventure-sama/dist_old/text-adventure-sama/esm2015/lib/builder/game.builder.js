import { Game } from '../models/game.model';
import { InventoryBuilder } from './inventory.builder';
import { BuilderError } from '../models/errors/builder.error';
import { SceneBuilder } from './scene.builder';
import { BaseBuilder } from './base.builder';
import { IDGeneratorService } from '../services/id-generator.service';
import { CommandBuilder } from './command.builder';
/**
 * Use this class to chain the game building process.
 * Once your Game is build completely, call the 'build' method.
 */
export class GameBuilder extends BaseBuilder {
    constructor() {
        super();
        this.Game = new Game();
        this.IdGeneratorService = new IDGeneratorService();
    }
    addInventory() {
        return new InventoryBuilder(this, this.Game);
    }
    addScene(id) {
        return new SceneBuilder(this, this.Game, id);
    }
    addCommand() {
        return new CommandBuilder(this);
    }
    addCommandToBuilder(command) {
        if (!command) {
            throw new BuilderError('Command was undefined');
        }
        this.Game.getCommands().push(command);
        return this;
    }
    removeExistingCommands() {
        this.Game.setCommands([]);
        return this;
    }
    setTitle(title) {
        if (!title) {
            throw new EvalError('Title was undefined.');
        }
        this.Game.setTitle(title);
        return this;
    }
    setIntroduction(intro) {
        if (!intro) {
            throw new EvalError('Introduction was undefined.');
        }
        this.Game.setIntroduction(intro);
        return this;
    }
    setItemNotFoundInInventoryResponse(response) {
        if (!response) {
            throw new EvalError('ItemNotFoundInInventoryResponse was undefined.');
        }
        this.Game.setItemNotFoundInInventoryResponse(response);
        return this;
    }
    setItemAddedToInventoryResponse(response) {
        if (!response) {
            throw new EvalError('ItemAddedToInventoryResponse was undefined.');
        }
        this.Game.setItemAddedToInventoryResponse(response);
        return this;
    }
    setGatewayTargetNotFoundResponse(response) {
        if (!response) {
            throw new EvalError('GatewayTargetNotFoundResponse was undefined.');
        }
        this.Game.setGatewayTargetNotFoundResponse(response);
        return this;
    }
    setInventoryEmptyResponse(response) {
        if (!response) {
            throw new EvalError('InventoryEmptyResponse was undefined.');
        }
        this.Game.setInventoryEmptyResponse(response);
        return this;
    }
    finish() {
        if (!this.Game.getTitle()) {
            throw new BuilderError('Game creation could not be finished. Title was not set.');
        }
        if (!this.Game.getIntroduction()) {
            throw new BuilderError('Game creation could not be finished. Introduction was not set.');
        }
        if (!this.Game.getItemAddedToInventoryResponse()) {
            throw new BuilderError('Game creation could not be finished. ItemAddedToInventoryResponse was not set.');
        }
        if (!this.Game.getItemNotFoundInInventoryResponse()) {
            throw new BuilderError('Game creation could not be finished. ItemNotFoundInInventoryResponse was not set.');
        }
        if (!this.Game.getGatewayTargetNotFoundResponse()) {
            throw new BuilderError('Game creation could not be finished. GatewayTargetNotFoundResponse was not set.');
        }
        if (!this.Game.getInventoryEmptyResponse()) {
            throw new BuilderError('Game creation could not be finished. InventoryEmptyResponse was not set.');
        }
        if (this.Game.getScenesCount() <= 0) {
            throw new BuilderError('Game creation could not be finished. No Scenes were found.');
        }
        this.generateUnassignedIds();
        return this.Game;
    }
    generateUnassignedIds() {
        this.IdGeneratorService.generateIDs(this.Game);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IkU6L0Rva3VtZW50ZS9SZXBvc2l0b3JpZXMvVGV4dEFkdmVudHVyZVNhbWEvdGV4dC1hZHZlbnR1cmUtc2FtYS9wcm9qZWN0cy90ZXh0LWFkdmVudHVyZS1zYW1hL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9idWlsZGVyL2dhbWUuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5EOzs7R0FHRztBQUNILE1BQU0sT0FBTyxXQUFZLFNBQVEsV0FBVztJQUl4QztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVNLFlBQVk7UUFDZixPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sUUFBUSxDQUFDLEVBQVc7UUFDdkIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8s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Q0FBQyxDQUFDO1NBQy9HO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsRUFBRTtZQUMvQyxNQUFNLElBQUksWUFBWSxDQUFDLGlGQUFpRixDQUFDLENBQUM7U0FDN0c7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxZQUFZLENBQUMsMEVBQTBFLENBQUMsQ0FBQztTQUN0RztRQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLFlBQVksQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQ3hGO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFHUyxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL21vZGVscy9nYW1lLm1vZGVsJztcclxuaW1wb3J0IHsgSW52ZW50b3J5QnVpbGRlciB9IGZyb20gJy4vaW52ZW50b3J5LmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBCdWlsZGVyRXJyb3IgfSBmcm9tICcuLi9tb2RlbHMvZXJyb3JzL2J1aWxkZXIuZXJyb3InO1xyXG5pbXBvcnQgeyBTY2VuZUJ1aWxkZXIgfSBmcm9tICcuL3NjZW5lLmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBCYXNlQnVpbGRlciB9IGZyb20gJy4vYmFzZS5idWlsZGVyJztcclxuaW1wb3J0IHsgSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1hbmQubW9kZWwnO1xyXG5pbXBvcnQgeyBDb21tYW5kQ29udGFpbmluZ0J1aWxkZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tbWFuZC1jb250YWluaW5nLmJ1aWxkZXInO1xyXG5pbXBvcnQgeyBDb21tYW5kQnVpbGRlciB9IGZyb20gJy4vY29tbWFuZC5idWlsZGVyJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjaGFpbiB0aGUgZ2FtZSBidWlsZGluZyBwcm9jZXNzLlxyXG4gKiBPbmNlIHlvdXIgR2FtZSBpcyBidWlsZCBjb21wbGV0ZWx5LCBjYWxsIHRoZSAnYnVpbGQnIG1ldGhvZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lQnVpbGRlciBleHRlbmRzIEJhc2VCdWlsZGVyIGltcGxlbWVudHMgQ29tbWFuZENvbnRhaW5pbmdCdWlsZGVyIHtcclxuICAgIHByb3RlY3RlZCBHYW1lOiBHYW1lO1xyXG4gICAgcHVibGljIElkR2VuZXJhdG9yU2VydmljZTogSURHZW5lcmF0b3JTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5HYW1lID0gbmV3IEdhbWUoKTtcclxuICAgICAgICB0aGlzLklkR2VuZXJhdG9yU2VydmljZSA9IG5ldyBJREdlbmVyYXRvclNlcnZpY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkSW52ZW50b3J5KCk6IEludmVudG9yeUJ1aWxkZXIge1xyXG4gICAgICAgIHJldHVybiBuZXcgSW52ZW50b3J5QnVpbGRlcih0aGlzLCB0aGlzLkdhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTY2VuZShpZD86IG51bWJlcik6IFNjZW5lQnVpbGRlciB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTY2VuZUJ1aWxkZXIodGhpcywgdGhpcy5HYW1lLCBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENvbW1hbmQoKTogQ29tbWFuZEJ1aWxkZXI8R2FtZUJ1aWxkZXI+IHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1hbmRCdWlsZGVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbW1hbmRUb0J1aWxkZXIoY29tbWFuZDogQ29tbWFuZCk6IHRoaXMge1xyXG4gICAgICAgIGlmICghY29tbWFuZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQnVpbGRlckVycm9yKCdDb21tYW5kIHdhcyB1bmRlZmluZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZS5nZXRDb21tYW5kcygpLnB1c2goY29tbWFuZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV4aXN0aW5nQ29tbWFuZHMoKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5HYW1lLnNldENvbW1hbmRzKFtdKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGl0bGUodGl0bGU6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgICAgIGlmICghdGl0bGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEV2YWxFcnJvcignVGl0bGUgd2FzIHVuZGVmaW5lZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZS5zZXRUaXRsZSh0aXRsZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludHJvZHVjdGlvbihpbnRybzogc3RyaW5nKTogdGhpcyB7XHJcbiAgICAgICAgaWYgKCFpbnRybykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXZhbEVycm9yKCdJbnRyb2R1Y3Rpb24gd2FzIHVuZGVmaW5lZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZS5zZXRJbnRyb2R1Y3Rpb24oaW50cm8pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJdGVtTm90Rm91bmRJbkludmVudG9yeVJlc3BvbnNlKHJlc3BvbnNlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ0l0ZW1Ob3RGb3VuZEluSW52ZW50b3J5UmVzcG9uc2Ugd2FzIHVuZGVmaW5lZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZS5zZXRJdGVtTm90Rm91bmRJbkludmVudG9yeVJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXRlbUFkZGVkVG9JbnZlbnRvcnlSZXNwb25zZShyZXNwb25zZTogc3RyaW5nKTogdGhpcyB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXZhbEVycm9yKCdJdGVtQWRkZWRUb0ludmVudG9yeVJlc3BvbnNlIHdhcyB1bmRlZmluZWQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkdhbWUuc2V0SXRlbUFkZGVkVG9JbnZlbnRvcnlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdhdGV3YXlUYXJnZXROb3RGb3VuZFJlc3BvbnNlKHJlc3BvbnNlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ0dhdGV3YXlUYXJnZXROb3RGb3VuZFJlc3BvbnNlIHdhcyB1bmRlZmluZWQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkdhbWUuc2V0R2F0ZXdheVRhcmdldE5vdEZvdW5kUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbnZlbnRvcnlFbXB0eVJlc3BvbnNlKHJlc3BvbnNlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFdmFsRXJyb3IoJ0ludmVudG9yeUVtcHR5UmVzcG9uc2Ugd2FzIHVuZGVmaW5lZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZS5zZXRJbnZlbnRvcnlFbXB0eVJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGZpbmlzaCgpOiBHYW1lIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWUuZ2V0VGl0bGUoKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQnVpbGRlckVycm9yKCdHYW1lIGNyZWF0aW9uIGNvdWxkIG5vdCBiZSBmaW5pc2hlZC4gVGl0bGUgd2FzIG5vdCBzZXQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZS5nZXRJbnRyb2R1Y3Rpb24oKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQnVpbGRlckVycm9yKCdHYW1lIGNyZWF0aW9uIGNvdWxkIG5vdCBiZSBmaW5pc2hlZC4gSW50cm9kdWN0aW9uIHdhcyBub3Qgc2V0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWUuZ2V0SXRlbUFkZGVkVG9JbnZlbnRvcnlSZXNwb25zZSgpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCdWlsZGVyRXJyb3IoJ0dhbWUgY3JlYXRpb24gY291bGQgbm90IGJlIGZpbmlzaGVkLiBJdGVtQWRkZWRUb0ludmVudG9yeVJlc3BvbnNlIHdhcyBub3Qgc2V0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWUuZ2V0SXRlbU5vdEZvdW5kSW5JbnZlbnRvcnlSZXNwb25zZSgpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCdWlsZGVyRXJyb3IoJ0dhbWUgY3JlYXRpb24gY291bGQgbm90IGJlIGZpbmlzaGVkLiBJdGVtTm90Rm91bmRJbkludmVudG9yeVJlc3BvbnNlIHdhcyBub3Qgc2V0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWUuZ2V0R2F0ZXdheVRhcmdldE5vdEZvdW5kUmVzcG9uc2UoKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQnVpbGRlckVycm9yKCdHYW1lIGNyZWF0aW9uIGNvdWxkIG5vdCBiZSBmaW5pc2hlZC4gR2F0ZXdheVRhcmdldE5vdEZvdW5kUmVzcG9uc2Ugd2FzIG5vdCBzZXQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZS5nZXRJbnZlbnRvcnlFbXB0eVJlc3BvbnNlKCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJ1aWxkZXJFcnJvcignR2FtZSBjcmVhdGlvbiBjb3VsZCBub3QgYmUgZmluaXNoZWQuIEludmVudG9yeUVtcHR5UmVzcG9uc2Ugd2FzIG5vdCBzZXQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5HYW1lLmdldFNjZW5lc0NvdW50KCkgPD0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQnVpbGRlckVycm9yKCdHYW1lIGNyZWF0aW9uIGNvdWxkIG5vdCBiZSBmaW5pc2hlZC4gTm8gU2NlbmVzIHdlcmUgZm91bmQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdlbmVyYXRlVW5hc3NpZ25lZElkcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdhbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZVVuYXNzaWduZWRJZHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5JZEdlbmVyYXRvclNlcnZpY2UuZ2VuZXJhdGVJRHModGhpcy5HYW1lKTtcclxuICAgIH1cclxufVxyXG4iXX0=