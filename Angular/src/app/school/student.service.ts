/*   Copyright 2017 Matthew Ford <matthew@matthewford.us>
**
**   Licensed under the Apache License, Version 2.0 (the "License");
**   you may not use this file except in compliance with the License.
**   You may obtain a copy of the License at
**
**     http://www.apache.org/licenses/LICENSE-2.0
**
**   Unless required by applicable law or agreed to in writing, software
**   distributed under the License is distributed on an "AS IS" BASIS,
**   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
**   See the License for the specific language governing permissions and
**   limitations under the License.
*/

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Student} from './student';
import {Observer} from 'rxjs/Observer';

export abstract class DeleteStatus {
  // const Accepted = Symbol("accepted");
}

@Injectable()
export class StudentService {
  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {
  }

  public createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, student);
  }

  /**
   * @param {string} id the id of the student to lookup
   * @returns {Observable<Student>} {@link Student}
   */
  public getStudent(id: string|null): Observable<Student> {
    if (id === 'new') {
      return Observable.create((observer: Observer<Student>) => {
        observer.next(new Student());
        observer.complete();
      });
    } else {
      return this.http.get<Student>(`${this.baseUrl}/students/${id}`);
    }
  }

  /**
   * @returns {Observable<Student[]>}
   */
  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  /**
   * @param {Student} student
   */
  updateStudent(student: Student): Observable<Student> {
    console.log('about to put');
    try {
      return this.http.put<Student>(`${this.baseUrl}/students/${student.id}`, student);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * @param {string} id
   * @returns {Observable<boolean>}
   */
  public deleteStudent(id: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.http.delete(`${this.baseUrl}/students/${id}`, {observe: 'response'})
        .subscribe(
          data => {
            observer.next(data.ok);
          },
          err => {
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
    });
  }
}
