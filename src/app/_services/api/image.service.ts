import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '@model/image';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  updateImageDescription(id: Number, description: FormData  ): Observable<Image> {
    return this.http.post<Image>(
      `${environment.apiUrl}/image/update/${id}`,
      description
    );
  }
}
