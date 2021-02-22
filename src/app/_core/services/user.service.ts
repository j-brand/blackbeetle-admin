import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for all requests on the "user" route
 */
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  createUser(user: FormData): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user`, user);
  }

  updateUser(user: FormData, id: number): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(`${environment.apiUrl}/user/${id}`);
  }

  sendVerification(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${id}`);
  }
}
