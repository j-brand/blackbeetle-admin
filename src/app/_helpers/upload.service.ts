import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  upload(url, formData) {
    return this.httpClient.post<any>(environment.apiUrl + url, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
