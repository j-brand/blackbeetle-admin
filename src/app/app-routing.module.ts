import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@helper/auth.guard';

import { DefaultLayoutComponent } from '@layout/default-layout/default-layout.component';

import { LoginComponent } from '@page/auth/login/login.component';

import { DashboardComponent } from '@page/dashboard/dashboard.component.ts';
import { UserComponent } from '@page/user/user.component';

import { IndexAlbumComponent } from '@page/album/index-album/index-album.component';
import { CreateAlbumComponent } from '@page/album/create-album/create-album.component';
import { EditAlbumComponent } from '@page/album/edit-album/edit-album.component';

import { IndexStoryComponent } from '@page/story/index-story/index-story.component';
import { CreateStoryComponent } from '@page/story/create-story/create-story.component';
import { EditStoryComponent } from '@page/story/edit-story/edit-story.component';
import { EditPostComponent } from '@page/post/edit-post/edit-post.component';

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
          { path: ':id', component: EditPostComponent, pathMatch: 'full' },
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
