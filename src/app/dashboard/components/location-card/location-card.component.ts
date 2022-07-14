import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionsService } from '@core/services/options.service';
import { GMapMarker } from '@shared/models/g-map-marker';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit {
  @Input()
  marker?: GMapMarker;

  constructor(
    private _snackBar: MatSnackBar,
    private optionService: OptionsService
  ) {}

  ngOnInit(): void {
    if (!this.marker) {
      this.marker = {
        position: new google.maps.LatLng(
          51.789572486986536,
          11.141960620880127
        ),
        info: 'Home',
      };
    }

    this.getLocation();
  }

  getLocation() {
    this.optionService.getOption('my_location').subscribe((res) => {
      this.marker = JSON.parse(res.content);
    });
  }

  updateLocation() {
    this.optionService
      .setOption({
        option: 'my_location',
        content: JSON.stringify(this.marker),
      })
      .subscribe(
        (res) => {
          (this.marker = JSON.parse(res.content)),
            this._snackBar.open('Standort gespeichert.', '', {
              duration: 3000,
            });
        },
        (err) => this._snackBar.open(err.error.message, '', { duration: 3000 })
      );
  }

  setMarker(event: google.maps.MapMouseEvent) {
    this.marker.position = event.latLng;
  }

  locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } else {
      this._snackBar.open(
        'Geolocation wird auf dem Gerät leider nicht unterstützt',
        '',
        {
          duration: 3000,
        }
      );
    }
  }
}
