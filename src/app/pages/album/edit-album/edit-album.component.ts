import { Component, OnInit } from '@angular/core';

import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '@api/album.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Album } from '@model/album';
import { Image } from '@model/image';

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
    private _snackBar: MatSnackBar
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

  imagePositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.albumImages, event.previousIndex, event.currentIndex);
    let img_one = this.albumImages[event.previousIndex];
    let img_two = this.albumImages[event.currentIndex];
    //console.log(this.albumImages);
    this.albumService.updateImagePosition(
      this.album.id,
      img_one.id,
      event.previousIndex
    );
    this.albumService.updateImagePosition(
      this.album.id,
      img_two.id,
      event.currentIndex
    ).subscribe(result=>console.log(result));
    // console.log(event);
    //moveItemInArray(this.albumImages, event.previousIndex, event.currentIndex);
  }
}
