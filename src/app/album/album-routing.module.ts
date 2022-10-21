import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { AlbumResolver } from './album.resolver';
import { CreateAlbumComponent } from './pages/create-album/create-album.component';
import { EditAlbumComponent } from './pages/edit-album/edit-album.component';
import { IndexAlbumComponent } from './pages/index-album/index-album.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    resolve: { breadcrumb: AlbumResolver },
    data: {
      name: 'Alben',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexAlbumComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateAlbumComponent,
        resolve: { breadcrumb: AlbumResolver },
        data: {
          name: 'Album erstellen',
        },
      },
      {
        path: ':id',
        component: EditAlbumComponent,
        pathMatch: 'full',
        resolve: { breadcrumb: AlbumResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
