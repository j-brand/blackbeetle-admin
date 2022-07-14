import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { IndexUserComponent } from './pages/index-user/index-user.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexUserComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateUserComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: EditUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
