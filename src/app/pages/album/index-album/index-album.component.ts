import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Album } from '@model/album';
import { AlbumService } from '@api/album.service';

@Component({
  selector: 'app-index-album',
  templateUrl: './index-album.component.html',
  styleUrls: ['./index-album.component.scss'],
})
export class IndexAlbumComponent implements OnInit {
  albums: Album[];
  displayedColumns: string[] = ['active', 'title', 'time', 'options'];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe((albums) => (this.albums = albums));
  }
}
