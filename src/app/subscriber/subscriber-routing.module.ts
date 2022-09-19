import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@shared/layout/default-layout/default-layout.component';
import { IndexSubscriberComponent } from './pages/index-subscriber/index-subscriber.component';
import { SubscriptionsSubscriberComponent } from './pages/subscriptions-subscriber/subscriptions-subscriber.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexSubscriberComponent,
      },
      {
        path: 'subscriptions',
        component: SubscriptionsSubscriberComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberRoutingModule {}
