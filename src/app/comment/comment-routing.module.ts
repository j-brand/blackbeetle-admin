import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { IndexCommentComponent } from './pages/index-comment/index-comment.component';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: ':id', component: IndexCommentComponent, pathMatch: 'full' },
      {
        path: 'edit/:id',
        component: EditCommentComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
