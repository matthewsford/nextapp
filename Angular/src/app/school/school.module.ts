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
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';

import {StudentListComponent} from './student-list.component';
import {StudentService} from './student.service';
import {ClassComponent} from './class.component';
import {ClassListComponent} from './class-list.component';
import {StudentComponent} from './student.component';
import {SchoolRoutingModule} from './school-routing.module';

@NgModule({
  declarations: [
    ClassComponent,
    ClassListComponent,
    StudentComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // EffectsModule.forFeature([AdminEffects]),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    SchoolRoutingModule,
  ],
  providers: [
    StudentService
  ],
})
export class SchoolModule {
}
