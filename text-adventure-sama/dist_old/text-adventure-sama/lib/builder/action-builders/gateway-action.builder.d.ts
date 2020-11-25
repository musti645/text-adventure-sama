import { BaseActionBuilder } from './base-action.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { GatewayAction } from '../../models/actions/gateway-action.model';
export declare class GatewayActionBuilder<ReturnBuilderType extends ActionContainingBuilder> extends BaseActionBuilder<GatewayAction, ReturnBuilderType> {
    constructor(builder: ReturnBuilderType);
    setTargetSceneId(id?: number): this;
    setTargetSceneName(name: string): this;
    onFinish(): void;
}
