import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from '@core/models/story';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private http: HttpClient) {}

  createStory(story: FormData) {
    return this.http.post<Story>(`${environment.apiUrl}/story/create`, story);
  }
  updateStory(id: number, story: FormData) {
    return this.http.post<Story>(
      `${environment.apiUrl}/story/update/${id}`,
      story
    );
  }

  getStory(id: Number): Observable<Story> {
    return this.http.get<Story>(`${environment.apiUrl}/story/${id}`);
  }

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${environment.apiUrl}/story`);
  }

  deleteStory(id: Number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/story/${id}`);
  }


}
