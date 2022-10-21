import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DragAndDropDirective } from './directives/drag-and-drop.directive';

import { ImagePathPipe } from './pipes/image-path.pipe';
import { StringExcerptPipe } from './pipes/string-excerpt.pipe';
import { SafePipe } from './pipes/safe.pipe';

import { UpdateTextDialogComponent } from './components/dialogs/update-text-dialog/update-text-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateImageDialogComponent } from './components/dialogs/update-image-dialog/update-image-dialog.component';
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    DragAndDropDirective,
    ImagePathPipe,
    StringExcerptPipe,
    SafePipe,
    UpdateTextDialogComponent,
    UpdateImageDialogComponent,
    DeleteDialogComponent,
    FileDropzoneComponent,
    DefaultLayoutComponent,
    NavigationComponent,
    PageNotFoundComponent,
    ImageUploadComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [
    DragAndDropDirective,
    ImagePathPipe,
    StringExcerptPipe,
    SafePipe,
    UpdateTextDialogComponent,
    UpdateImageDialogComponent,
    DeleteDialogComponent,
    FileDropzoneComponent,
    DefaultLayoutComponent,
    NavigationComponent,
    ImageUploadComponent,

  ],
})
export class SharedModule {}
