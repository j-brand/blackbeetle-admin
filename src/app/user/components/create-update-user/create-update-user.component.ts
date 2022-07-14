import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { HelperService } from '@shared/services/helper.service';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss'],
})
export class CreateUpdateUserComponent implements OnInit {
  userForm: FormGroup;
  editMode: boolean = false;

  @Input()
  user?: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      active: new FormControl([0]),
      name: new FormControl([''], Validators.required),
      email: new FormControl([''], Validators.required),
      password: new FormControl([''], Validators.required),
    });

    if (this.user) {
      this.setEditMode(this.user);
    }
  }

  private setEditMode(user: User) {
    this.editMode = true;
    this.userForm.patchValue(user);
    Object.keys(this.userForm.controls).forEach((controlKey) => {
      this.userForm.controls[controlKey].markAsUntouched();
    });
    this.userForm.controls['password'].disable();
  }

  onSubmit() {
    let formData = this.helperService.toFormData(this.userForm.value);

    if (this.editMode) {
      this.userService.updateUser(formData, this.user.id).subscribe({
        next: (data) => {
          this._snackBar.open('Album Details gespeichert!', '', {
            duration: 3000,
          });
        },
        error: (error) => {
          this._snackBar.open('Error! Call the Admin.^^', '', {
            duration: 3000,
          });
        },
      });
    } else {
      this.userService.createUser(formData).subscribe({
        next: (data) => {
          this.router.navigate(['/user/' + data.id]);
        },
        error: (error) => {
          if (error.errors) {
            Object.entries(error.errors).forEach(([key, value]: any[]) => {
              this.userForm.controls[key].setErrors(value);
            });
          }
        },
      });
    }
  }
}
