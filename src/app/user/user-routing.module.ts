import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'user',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
