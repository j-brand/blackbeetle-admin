import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-album',
  templateUrl: './index-album.component.html',
  styleUrls: ['./index-album.component.scss']
})
export class IndexAlbumComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

}
