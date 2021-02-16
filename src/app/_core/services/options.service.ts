import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from '@core/models/option';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for all requests on the "options" route
 */
export class OptionsService {
  constructor(private http: HttpClient) {}

  setOption(option: Option) {
    return this.http.post<Option>(`${environment.apiUrl}/option`, option);
  }

  getOption(option: string): Observable<Option> {
    return this.http.get<Option>(`${environment.apiUrl}/option/${option}`);
  }
}
