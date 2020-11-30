import { BaseActionBuilder } from 'src/builder/action-builders/base-action.builder';
import { GatewayActionBuilder } from 'src/builder/action-builders/gateway-action.builder';
import { ItemConsumingActionBuilder } from 'src/builder/action-builders/item-consuming-action.builder';
import { ItemRemovingActionBuilder } from 'src/builder/action-builders/item-removing-action.builder';
import { ItemYieldingActionBuilder } from 'src/builder/action-builders/item-yielding-action.builder';
import { MultiTimeActionBuilder } from 'src/builder/action-builders/multi-time-action.builder';
import { OneTimeActionBuilder } from 'src/builder/action-builders/one-time-action.builder';
import { RandomResponseActionBuilder } from 'src/builder/action-builders/random-response-action.builder';
import { BaseBuilder } from 'src/builder/base.builder';
import { ActionContainingBuilder } from 'src/builder/interfaces/action-containing.builder';
import { Action } from 'src/models/actions/action.model';

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
