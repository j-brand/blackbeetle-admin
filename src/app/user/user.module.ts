import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@material/material.module';
import { UserRoutingModule } from './user-routing.module';

import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { IndexUserComponent } from './pages/index-user/index-user.component';
import { CreateUpdateUserComponent } from './components/create-update-user/create-update-user.component';

@NgModule({
  declarations: [
    IndexUserComponent,
    EditUserComponent,
    CreateUserComponent,
    CreateUpdateUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
