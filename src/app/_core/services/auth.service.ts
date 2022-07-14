import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '@core/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * @param cred login creadentials (username & password)
   */
  login(cred: Object) {
    this.http.get(environment.csrf).subscribe();

    return this.http.post<User>(`${environment.apiUrl}/auth/login`, cred).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  } 

  /**
   * Remove the user data from the local Storage
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.http
      .post(`${environment.apiUrl}/auth/logout`, {})
      .subscribe((res) => {});

    this.currentUserSubject.next(null);
  }
}
