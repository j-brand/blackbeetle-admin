import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
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


import { NavigationComponent } from '@component/navigation/navigation.component';
import { DefaultLayoutComponent } from '@layout/default-layout/default-layout.component';
import { LoginComponent } from '@page/auth/login/login.component';
import { DashboardComponent } from '@page/dashboard/dashboard.component';
import { RegisterComponent } from '@page/auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';



const materialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    DefaultLayoutComponent,
    LoginComponent,
    RegisterComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
