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
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Dictionary} from '@ngrx/entity/src/models';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

import {Student} from '../state/student';
import {StudentState, selectAll, selectEntities} from '../state/student.reducer';
import {CreateStudent, UpdateStudent} from '../state/student.actions';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit {
    entities: Observable<Dictionary<Student>>;
    id: string;
    form: FormGroup;
    students: Observable<Student[]>;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<StudentState>) {
        this.form = this.fb.group({
                givenName: [''],
                surname: [''],
            }
        );
    }

    ngOnInit() {
        this.students = this.store.select(selectAll);
        this.entities = this.store.select(selectEntities);

        this.route.paramMap
            .switchMap((params: ParamMap) => {
                this.id = params.get('id');
                console.log(`id: ${this.id}`);
                if (this.id === 'new') {
                    this.form = this.fb.group({
                            givenName: [''],
                            surname: [''],
                        }
                    );
                } else {
                    console.log('subbing to entities');
                    this.entities.subscribe(
                        fulfillment => {
                            console.log('entity fulfillment');
                            console.log(fulfillment);
                            const student = fulfillment[this.id];

                            if (student !== undefined) {
                                this.form = this.fb.group({
                                        givenName: [student.givenName],
                                        surname: [student.surname],
                                    }
                                );
                            }
                        }
                    );
                }
                return this.id;
            })
            .subscribe(fulfilment => {

            });
    }

    onAutofill(): void {
        this.form = this.fb.group({
                givenName: ['John'],
                surname: ['Doe'],
            }
        );
    }

    onSave(): void {
        if (this.id === 'new') {
            this.store.dispatch(new CreateStudent({
                id: null,
                eTag: null,
                enteredTimestamp: null,
                supersededTimestamp: null,
                givenName: this.givenName,
                surname: this.surname,
                classes: []
            }));
        } else {
            this.store.dispatch(new UpdateStudent(this.id, {
                id: this.id,
                eTag: null,
                enteredTimestamp: null,
                supersededTimestamp: null,
                givenName: this.givenName,
                surname: this.surname,
                classes: []
            }))
                ;
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
