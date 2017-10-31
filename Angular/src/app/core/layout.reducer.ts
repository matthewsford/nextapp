import * as layout from './layout.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        showSidenav: false,
      };

    case layout.OPEN_SIDENAV:
      return {
        showSidenav: true,
      };

    default:
      return state;
  }
}

const getShowSidenavHidden = (state: State) => state.showSidenav;

export const getLayoutState = createFeatureSelector<State>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  getShowSidenavHidden
);
