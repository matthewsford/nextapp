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
import {StoreRouterConnectingModule, routerReducer, RouterStateSerializer} from '@ngrx/router-store';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatSidenavModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core';
import {RegisterComponent} from './register.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {LoginComponent} from './login.component';
import {SessionService} from './session.service';
import {SchoolModule} from './school';
import {reducers, CustomRouterStateSerializer, metaReducers} from './app.reducer';
import SchoolEffects from './school/state/student.effects';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([SchoolEffects]),
        CoreModule,
        SchoolModule,
        AppRoutingModule,
        StoreRouterConnectingModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    providers: [
        SessionService,
        {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
