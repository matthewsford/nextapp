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
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from './student.component';
import {StudentListComponent} from './student-list.component';
import {ClassListComponent} from './class-list.component/class-list.component';
import {ClassComponent} from './class.component/class.component';

const routes: Routes = [
  {
    path: 'classes',
    component: ClassListComponent,
  },
  {
    path: 'classes/:id',
    component: ClassComponent,
  },
  {
    path: 'students',
    component: StudentListComponent,
  },
  {
    path: 'students/:id',
    component: StudentComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SchoolRoutingModule {
}