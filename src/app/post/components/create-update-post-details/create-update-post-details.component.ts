import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';
import { HelperService } from '@shared/services/helper.service';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-create-update-post-details',
  templateUrl: './create-update-post-details.component.html',
  styleUrls: ['./create-update-post-details.component.scss'],
})
export class CreateUpdatePostDetailsComponent implements OnInit {
  postForm: FormGroup;
  detailsExpanded: boolean = false;

  @Input()
  post: Post;

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      active: new FormControl([0], Validators.required),
      title: new FormControl([''], Validators.required),
      date: new FormControl(moment()),
    });
    this.postForm.patchValue(this.post);
    if (this.post.active == 0) {
      this.detailsExpanded = true;
    }
  }

  onSubmit() {
    var formValues = this.helperService.getUpdatedValues(this.postForm);

    if (Object.keys(formValues).length != 0) {
      this.postService
        .updatePost(this.helperService.toFormData(formValues), this.post.id)
        .subscribe({
          next: (data) => {
            this.detailsExpanded = false;
            this._snackBar.open('Beitragsdetails wurden gespeichert', '', {
              duration: 3000,
            });
          },
          error: (err) => {
            this._snackBar.open(err.error.message, '', {
              duration: 3000,
            });
          },
        });
    }
  }
}
