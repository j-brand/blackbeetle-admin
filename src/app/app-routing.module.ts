import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from '@layout/default-layout/default-layout.component';

import { DashboardComponent } from '@page/dashboard/dashboard.component.ts';
import { LoginComponent } from '@page/auth/login/login.component';



const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
