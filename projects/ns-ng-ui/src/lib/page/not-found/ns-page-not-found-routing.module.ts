import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NsPageNotFoundAuthService } from './ns-page-not-found-auth.service';
import { NsPageNotFoundComponent } from './ns-page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NsPageNotFoundComponent,
    canActivate: [NsPageNotFoundAuthService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NsPageNotFoundRoutingModule {}
