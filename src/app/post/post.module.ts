import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { CreateUpdatePostHtmlComponent } from './components/create-update-post-html/create-update-post-html.component';
import { CreateUpdatePostImageComponent } from './components/create-update-post-image/create-update-post-image.component';
import { EditImagePostComponent } from './pages/edit-image-post/edit-image-post.component';
import { EditMapPostComponent } from './pages/edit-map-post/edit-map-post.component';
import { EditPostIndexComponent } from './pages/edit-post-index/edit-post-index.component';
import { MaterialModule } from '../_material/material.module';
import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';
@NgModule({
  declarations: [
    CreateUpdatePostHtmlComponent,
    CreateUpdatePostImageComponent,
    EditImagePostComponent,
    EditMapPostComponent,
    EditPostIndexComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
    SharedModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule
  ],
})
export class PostModule {}
