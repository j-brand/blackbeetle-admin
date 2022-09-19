import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from '@core/models/subscriber';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  constructor(private http: HttpClient) {}

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${environment.apiUrl}/subscriber`);
  }

  deleteSubscriber(id: Number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subscriber/${id}`);
  }

  sendVerification(id: Number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/subscriber/send-verification/${id}`
    );
  }
}
