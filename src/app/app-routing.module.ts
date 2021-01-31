import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';

import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';

import { LoginComponent } from '@auth/login/login.component';

import { DashboardComponent } from '@dashboard/dashboard.component.ts';
import { UserComponent } from '@user/user.component';

import { IndexAlbumComponent } from '@album/pages/index-album/index-album.component';
import { CreateAlbumComponent } from '@album/pages/create-album/create-album.component';
import { EditAlbumComponent } from '@album/pages/edit-album/edit-album.component';

import { IndexStoryComponent } from '@story/pages/index-story/index-story.component';
import { CreateStoryComponent } from '@story/pages/create-story/create-story.component';
import { EditStoryComponent } from '@story/pages/edit-story/edit-story.component';

import { EditPostIndexComponent } from '@post/pages/edit-post-index/edit-post-index.component';

/* const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'story',
        loadChildren: () =>
          import('@story/story.module').then((m) => m.StoryModule),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('@post/post.module').then((m) => m.PostModule),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
]; */

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'story',
        children: [
          { path: '', component: IndexStoryComponent, pathMatch: 'full' },
          {
            path: 'create',
            component: CreateStoryComponent,
            pathMatch: 'full',
          },
          { path: ':id', component: EditStoryComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'post',
        children: [
          { path: ':id', component: EditPostIndexComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'album',
        children: [
          { path: '', component: IndexAlbumComponent, pathMatch: 'full' },
          {
            path: 'create',
            component: CreateAlbumComponent,
            pathMatch: 'full',
          },
          { path: ':id', component: EditAlbumComponent, pathMatch: 'full' },
        ],
      },
      { path: 'user', component: UserComponent },
    ],
  },
  { path: 'login', component: LoginComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
