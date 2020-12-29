import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlbumService } from '@api/album.service';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { DatePipe } from '@angular/common';

//import { MY_DATE_FORMATS } from '@helper/date-format';
import { MyDateAdapter, MY_DATE_FORMATS } from '@helper/date-adapter';

import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ],
})
export class CreateAlbumComponent implements OnInit {
  createAlbumForm: FormGroup;
  imgPath: String;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createAlbumForm = this.formBuilder.group({
      active: [1],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image_upload: ['', Validators.required],
      title_image_text: [''],
      start_date: new FormControl(moment()),
      end_date: new FormControl(moment()),
    });
  }

  //Add preview Image on File Input Change
  public onFileChanged(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgPath = reader.result as string;
        this.createAlbumForm.patchValue({ image_upload: file });
      };
    }
  }
  public onActiveChange(event: any) {
    if (event.checked) {
      this.createAlbumForm.patchValue({ active: 1 });
    } else {
      this.createAlbumForm.patchValue({ active: 0 });
    }
  }

  onSubmit() {
    if (this.createAlbumForm.valid) {
      const formData = new FormData();
      Object.entries(this.createAlbumForm.value).forEach(
        ([key, value]: any[]) => {
          if (value instanceof Date) {
            formData.set(key, this.datepipe.transform(value, 'Y-MM-dd'));
          } else {
            formData.set(key, value);
          }
        }
      );

      this.albumService.storeAlbum(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    // if (this.createAlbumForm.valid) {
    //let filelist: FileList = this.files;
    //    const formData = this.toFormData(this.createAlbumForm.value)
    /*       for (let i = 0; i < filelist.length; i++) {
            this.readyFile = filelist[i];
            formData.append('file[]', this.readyFile[0]);
          } */
    //  }

    //  console.log(formData);
  }
}
