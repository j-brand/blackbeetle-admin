import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateTextDialogComponent } from './components/dialogs/update-text-dialog/update-text-dialog.component';
import { MaterialModule } from '@material/material.module';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateImageDialogComponent } from './components/dialogs/update-image-dialog/update-image-dialog.component';
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ImagePathPipe } from './pipes/image-path.pipe';
import { StringExcerptPipe } from './pipes/string-excerpt.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UpdateTextDialogComponent,
    UpdateImageDialogComponent,
    DeleteDialogComponent,
    FileDropzoneComponent,
    DragAndDropDirective,
    DefaultLayoutComponent,
    NavigationComponent,
    ImagePathPipe,
    StringExcerptPipe,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [
    UpdateTextDialogComponent,
    UpdateImageDialogComponent,
    DeleteDialogComponent,
    FileDropzoneComponent,
    DragAndDropDirective,
    DefaultLayoutComponent,
    NavigationComponent,
    ImagePathPipe,
    StringExcerptPipe,
  ],
})
export class SharedModule {}
