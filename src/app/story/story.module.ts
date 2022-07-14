import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../_material/material.module';

import { CreateUpdateStoryComponent } from './components/create-update-story/create-update-story.component';
import { CreateStoryComponent } from './pages/create-story/create-story.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { IndexStoryComponent } from './pages/index-story/index-story.component';

import { StoryRoutingModule } from './story-routing.module';
import { NotifySubscibersDialogComponent } from './components/notify-subscibers-dialog/notify-subscibers-dialog.component';

@NgModule({
  declarations: [
    CreateUpdateStoryComponent,
    CreateStoryComponent,
    EditStoryComponent,
    IndexStoryComponent,
    NotifySubscibersDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoryRoutingModule
  ],
})
export class StoryModule {}
