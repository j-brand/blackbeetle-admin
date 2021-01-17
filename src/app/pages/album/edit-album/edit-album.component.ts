import { Component, OnInit } from '@angular/core';

import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '@api/album.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Album } from '@model/album';
import { Image } from '@model/image';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@component/dialogs/delete-dialog/delete-dialog.component';

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
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let albumID = this.router.snapshot.paramMap.get('id');
    this.getAlbum(Number(albumID));
    this.uploadURL = 'album/upload/' + albumID;
  }

  getAlbum(id: Number): void {
    this.albumService.getAlbum(id).subscribe((album) => {
      this.album = album;
      this.albumImages = album.images;
    });
  }

  addToAlbumImages($file: Image) {
    console.log($file);
    this.albumImages.push($file);
  }

  deleteImage(id: Number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.albumService.deleteImage(id).subscribe((res) => {
          if (res) {
            this.albumImages = this.albumImages.filter(
              (image) => image.id != id
            );
          }
        });
      }
    });
  }

  imagePositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.albumImages, event.previousIndex, event.currentIndex);
    let img_one = this.albumImages[event.previousIndex];
    let img_two = this.albumImages[event.currentIndex];
    //console.log(this.albumImages);
    this.albumService
      .updateImagePosition(this.album.id, event.previousIndex, img_one.id)
      .subscribe((result) => console.log(result));
    this.albumService
      .updateImagePosition(this.album.id, event.currentIndex, img_two.id)
      .subscribe((result) => console.log(result));
    // console.log(event);
    //moveItemInArray(this.albumImages, event.previousIndex, event.currentIndex);
  }
}
