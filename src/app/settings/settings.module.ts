import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexSettingsComponent } from './pages/index-settings/index-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RegenerateCardComponent } from './components/regenerate-card/regenerate-card.component';

@NgModule({
  declarations: [IndexSettingsComponent, RegenerateCardComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
})
export class SettingsModule {}
