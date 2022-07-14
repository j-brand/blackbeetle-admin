import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NothificationService {
  constructor(private http: HttpClient) {}

  nothify(nothification: FormData) {
    return this.http.post<string>(
      `${environment.apiUrl}/nothify`,
      nothification
    );
  }
}
