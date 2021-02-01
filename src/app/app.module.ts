import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@auth/auth.module';
import { PostModule } from '@post/post.module';
import { StoryModule } from '@story/story.module';
import { AlbumModule } from '@album/album.module';
import { UserModule } from '@user/user.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { MaterialModule } from './_material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
/*     PostModule,
    StoryModule,
    AlbumModule,
    UserModule, */
/*     DashboardModule,
 */    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
