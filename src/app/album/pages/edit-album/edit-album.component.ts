import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '@core/services/album.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Album } from '@core/models/album';
import { Image } from '@core/models/image';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';
import { ImageService } from '@core/services/image.service';
import { UpdateImageDialogComponent } from '@shared/components/dialogs/update-image-dialog/update-image-dialog.component';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss'],
})
export class EditAlbumComponent implements OnInit {
  album: Album;
  uploadURL: String = null;
  albumImages: Image[] = null;

  constructor(
    private albumService: AlbumService,
    private imageService: ImageService,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let albumID = this.router.snapshot.paramMap.get('id');
    this.getAlbum(parseInt(albumID));
    this.uploadURL = 'album/upload/' + albumID;
  }

  /**
   * Get the album with images from the API.
   * @param id album ID
   */
  getAlbum(id: number): void {
    this.albumService.getAlbum(id).subscribe((album) => {
      this.album = album;
      this.albumImages = album.images;
    });
  }

  /**
   * Add the image file to the array of images
   * @param $file Image
   */
  addToAlbumImages($file: Image) {
    this.albumImages.push($file);
  }

  /**
   * Delte the image from the album
   * @param id image ID
   */
  deleteImage(id: Number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        delete: 'Bild',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.imageService.deleteImage(id).subscribe((res) => {
          if (res) {
            this.albumImages = this.albumImages.filter(
              (image) => image.id != id
            );
            this._snackBar.open('Bild wurde gelöscht.', '', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  /**
   * Swap the positions von two images.
   * @param event Mat Drag & Drop Event
   */
  imagePositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.albumImages, event.previousIndex, event.currentIndex);
    let img_one = this.albumImages[event.previousIndex];
    let img_two = this.albumImages[event.currentIndex];
    this.albumService
      .updateImagePosition(this.album.id, event.previousIndex, img_one.id)
      .subscribe();
    this.albumService
      .updateImagePosition(this.album.id, event.currentIndex, img_two.id)
      .subscribe();
  }

  editImage(id: number) {
    let image: Image = this.albumImages.filter((image) => image.id == id)[0];
    const dialogRef = this.dialog.open(UpdateImageDialogComponent, {
      data: {
        image: image,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateImageDescription(image.id, result);
      }
    });
  }

  updateImageDescription(id: number, description: string) {
    let formData = new FormData();
    formData.set('description', description);
    this.imageService.updateImageDescription(id, formData).subscribe(
      (image) => {
        this.albumImages[
          this.albumImages.findIndex((el) => el.id == id)
        ] = image;
        this._snackBar.open('Bildbeschreibung geändert.', '', {
          duration: 3000,
        });
      },
      (err) => {
        this._snackBar.open(err.error.message, '', { duration: 3000 });
      }
    );
  }
}
