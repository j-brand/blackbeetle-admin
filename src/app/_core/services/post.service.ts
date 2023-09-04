import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@core/models/post';
import { Image } from '@core/models/image';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for all requests on the "post" route
 */
export class PostService {
  constructor(private http: HttpClient) {}

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/post/${id}`);
  }

  createPost(post: Object): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/post/create`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/post/${id}`);
  }

  deleteVideo(id: Number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/post/video/${id}`);
  }

  updatePost(post: Object, id: Number) {
    return this.http.post<Post>(
      `${environment.apiUrl}/post/update/${id}`,
      post
    );
  }
  
  uploadImage(image: Object, id: Number) {
    return this.http.post<Image>(
      `${environment.apiUrl}/post/upload/${id}`,
      image
    );
  }

  updateImagePosition(
    post_id: Number,
    position: Number,
    image_id: Number
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/post/${post_id}/position`, {
      position,
      image_id,
    });
  }
  swapImagePosition(
    post_id: Number,
    currentIndex: Number,
    previousIndex: Number,
    image_id: Number
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/post/${post_id}/swap`, {
      currentIndex,
      previousIndex,
      image_id,
    });
  }


}
