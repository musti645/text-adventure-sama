import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { GatewayAction } from '../../models/actions/gateway-action.model';
import { BuilderError } from '../../models/errors/builder.error';

export class GatewayActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
    extends BaseActionBuilder<GatewayAction, ReturnBuilderType> {

    constructor(builder: ReturnBuilderType) {
        super(builder, new GatewayAction());
    }

    /**
     * Set the id of the scene, that this gateway leads to.
     */
    public setTargetSceneId(id?: number): this {
        if (id === undefined || id <= 0) {
            throw new EvalError('TargetSceneId Value has to be greater than 0.');
        }

        this.Action.setTargetSceneId(id);
        return this;
    }

    /**
     * Set the name of the scene, that this gateway leads to.
     * 
     * Use this, if you don't have the id of the scene you want as a target.
     */
    public setTargetSceneName(name: string): this {
        if (!name) {
            throw new EvalError('TargetSceneName Value is invalid.');
        }

        this.Action.setTargetSceneName(name.trim());
        return this;
    }

    /**
     * Called by the finish method.
     * 
     * DO NOT call this manually.
     */
    public onFinish(): void {
        if (!this.Action.getTargetSceneId() && !this.Action.getTargetSceneName()) {
            throw new BuilderError('Action creation could not be finished. SceneId and/or TargetSceneName were not set.');
        }
    }
}
