import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NsAuthenticateService } from 'ns-js-utils';
import { NsPageNoPermissionComponent } from './ns-page-no-permission.component';

const routes: Routes = [
  {
    path: '',
    component: NsPageNoPermissionComponent,
    canActivate: [NsAuthenticateService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NsPageNoPermissionRoutingModule {}
