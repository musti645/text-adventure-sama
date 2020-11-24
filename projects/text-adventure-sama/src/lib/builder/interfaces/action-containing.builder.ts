import { Action } from '../../models/actions/action.model';
import { BaseActionBuilder } from '../action-builders/base-action.builder';
import { GatewayActionBuilder } from '../action-builders/gateway-action.builder';
import { ItemConsumingActionBuilder } from '../action-builders/item-consuming-action.builder';
import { ItemRemovingActionBuilder } from '../action-builders/item-removing-action.builder';
import { ItemYieldingActionBuilder } from '../action-builders/item-yielding-action.builder';
import { MultiTimeActionBuilder } from '../action-builders/multi-time-action.builder';
import { OneTimeActionBuilder } from '../action-builders/one-time-action.builder';
import { RandomResponseActionBuilder } from '../action-builders/random-response-action.builder';

export interface ActionContainingBuilder {

    addActionToBuilder(action: Action): void;

    addAction<T extends Action>(action: T): BaseActionBuilder<T, ActionContainingBuilder>;

    addGatewayAction(id: number): GatewayActionBuilder<ActionContainingBuilder>;

    addItemConsumingAction(id: number): ItemConsumingActionBuilder<ActionContainingBuilder>;

    addItemRemovingAction(id: number): ItemRemovingActionBuilder<ActionContainingBuilder>;

    addItemYieldingAction(id: number): ItemYieldingActionBuilder<ActionContainingBuilder>;

    addMultiTimeAction(id: number): MultiTimeActionBuilder<ActionContainingBuilder>;

    addOneTimeAction(id: number): OneTimeActionBuilder<ActionContainingBuilder>;

    addRandomResponseAction(id: number): RandomResponseActionBuilder<ActionContainingBuilder>;

}
