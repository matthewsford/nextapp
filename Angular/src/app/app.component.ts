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
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {State} from './state';
import {CloseSidenav, OpenSidenav} from './core/layout.actions';
import {getShowSidenav} from './core/layout.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Next App';

  showSidenav$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.showSidenav$ = this.store.select(getShowSidenav);
  }

  ngOnInit(): void {
  }

  closeSidenav() {
    this.store.dispatch(new CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new OpenSidenav());
  }
}
