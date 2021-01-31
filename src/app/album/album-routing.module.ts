import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { CreateAlbumComponent } from './pages/create-album/create-album.component';
import { EditAlbumComponent } from './pages/edit-album/edit-album.component';
import { IndexAlbumComponent } from './pages/index-album/index-album.component';

const routes: Routes = [
  {
    path: '',
    component: IndexAlbumComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: CreateAlbumComponent,
        pathMatch: 'full',
      },
      { path: ':id', component: EditAlbumComponent, pathMatch: 'full' },
    ],
  },
];

/*
const routes: Routes = [
   {
    path: 'album',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
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
];
   */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
