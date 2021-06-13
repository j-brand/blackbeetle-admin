import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlbumService } from '@core/services/album.service';
import * as _moment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '@core/models/album';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Input } from '@angular/core';
import { HelperService } from '@shared/services/helper.service';

const moment = _moment;
@Component({
  selector: 'app-create-update-album',
  templateUrl: './create-update-album.component.html',
  styleUrls: ['./create-update-album.component.scss'],
})
export class CreateUpdateAlbumComponent implements OnInit {
  albumForm: FormGroup;
  imgPath: String;
  editMode: boolean = false;
  message: String;
  detailsExpanded: boolean = false;

  @Input()
  album?: Album;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.albumForm = this.formBuilder.group({
      active: new FormControl([0], Validators.required),
      title: new FormControl([''], Validators.required),
      slug: new FormControl([''], Validators.required),
      description: new FormControl([''], Validators.required),
      image_upload: new FormControl(['']),
      title_image_text: new FormControl(['']),
      start_date: new FormControl(moment()),
      end_date: new FormControl(moment()),
    });

    if (this.album) {
      this.setEditMode(this.album);
    } else {
      this.detailsExpanded = true;
    }
  }

  private setEditMode(album: Album) {
    this.editMode = true;
    this.albumForm.patchValue(album);
    this.albumForm.markAsPristine();
    this.imgPath = `${environment.publicUrl}/storage/${album.title_image.path}${album.title_image.title}.${album.title_image.extension}`;
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

  onSubmit() {
    var formValues = this.helperService.getUpdatedValues(this.albumForm);

    if (this.editMode) {
      this.albumService
        .updateAlbum(this.album.id, this.helperService.toFormData(formValues))
        .subscribe({
          next: (data) => {
            this.detailsExpanded = false;
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
      this.albumService
        .createAlbum(this.helperService.toFormData(this.albumForm.value))
        .subscribe({
          next: (data) => {
            this.router.navigate(['/album/' + data.id]);
          },
          error: (error) => {
            if (error.errors) {
              Object.entries(error.errors).forEach(([key, value]: any[]) => {
                this.albumForm.controls[key].setErrors(value);
              });
            }
          },
        });
    }
  }
}
