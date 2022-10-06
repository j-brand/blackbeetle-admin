import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  notify(notification: FormData) {
    return this.http.post<string>(
      `${environment.apiUrl}/notify`,
      notification
    );
  }
}
