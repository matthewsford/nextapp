/*   Copyright 2017 Matthew Ford <matthew@matthewford.us>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import {Action, createFeatureSelector} from '@ngrx/store';
import {StoreModule} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {UUID} from 'angular2-uuid';

import {Student} from './student';
import {
    StudentActions, CREATE_STUDENT, LOAD_STUDENTS, LOAD_STUDENTS_FAIL, LOAD_STUDENTS_SUCCESS,
    UPDATE_STUDENT, DELETE_STUDENT, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAIL, UPDATE_STUDENT_SUCCESS,
    DELETE_STUDENT_SUCCESS
} from './student.actions';

export const studentAdapter = createEntityAdapter<Student>();

export interface StudentState extends EntityState<Student> {
}

const defaultStudents = {
    id: [],
    entities: {}
};

export const initialState: StudentState = studentAdapter.getInitialState(defaultStudents);


export function studentReducer(state = initialState, action: StudentActions): StudentState {
    switch (action.type) {
        case CREATE_STUDENT_SUCCESS:
            return studentAdapter.addOne({...action.student, id: UUID.UUID()}, state);

        case LOAD_STUDENTS_SUCCESS:
            return studentAdapter.addMany(action.payload, state);

        case UPDATE_STUDENT_SUCCESS:
            return studentAdapter.updateOne({
                    id: action.id,
                    changes: action.changes
                },
                state);

        case DELETE_STUDENT_SUCCESS:
            return studentAdapter.removeOne(action.student.id, state);

        default:
            return state;
    }
}

export const getStudentState = createFeatureSelector<StudentState>('student');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = studentAdapter.getSelectors(getStudentState);
