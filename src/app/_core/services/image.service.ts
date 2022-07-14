import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '@core/models/image';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  /**
   * Service for all requests on the "image" route
   */
  updateImageDescription(id: Number, description: FormData): Observable<Image> {
    return this.http.post<Image>(
      `${environment.apiUrl}/image/update/${id}`,
      description
    );
  }

  deleteImage(id: Number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/image/${id}`);
  }

}
