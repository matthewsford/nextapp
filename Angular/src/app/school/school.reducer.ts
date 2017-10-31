import * as SchoolActions from './school.actions';
import {Student} from './student';


export interface State {
  searchTerm: string;
  results: Student[];
}

const initialState: State = {
  searchTerm: '',
  results: null
};

export function reducer(state = initialState, action: SchoolActions.All): State {
  return null;
}
