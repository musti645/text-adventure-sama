import { BaseActionBuilder } from './base-action.builder';
import { GatewayActionBuilder } from './gateway-action.builder';
import { ItemConsumingActionBuilder } from './item-consuming-action.builder';
import { ItemRemovingActionBuilder } from './item-removing-action.builder';
import { ItemYieldingActionBuilder } from './item-yielding-action.builder';
import { MultiTimeActionBuilder } from './multi-time-action.builder';
import { OneTimeActionBuilder } from './one-time-action.builder';
import { RandomResponseActionBuilder } from './random-response-action.builder';
import { BaseBuilder } from '../base.builder';
import { ActionContainingBuilder } from '../interfaces/action-containing.builder';
import { Action } from '../../models/actions/action.model';

export class TestActionBuilder extends BaseBuilder implements ActionContainingBuilder {
    public Actions: Action[] = [];

    addActionToBuilder(action: Action): void {
        this.Actions.push(action);
    }

    public addAction<T extends Action>(action: T): BaseActionBuilder<T, TestActionBuilder> {
        return new BaseActionBuilder<T, TestActionBuilder>(this, action);
    }

    public addGatewayAction(): GatewayActionBuilder<TestActionBuilder> {
        return new GatewayActionBuilder<TestActionBuilder>(this);
    }

    public addItemConsumingAction(): ItemConsumingActionBuilder<TestActionBuilder> {
        return new ItemConsumingActionBuilder<TestActionBuilder>(this);
    }

    public addItemRemovingAction(): ItemRemovingActionBuilder<TestActionBuilder> {
        return new ItemRemovingActionBuilder<TestActionBuilder>(this);
    }

    public addItemYieldingAction(): ItemYieldingActionBuilder<TestActionBuilder> {
        return new ItemYieldingActionBuilder<TestActionBuilder>(this);
    }

    public addMultiTimeAction(id?: number): MultiTimeActionBuilder<TestActionBuilder> {
        return new MultiTimeActionBuilder<TestActionBuilder>(this);
    }

    public addOneTimeAction(): OneTimeActionBuilder<TestActionBuilder> {
        return new OneTimeActionBuilder<TestActionBuilder>(this);
    }

    public addRandomResponseAction(): RandomResponseActionBuilder<TestActionBuilder> {
        return new RandomResponseActionBuilder<TestActionBuilder>(this);
    }

    public finish(): void {
    }
}
