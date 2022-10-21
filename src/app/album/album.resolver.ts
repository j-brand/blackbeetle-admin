import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Breadcrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumResolver implements Resolve<Breadcrumb> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Breadcrumb> {
    console.log('info:',route.data);
    return of({ label: route.data.name, link: state.url } as Breadcrumb);
  }
}
