import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for all other admin routes.
 */
export class AdminService {
  constructor(private http: HttpClient) {}

  /**
   * Get all data for the dashboard view.
   */
  getDashboard(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/dashboard`);
  }
}
