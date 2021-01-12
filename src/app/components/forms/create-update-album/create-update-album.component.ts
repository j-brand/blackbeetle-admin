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

import { MyDateAdapter, MY_DATE_FORMATS } from '@helper/date-adapter';

import * as _moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '@model/album';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const moment = _moment;
@Component({
  selector: 'app-create-update-album',
  templateUrl: './create-update-album.component.html',
  styleUrls: ['./create-update-album.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ],
})
export class CreateUpdateAlbumComponent implements OnInit {
  albumForm: FormGroup;
  imgPath: String;
  editMode: Boolean = false;
  album: Album;
  message: String;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    public datepipe: DatePipe,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.albumForm = this.formBuilder.group({
      active: [1],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      image_upload: [''],
      title_image_text: [''],
      start_date: new FormControl(moment()),
      end_date: new FormControl(moment()),
    });

    let albumID = this.router.snapshot.paramMap.get('id');
    if (albumID) {
      this.editMode = true;
      this.getAlbum(Number(albumID));
    }
  }

  getAlbum(id: Number): void {
    this.albumService.getAlbum(id).subscribe((album) => {
      this.album = album;
      this.albumForm.patchValue(album);
      this.imgPath = `${environment.publicUrl}/storage/${album.title_image.path}${album.title_image.title}.${album.title_image.extension}`;
      //Set all formcontrols untouched
      Object.keys(this.albumForm.controls).forEach((controlKey) => {
        this.albumForm.controls[controlKey].markAsUntouched();
      });
    });
  }

  //Get all touched form values
  getUpdatedValues() {
    const updatedFormValues = {};
    this.albumForm['_forEachChild']((control, name) => {
      if (control.touched) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
  }

  //Add preview Image on File Input Change
  public onFileChanged(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgPath = reader.result as string;
        this.albumForm.patchValue({ image_upload: file });
        this.albumForm.controls['image_upload'].markAsTouched();
      };
    }
  }


  public onActiveChange(event: any) {
    if (event.checked) {
      this.albumForm.patchValue({ active: 1 });
    } else {
      this.albumForm.patchValue({ active: 0 });
    }
  }

  /*   onSubmit() {
    if (this.albumForm.valid) {
      if(this.editMode){
        let formValues = 

      }else{

      }
      const formData = new FormData();
      Object.entries(this.albumForm.value).forEach(([key, value]: any[]) => {
        if (value instanceof Date) {
          formData.set(key, this.datepipe.transform(value, 'Y-MM-dd'));
        } else {
          formData.set(key, value);
        }
      });

      this.albumService.storeAlbum(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  } */
  onSubmit() {
    var formValues = this.getUpdatedValues();

    if (Object.keys(formValues).length != 0) {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]: any[]) => {
        if (key == 'start_date' || key == 'end_date') {
          formData.set(key, this.datepipe.transform(value, 'Y-MM-dd'));
        } else if (!(value instanceof Date)) {
          formData.set(key, value);
        }
      });

      if (this.editMode) {
        this.albumService.updateAlbum(this.album.id, formData).subscribe({
          next: (data) => {
            this._snackBar.open('Album Details gespeichert!', '', {
              duration: 3000,
            });
          },
          error: (error) => {
            this._snackBar.open('Album Details gespeichert!', '', {
              duration: 3000,
            });
          },
        });
      } else {
        this.albumService.storeAlbum(formData).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }
}
