import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriberRoutingModule } from './subscriber-routing.module';
import { IndexSubscriberComponent } from './pages/index-subscriber/index-subscriber.component';
import { SubscriptionsSubscriberComponent } from './pages/subscriptions-subscriber/subscriptions-subscriber.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexSubscriberComponent,
    SubscriptionsSubscriberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriberRoutingModule
  ]
})
export class SubscriberModule { }
