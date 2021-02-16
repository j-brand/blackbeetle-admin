import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      active: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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

  public boolToNumber(event: MatCheckboxChange) {
    let formControlName = event.source.name;
    if (event.checked) {
      this.userForm.patchValue({ [formControlName]: 1 });
    } else {
      this.userForm.patchValue({ [formControlName]: 0 });
    }
  }

  //Get all touched form values
  getUpdatedValues() {
    const updatedFormValues = {};
    this.userForm['_forEachChild']((control, name) => {
      if (control.touched) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
  }

  onSubmit() {
    /*     var formValues = this.getUpdatedValues();

    if (Object.keys(formValues).length != 0) {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]: any[]) => {
        formData.set(key, value);
      }); */
    if (this.editMode) {
      this.userService.updateUser(this.userForm.value, this.user.id).subscribe({
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
      this.userService.createUser(this.userForm.value).subscribe({
        next: (data) => {
          console.log(data);
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
    /*     } */
  }
}
