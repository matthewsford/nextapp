import {Actions, CLOSE_SIDENAV, OPEN_SIDENAV} from './core.action';

export interface CoreState {
    showSidenav: boolean;
}

const initialState: CoreState = {
    showSidenav: false,
};

export function coreReducer(state = initialState, action: Actions): CoreState {
    switch (action.type) {
        case CLOSE_SIDENAV:
            return {
                showSidenav: false,
            };

        case OPEN_SIDENAV:
            return {
                showSidenav: true,
            };

        default:
            return state;
    }
}

export const getShowSidenav = (state: CoreState) => {
    return state.showSidenav;
};
