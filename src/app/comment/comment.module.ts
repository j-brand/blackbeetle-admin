import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';
import { IndexCommentComponent } from './pages/index-comment/index-comment.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentRoutingModule } from './comment-routing.module';



@NgModule({
  declarations: [
    EditCommentComponent,
    IndexCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommentRoutingModule
  ]
})
export class CommentModule { }
