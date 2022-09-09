import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';

import { LoginComponent } from '@auth/login/login.component';
import { PageNotFoundComponent } from '@shared/pages/page-not-found/page-not-found.component';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('@user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'story',
    loadChildren: () =>
      import('@story/story.module').then((m) => m.StoryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'album',
    loadChildren: () =>
      import('@album/album.module').then((m) => m.AlbumModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'post',
    loadChildren: () => import('@post/post.module').then((m) => m.PostModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'comment',
    loadChildren: () => import('@comment/comment.module').then((m) => m.CommentModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('@settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    component: DefaultLayoutComponent,
    children: [{ path: '**', component: PageNotFoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
