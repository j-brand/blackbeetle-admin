import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, expand, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  file: File;
  chunks = [];
  chunksCount: number;
  chunkProgress: number = 0;
  endpoint: string;
  emit = (f) => of(f);

  constructor(private httpClient: HttpClient) {}

  upload(endpoint: String, file: FormData) {
    let uploadURL = `${environment.apiUrl}/${endpoint}`;

    return this.httpClient
      .post<any>(uploadURL, file, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }

  uploadInChunks(file: File, endpoint: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/octet-stream');

    this.file = file;
    let count = 0;
    this.createChunks();

    return from(this.chunks).pipe(
      concatMap((chunk) => {
        count++;
        let formData = new FormData();
        formData.set('is_last', String(this.chunks.length === count));
        formData.set('file', chunk, `${this.file.name}.part`);
        return this.upload(endpoint, formData).pipe(
          map((res) => {
            if (res && res.status && res.status == 'progress') {
              this.calcProgress(count, res.message);
              return { status: 'progress', message: this.chunkProgress };
            } else {
              return res;
            }
          })
        );
      })
    );
  }

  createChunks() {
    let size = 1000000,
      chunks = Math.ceil(this.file.size / size);

    for (let i = 0; i < chunks; i++) {
      this.chunks.push(
        this.file.slice(
          i * size,
          Math.min(i * size + size, this.file.size),
          this.file.type
        )
      );
    }
    this.chunksCount = this.chunks.length;
  }
  calcProgress(item, progress) {
    let fullChunk = 100 / this.chunksCount;
    let completedChunks = fullChunk * (item - 1);
    let activeChunk = (fullChunk / 100) * progress;
    this.chunkProgress = Math.round(completedChunks + activeChunk);
  }
}
