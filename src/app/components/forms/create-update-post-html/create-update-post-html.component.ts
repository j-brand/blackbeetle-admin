import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Post } from '@model/post';
import { environment } from 'src/environments/environment';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MyDateAdapter, MY_DATE_FORMATS } from '@helper/date-adapter';
import { PostService } from '@api/post.service';
import { Image } from '@model/image';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-create-update-post-html',
  templateUrl: './create-update-post-html.component.html',
  styleUrls: ['./create-update-post-html.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ],
})
export class CreateUpdatePostHtmlComponent implements OnInit {
  postForm: FormGroup;
  tinyApiKey: String = environment.tiny_mce_key;
  tinyMceConfig: any;

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
      content: ['', Validators.required],
      date: new FormControl(moment()),
    });
    this.postForm.patchValue(this.post);
    this.initTinyMce();
  }

  initTinyMce() {
    this.tinyMceConfig = {
      icons: 'material',
      skin: 'borderless',
      initialValue: 'Once upon a time...',
      plugins: [
        'advlist autolink lists link image imagetools charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | image |customDateButton',
      menubar: false,
      min_height: 400,
      images_upload_handler: (blobInfo, success, failure) => {
        this.uploadImage(blobInfo.blob())
          .then((image: Image) => {
            success(
              `${environment.publicUrl}/storage/${image.path}${image.title}_large.${image.extension}`
            );
          })
          .catch((error) => {
            console.log(error);
            failure(error);
          });
      },
    };
  }

  public onActiveChange(event: any) {
    if (event.checked) {
      this.postForm.patchValue({ active: 1 });
    } else {
      this.postForm.patchValue({ active: 0 });
    }
  }

  public uploadImage(imageData: Blob) {
    let that = this;
    return new Promise(function (resolve, reject) {
      let fd = new FormData();
      fd.set('file', imageData);
      that.postService.uploadImage(fd, that.post.id).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
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

      this.postService.updatePost( formData, this.post.id).subscribe({
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
