import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '@model/album';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  storeAlbum(album: FormData): Observable<Album> {
    return this.http.post<Album>(`${environment.apiUrl}/album/create`, album);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.apiUrl}/album`);
  }

  getAlbum(id: Number): Observable<Album> {
    return this.http.get<Album>(`${environment.apiUrl}/album/${id}`);
  }

  updateAlbum(id: Number, album: FormData): Observable<Album> {
    return this.http.post<Album>(
      `${environment.apiUrl}/album/update/${id}`,
      album
    );
  }

  updateImagePosition(
    id: Number,
    position: Number,
    imageID: Number
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/album/${id}`, {
      position,
      imageID,
    });
  }
}
