import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blackbeetle-admin';
  ngOnInit() {
    this.loadScript();
  }

  public loadScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.google_api_key}`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
