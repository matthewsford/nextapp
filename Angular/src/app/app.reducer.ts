import {Params, RouterStateSnapshot} from '@angular/router';
import {routerReducer, RouterReducerState, RouterStateSerializer} from '@ngrx/router-store';
import {ActionReducer, ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import {coreReducer, CoreState} from './core/core.reducer';
import {environment} from '../environments/environment';
import {studentReducer, StudentState} from './school/state/student.reducer';

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
}

export class CustomRouterStateSerializer
    implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const queryParams = routerState.root.queryParams;

        return { url, queryParams };
    }
}

export interface AppState {
    core: CoreState;
    routerReducer: RouterReducerState<RouterStateUrl>;
    student: StudentState;
}

export const reducers: ActionReducerMap<any> = {
    core: coreReducer,
    routerReducer: routerReducer,
    student: studentReducer,
};
export const selectCore = (state: AppState) => state.core;
export const selectCoreShowSidenav = createSelector(selectCore, (state: CoreState) => state.showSidenav);

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger, storeFreeze]
    : [];
