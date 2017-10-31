import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './core/layout.reducer';
import {RouterStateUrl} from './shared/util';

export interface State {
  layout: fromLayout.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}
