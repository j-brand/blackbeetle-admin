import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import { DefaultLayoutComponent } from '@layout/default-layout/default-layout.component';

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
import { TestComponent } from './test/test.component';

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
    TestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
