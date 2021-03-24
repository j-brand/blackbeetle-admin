import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Upload a file to a given endpoint and return the upload progress
   *
   * @param endpoint  The API endpooint where the file should upload to
   * @param file      File as Formdata Object
   */
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
    let count = 0;
    let fileChunks = this.createChunks(file, 1000000);
    let progress = 0;

    return from(fileChunks).pipe(
      concatMap(() => {
        let formData = this.getFormDate(fileChunks, file.name, count);
        count++;
        return this.upload(endpoint, formData).pipe(
          map((res) => {
            if (res && res.status && res.status == 'progress') {
              progress = this.calcProgress(
                count,
                fileChunks.length,
                res.message
              );
              return { status: 'progress', message: progress };
            } else {
              return res;
            }
          })
        );
      })
    );
  }

  getFormDate(chunks, fileName: string, index: number): FormData {
    let formData = new FormData();

    formData.append('is_last', chunks.length - 1 === index ? '1' : '0');
    formData.append('file', chunks[index], `${fileName}.part`);
    return formData;
  }

  /**
   * Create a number of chunks of given size and return them in an array
   *
   * @param file The file that should be chunked
   * @param chunkSize Single chunk size in byte
   */
  createChunks(file: File, chunkSize: number) {
    let fileChunks = [];
    let chunksCount = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < chunksCount; i++) {
      fileChunks.push(
        file.slice(
          i * chunkSize,
          Math.min(i * chunkSize + chunkSize, file.size),
          file.type
        )
      );
    }
    return fileChunks;
  }

  calcProgress(index, chunksTotalCount, itemProgress): number {
    let fullChunk = 100 / chunksTotalCount;
    let completedChunks = fullChunk * (index - 1);
    let activeChunk = (fullChunk / 100) * itemProgress;
    return Math.round(completedChunks + activeChunk);
  }
}
