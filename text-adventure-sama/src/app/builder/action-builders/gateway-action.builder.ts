import { BuilderError } from 'src/app/models/errors/builder.error';
import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { GatewayAction } from 'src/app/models/actions/gateway-action.model';

export class GatewayActionBuilder<ReturnBuilderType extends ActionContainingBuilder>
extends BaseActionBuilder<GatewayAction, ReturnBuilderType> {

constructor(builder: ReturnBuilderType) {
    super(builder, new GatewayAction());
}

public setTargetSceneId(id?: number): this {
    if (id === undefined || id <= 0) {
        throw new EvalError('TargetSceneId Value has to be greater than 0.');
    }

    this.Action.setTargetSceneId(id);
    return this;
}

public setTargetSceneName(name: string): this {
    if (!name) {
        throw new EvalError('TargetSceneName Value is invalid.');
    }

    this.Action.setTargetSceneName(name);
    return this;
}

public onFinish() {
    if (!this.Action.getTargetSceneId() && !this.Action.getTargetSceneName()) {
        throw new BuilderError('Action creation could not be finished. SceneId and/or TargetSceneName were not set.');
    }
}
}
