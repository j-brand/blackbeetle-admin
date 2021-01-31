import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { DashboardComponent } from './dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
