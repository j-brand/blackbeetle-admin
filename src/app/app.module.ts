import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditorModule } from '@tinymce/tinymce-angular';


import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultLayoutComponent } from '@layout/default-layout/default-layout.component';
import {MatMenuModule} from '@angular/material/menu';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { LoginComponent } from '@page/auth/login/login.component';
import { RegisterComponent } from '@page/auth/register/register.component';
import { DashboardComponent } from '@page/dashboard/dashboard.component';
import { UserComponent } from '@page/user/user.component';
import { CreateAlbumComponent } from '@page/album/create-album/create-album.component';
import { IndexAlbumComponent } from '@page/album/index-album/index-album.component';

import { NavigationComponent } from '@component/navigation/navigation.component';

import { TokenInterceptor } from '@helper/token.interceptor';
import { ErrorInterceptor } from '@helper/error.interceptor';
import { HttpRequestInterceptor } from '@helper/http-request.interceptor';
import { EditAlbumComponent } from './pages/album/edit-album/edit-album.component';
import { DragAndDropDirective } from './_directives/drag-and-drop.directive';
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component';
import { CreateUpdateAlbumComponent } from './components/forms/create-update-album/create-update-album.component';
import { ImagePathPipe } from './_helpers/image-path.pipe';
import { StringExcerptPipe } from './_helpers/string-excerpt.pipe';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { IndexStoryComponent } from './pages/story/index-story/index-story.component';
import { CreateUpdateStoryComponent } from './components/forms/create-update-story/create-update-story.component';
import { CreateStoryComponent } from './pages/story/create-story/create-story.component';
import { EditStoryComponent } from './pages/story/edit-story/edit-story.component';
import { EditPostComponent } from './pages/post/edit-post/edit-post.component';
import { UpdateImageDialogComponent } from './components/dialogs/update-image-dialog/update-image-dialog.component';
import { CreateUpdatePostHtmlComponent } from './components/forms/create-update-post-html/create-update-post-html.component';
import { CreateUpdatePostImageComponent } from './components/forms/create-update-post-image/create-update-post-image.component';
import { EditImagePostComponent } from './pages/post/edit-image-post/edit-image-post.component';

const materialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatMenuModule,
  DragDropModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    DefaultLayoutComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    CreateAlbumComponent,
    IndexAlbumComponent,
    EditAlbumComponent,
    DragAndDropDirective,
    FileDropzoneComponent,
    CreateUpdateAlbumComponent,
    ImagePathPipe,
    DeleteDialogComponent,
    IndexStoryComponent,
    CreateUpdateStoryComponent,
    CreateStoryComponent,
    EditStoryComponent,
    EditPostComponent,
    UpdateImageDialogComponent,
    StringExcerptPipe,
    CreateUpdatePostHtmlComponent,
    CreateUpdatePostImageComponent,
    EditImagePostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EditorModule,
    materialModules,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
