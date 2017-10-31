import {NgModule, Optional, SkipSelf} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule
} from '@angular/material';

import throwIfAlreadyLoaded from './module-import-guard';
import {NavItemComponent} from './nav-item.component';
import {SidenavComponent} from './sidenav.component';
import {ToolbarComponent} from './toolbar.component';
import {RouterModule} from '@angular/router';

const Components = [
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    RouterModule,
  ],
  declarations: Components,
  exports: Components,
  providers: [],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
