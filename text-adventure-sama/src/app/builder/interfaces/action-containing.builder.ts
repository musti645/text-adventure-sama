import { ActionBuilder } from '../action.builder';
import { Action } from 'src/app/models/actions/action.model';

export interface ActionContainingBuilder {
    addActionToBuilder(action: Action): void;

    addAction<T extends Action>(action: T): ActionBuilder<T, ActionContainingBuilder>;
}
