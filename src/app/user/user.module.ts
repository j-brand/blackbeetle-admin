import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from '@material/material.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, MaterialModule, UserRoutingModule],
})
export class UserModule {}
