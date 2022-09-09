import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@core/models/comment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.apiUrl}/comment/${id}`);
  }

  getCommentsByPost(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${environment.apiUrl}/comment/byPost/${id}`
    );
  }

  updateComment(id: number, comment: FormData): Observable<Comment> {
    return this.http.post<Comment>(
      `${environment.apiUrl}/comment/update/${id}`,
      comment
    );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/comment/${id}`);
  }
}
