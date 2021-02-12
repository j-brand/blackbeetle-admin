import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '@core/models/album';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  createAlbum(album: Object): Observable<Album> {
    return this.http.post<Album>(`${environment.apiUrl}/album/create`, album);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.apiUrl}/album`);
  }

  getAlbum(id: Number): Observable<Album> {
    return this.http.get<Album>(`${environment.apiUrl}/album/${id}`);
  }

  updateAlbum(id: Number, album: Object): Observable<Album> {
    return this.http.post<Album>(
      `${environment.apiUrl}/album/update/${id}`,
      album
    );
  }

  deleteImage(id: Number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/album/image/${id}`);
  }

  deleteAlbum(id: Number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/album/${id}`);
  }

  updateImagePosition(
    album_id: Number,
    position: Number,
    image_id: Number
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/album/${album_id}/position`, {
      position,
      image_id,
    });
  }
}
