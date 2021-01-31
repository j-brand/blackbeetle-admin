import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { CreateStoryComponent } from './pages/create-story/create-story.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { IndexStoryComponent } from './pages/index-story/index-story.component';

const routes: Routes = [
  {
    path: '',
    component: IndexStoryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: CreateStoryComponent,
        pathMatch: 'full',
      },
      { path: ':id', component: EditStoryComponent, pathMatch: 'full' },
    ],
  },
];
/* 
const routes: Routes = [
  {
    path: 'story',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: IndexStoryComponent, pathMatch: 'full' },
      {
        path: 'create',
        component: CreateStoryComponent,
        pathMatch: 'full',
      },
      { path: ':id', component: EditStoryComponent, pathMatch: 'full' },
    ],
  },
]; */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryRoutingModule {}
