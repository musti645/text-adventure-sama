import { Action } from '../../models/actions/action.model';
import { ActionBuilder } from '../action.builder';

export interface ActionContainingBuilder {
    addActionToBuilder(action: Action): void;

    addAction<T extends Action>(action: T): ActionBuilder<T, ActionContainingBuilder>;
}
