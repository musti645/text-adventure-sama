import {
    BaseActionBuilder,
    GatewayActionBuilder,
    ItemConsumingActionBuilder,
    ItemRemovingActionBuilder,
    ItemYieldingActionBuilder,
    MultiTimeActionBuilder,
    OneTimeActionBuilder,
    RandomResponseActionBuilder
} from '../action.builder';
import { Action } from 'src/app/models/actions/action.model';

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
