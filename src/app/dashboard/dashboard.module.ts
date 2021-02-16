import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LocationCardComponent } from './components/location-card/location-card.component';

@NgModule({
  declarations: [DashboardComponent, LocationCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
