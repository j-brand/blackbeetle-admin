import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface Breadcrumb {
  label: string;
  link: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.buildBreadcrumb(this.activatedRoute);
      }
    });
  }

  buildBreadcrumb(current: ActivatedRoute) {
    if (current.snapshot.data.breadcrumb) {
      console.log(current.snapshot.data.breadcrumb)
      const lastBCLink =
        this.breadcrumbs.length !== 0
          ? this.breadcrumbs[this.breadcrumbs.length - 1].link
          : '';

      let currentBCLink = '';
      if (current?.routeConfig?.path?.startsWith(':')) {
        currentBCLink = current.snapshot.data.breadcrumb.link;
      } else {
        currentBCLink = current?.routeConfig?.path || '';
      }

      this.breadcrumbs.push({
        label: current.snapshot.data.breadcrumb.label,
        link: lastBCLink + '/' + currentBCLink,
      } as Breadcrumb);
    }

    if (current.firstChild !== null) {
      this.buildBreadcrumb(current.firstChild);
    }
  }

  ngOnInit(): void {}
}
