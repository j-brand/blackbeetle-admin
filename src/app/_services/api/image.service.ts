import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '@model/image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}
}
