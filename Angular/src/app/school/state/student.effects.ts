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
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';

import {
    StudentActions, CREATE_STUDENT, CreateStudent,
    CREATE_STUDENT_SUCCESS, CreateStudentSuccess, DELETE_STUDENT, RemoveStudent, RemoveStudentSuccess, LOAD_STUDENTS,
    GetStudents, GetStudentsSuccess, UPDATE_STUDENT, UpdateStudent, UpdateStudentSuccess
} from './student.actions';
import {Student} from './student';

@Injectable()
export default class StudentEffects {
    constructor(private actions: Actions,
                private http: HttpClient) {
    }John

    @Effect()
    createStudent$: Observable<Action> = this.actions.ofType(CREATE_STUDENT)
        .map((action: CreateStudent) => action.student)
        .switchMap(student => {
            return this.http.post<Student>('http://localhost:5000/api/students', student, {observe: 'response'});
        })
        .map(response => {
            return new CreateStudentSuccess(response.body);
        });

    @Effect()
    getStudents$: Observable<Action> = this.actions.ofType(LOAD_STUDENTS)
        .switchMap(() => {
            return this.http.get<Student[]>('http://localhost:5000/api/students', {observe: 'response'});
        })
        .map(response => {
            return new GetStudentsSuccess(response.body);
        });

    @Effect()
    updateStudent$: Observable<Action> = this.actions.ofType(UPDATE_STUDENT)
        .switchMap((action: UpdateStudent) => {
            const id = action.id;
            const changes = action.changes;
            return this.http.put<Student>(`http://localhost:5000/api/students/${id}`, changes, {observe: 'response'});
        })
        .map(response => {
            return new UpdateStudentSuccess('', response.body);
        });

    @Effect()
    deleteStudent$: Observable<Action> = this.actions.ofType(DELETE_STUDENT)
        .map((action: RemoveStudent) => action.id)
        .switchMap(id => {
            return this.http.delete<Student>(`http://localhost:5000/api/students/${id}`, {observe: 'response'});
        })
        .map(response => {
            return new RemoveStudentSuccess(response.body);
        });

    /*
@Effect()
getStudents: Observable<Action> = this.action.ofType(LOAD_STUDENT)
    .mergeMap(() => {
        this.http.get<Student[]>('http://localhost:5000/api/students');
        return new LoadSuccess();
    });
    */
}
