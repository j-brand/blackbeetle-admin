import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../_material/material.module';
import { AlbumRoutingModule } from './album-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUpdateAlbumComponent } from './components/create-update-album/create-update-album.component';
import { CreateAlbumComponent } from './pages/create-album/create-album.component';
import { EditAlbumComponent } from './pages/edit-album/edit-album.component';
import { IndexAlbumComponent } from './pages/index-album/index-album.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@shared/date-adapter';

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
    AlbumRoutingModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AlbumModule {}
