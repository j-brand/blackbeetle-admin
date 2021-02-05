import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';
import { MyDateAdapter, MY_DATE_FORMATS } from '@shared/date-adapter';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-create-update-post-details',
  templateUrl: './create-update-post-details.component.html',
  styleUrls: ['./create-update-post-details.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ],
})
export class CreateUpdatePostDetailsComponent implements OnInit {
  postForm: FormGroup;

  @Input()
  post: Post;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private datepipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      active: [0],
      title: ['', Validators.required],
      date: new FormControl(moment()),
    });
    this.postForm.patchValue(this.post);
  }

  public onActiveChange(event: any) {
    if (event.checked) {
      this.postForm.patchValue({ active: 1 });
    } else {
      this.postForm.patchValue({ active: 0 });
    }
  }

  //Get all touched form values
  getUpdatedValues() {
    const updatedFormValues = {};
    this.postForm['_forEachChild']((control, name) => {
      if (control.touched) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
  }

  onSubmit() {
    var formValues = this.getUpdatedValues();
    if (Object.keys(formValues).length != 0) {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]: any[]) => {
        if (key == 'date') {
          formData.set(key, this.datepipe.transform(value, 'Y-MM-dd'));
        } else if (!(value instanceof Date)) {
          formData.set(key, value);
        }
      });

      this.postService.updatePost(formData, this.post.id).subscribe({
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
    }
  }
}
