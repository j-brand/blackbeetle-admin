import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '@model/album';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private httpClient: HttpClient) { }

  storeAlbum(album: FormData): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/album/create`, album);
  }
}
