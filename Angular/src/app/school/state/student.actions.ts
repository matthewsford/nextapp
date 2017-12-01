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
import { Action } from '@ngrx/store';
import {Student} from './student';

export const CREATE_STUDENT = 'School.Student.Create.Request';
export const CREATE_STUDENT_SUCCESS = 'School.Student.Create.Success';
export const CREATE_STUDENT_FAIL = 'School.Student.Create.Fail';
export const UPDATE_STUDENT = 'School.Student.Update.Request';
export const UPDATE_STUDENT_SUCCESS = 'School.Student.Update.Success';
export const UPDATE_STUDENT_FAIL = 'School.Student.Update.Fail';
export const DELETE_STUDENT = 'School.Student.Delete.Request';
export const DELETE_STUDENT_SUCCESS = 'School.Student.Delete.Success';
export const DELETE_STUDENT_FAIL = 'School.Student.Delete.Fail';
export const LOAD_STUDENTS = 'School.Students.Get.Request';
export const LOAD_STUDENTS_SUCCESS = 'School.Students.Get.Success';
export const LOAD_STUDENTS_FAIL = 'School.Students.Get.Fail';

export class CreateStudent implements Action {
    readonly type = CREATE_STUDENT;

    constructor(public student: Student) {}
}

export class CreateStudentSuccess implements Action {
    readonly type = CREATE_STUDENT_SUCCESS;

    constructor(public student: Student) {}
}

export class CreateStudentFail implements Action {
    readonly type = CREATE_STUDENT_FAIL;

    constructor(public error: string) {}
}

export class UpdateStudent implements Action {
    readonly type = UPDATE_STUDENT;

    constructor(public id: string,
                public changes: Student) {}
}

export class UpdateStudentSuccess implements Action {
    readonly type = UPDATE_STUDENT_SUCCESS;

    constructor(public id: string,
                public changes: Student) {}
}

export class UpdateStudentFail implements Action {
    readonly type = CREATE_STUDENT_FAIL;

    constructor(public error: string) {}
}

/**
 * Remove Book from Collection Actions
 */
export class RemoveStudent implements Action {
    readonly type = DELETE_STUDENT;

    constructor(public id: string) {}
}

export class RemoveStudentSuccess implements Action {
    readonly type = DELETE_STUDENT_SUCCESS;

    constructor(public student: Student) {}
}

export class RemoveStudentFail implements Action {
    readonly type = DELETE_STUDENT_FAIL;

    constructor(public student: Student) {}
}

/**
 * Load Collection Actions
 */
export class GetStudents implements Action {
    readonly type = LOAD_STUDENTS;
}

export class GetStudentsSuccess implements Action {
    readonly type = LOAD_STUDENTS_SUCCESS;

    constructor(public payload: Student[]) {}
}

export class GetStudentsFail implements Action {
    readonly type = LOAD_STUDENTS_FAIL;

    constructor(public payload: any) {}
}

export type StudentActions =
    | CreateStudent
    | CreateStudentSuccess
    | CreateStudentFail
    | UpdateStudent
    | UpdateStudentSuccess
    | UpdateStudentFail
    | RemoveStudent
    | RemoveStudentSuccess
    | RemoveStudentFail
    | GetStudents
    | GetStudentsSuccess
    | GetStudentsFail;
