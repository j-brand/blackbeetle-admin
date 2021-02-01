import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CreateUpdateAlbumComponent } from './components/create-update-album/create-update-album.component';
import { CreateAlbumComponent } from './pages/create-album/create-album.component';
import { EditAlbumComponent } from './pages/edit-album/edit-album.component';
import { IndexAlbumComponent } from './pages/index-album/index-album.component';
import { MaterialModule } from '../_material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  declarations: [
    CreateUpdateAlbumComponent,
    CreateAlbumComponent,
    EditAlbumComponent,
    IndexAlbumComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AlbumRoutingModule
  ],
})
export class AlbumModule {}
