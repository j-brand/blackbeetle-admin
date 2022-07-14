import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loadingMap: Map<String, boolean> = new Map<string, boolean>();

  constructor() {}

  setLoading(loading: boolean, url: String): void {
    if (!url) {
      throw new Error('Request URL must be provided');
    }

    if (loading == true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading == false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size == 0) {
      this.loadingSub.next(false);
    }
  }
}
