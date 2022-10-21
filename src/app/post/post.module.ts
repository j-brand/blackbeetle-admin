import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from '../_material/material.module';
import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@shared/date-adapter';

import { UpdateMarkerDialogComponent } from './components/update-marker-dialog/update-marker-dialog.component';
import { UpdateVideoDialogComponent } from './components/update-video-dialog/update-video-dialog.component';
import { CreateUpdatePostDetailsComponent } from './components/create-update-post-details/create-update-post-details.component';
import { EditMapPostComponent } from './pages/edit-map-post/edit-map-post.component';
import { EditPostIndexComponent } from './pages/edit-post-index/edit-post-index.component';
import { EditHtmlPostComponent } from './pages/edit-html-post/edit-html-post.component';
import { EditVideoPostComponent } from './pages/edit-video-post/edit-video-post.component';
import { EditImagePostComponent } from './pages/edit-image-post/edit-image-post.component';
import { SafePipe } from '@shared/pipes/safe.pipe';

@NgModule({
  declarations: [
    EditImagePostComponent,
    EditMapPostComponent,
    EditPostIndexComponent,
    UpdateMarkerDialogComponent,
    CreateUpdatePostDetailsComponent,
    EditHtmlPostComponent,
    EditVideoPostComponent,
    UpdateVideoDialogComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
    SharedModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    SafePipe,
  ],
})
export class PostModule {}
