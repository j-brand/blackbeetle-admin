import { Component, OnInit } from '@angular/core';

import { Album } from '@core/models/album';
import { AlbumService } from '@core/services/album.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-index-album',
  templateUrl: './index-album.component.html',
  styleUrls: ['./index-album.component.scss'],
})
export class IndexAlbumComponent implements OnInit {
  albums: Album[];
  displayedColumns: string[] = ['active', 'title', 'time', 'options'];

  constructor(private albumService: AlbumService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe((albums) => (this.albums = albums));
  }

  deleteAlbum(id: Number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        delete: 'Album',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.albumService.deleteAlbum(id).subscribe((res) => {
          if (res) {
            this.albums = this.albums.filter((album) => album.id != id);
          }
        });
      }
    });
  }
}
