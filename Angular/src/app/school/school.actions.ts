import {Action} from '@ngrx/store';
import {Student} from './student';

export const SEARCH = 'Books Search';
export const SEARCH_SUCCESS = 'Books Search Success';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {
  }
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Student[]) {
  }
}

export type All =
  Search | SearchSuccess;
