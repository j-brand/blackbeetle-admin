import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';

import { LoginComponent } from '@auth/login/login.component';



const routes: Routes = [
  {
    path: '',
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

  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
