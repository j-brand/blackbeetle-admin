import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '@api/album.service';
import { Album } from '@model/album';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss'],
})
export class EditAlbumComponent implements OnInit {
  album: Album;

  constructor(
    private albumService: AlbumService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAlbum(Number(this.router.snapshot.paramMap.get('id')));
  }

  getAlbum(id: Number): void {
    this.albumService.getAlbum(id).subscribe(album => this.album = album);
  }
}
