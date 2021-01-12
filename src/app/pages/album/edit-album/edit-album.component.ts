import { Component, OnInit } from '@angular/core';

import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '@api/album.service';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


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

  drop2(event: CdkDragDrop<string[]>) {
    console.log(event);
    //moveItemInArray(this.albumImages, event.previousIndex, event.currentIndex);
  }

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
