import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from '@layout/default-layout/default-layout.component';

import { LoginComponent } from '@page/auth/login/login.component';

import { DashboardComponent } from '@page/dashboard/dashboard.component.ts';
import { UserComponent } from '@page/user/user.component';

import { IndexAlbumComponent } from '@page/album/index-album/index-album.component';
import { CreateAlbumComponent } from '@page/album/create-album/create-album.component';
import { EditAlbumComponent } from '@page/album/edit-album/edit-album.component';

import { AuthGuard } from '@helper/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      {
        path: 'album',
        children: [
          { path: '', component: IndexAlbumComponent, pathMatch: 'full'},
          { path: 'create', component: CreateAlbumComponent, pathMatch: 'full' },
          { path: ':id', component: EditAlbumComponent, pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
