import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

  upload(APIEndpoint: String, file: FormData) {
    let uploadURL = `${environment.apiUrl}/${APIEndpoint}`;

    return this.httpClient
      .post<any>(uploadURL, file, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;

            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
}
