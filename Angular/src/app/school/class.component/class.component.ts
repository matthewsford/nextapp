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
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

import {StudentService} from '../student.service';
import {Student} from '../student';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.sass']
})
export class ClassComponent implements OnInit {
  student: Student;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService) {
    this.form = this.fb.group({
        givenName: [''],
        surname: [''],
      }
    );
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.studentService.getStudent(params.get('id')))
      .subscribe((student: Student) => {
        if (student != null) {
          this.student = student;

          this.form = this.fb.group({
              givenName: [this.student.givenName],
              surname: [this.student.surname],
            }
          );
        }
      });
  }

  onSave(): void {
    const student = new Student(this.givenName, this.surname);
    if (this.student.id === null) {
      this.studentService.createStudent(student).subscribe(
        data => {
          // TODO
        },
        err => {
          console.log(`error: ${err}`);
        },
        () => {
          // TODO
        }
      );
    } else {
      this.studentService.updateStudent(this.student)
        .subscribe(next => {
          },
          err => {

          },
          () => {
            console.log('hello');
          }
        );
    }
  }

  onBack(): void {
    this.router.navigate(['/students'])
      .then((fulfilled: boolean) => {
        // TODO
      })
      .catch(reason => {
        // TODO
      });
  }

  get givenName(): string {
    const control = this.form.get('givenName');
    if (control != null) {
      return control.value;
    }
    return '';
  }

  get surname(): string {
    const control = this.form.get('surname');
    if (control != null) {
      return control.value;
    }
    return '';
  }
}
