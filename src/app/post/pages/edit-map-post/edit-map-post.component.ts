import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTextDialogComponent } from '@shared/components/dialogs/update-text-dialog/update-text-dialog.component';
import { Post } from '@core/models/post';

@Component({
  selector: 'app-edit-map-post',
  templateUrl: './edit-map-post.component.html',
  styleUrls: ['./edit-map-post.component.scss'],
})
export class EditMapPostComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  mapBounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
  options: google.maps.MapOptions = {
    center: null,
    zoom: null,
  };
  markers = [];
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  infoContent = '';

  @Input()
  post: Post;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    let jsonData = JSON.parse(this.post.content);
    console.log(jsonData);
    for (const marker of jsonData.coordinates) {
      let position: google.maps.LatLng = new google.maps.LatLng(
        marker.position
      );
      this.markerPositions.push(position.toJSON());
      this.mapBounds.extend(position);

      this.markers.push({
        position: {
          lat: marker.position.lat,
          lng: marker.position.lng,
        },
        info: marker.id,
      });
    }
    this.options.zoom = jsonData.zoomlevel;
    this.options.center = this.mapBounds.getCenter();
    console.log(this.markers);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    let position = event.latLng.toJSON();
    this.markers.push({
      position,
      info: '',
    });
    console.log(this.markers);
  }

  openInfoWindow(marker: MapMarker, info) {
    this.infoContent = info;
    this.infoWindow.open(marker);
  }
  markerDragged(event) {
    console.log(event);
  }

  /**-------*/

  deleteMarker(id: number) {
    this.markers = this.markers
      .slice(0, id)
      .concat(this.markers.slice(id + 1, this.markers.length));
  }

  editMarker(id: number) {
    const dialogRef = this.dialog.open(UpdateTextDialogComponent, {
      data: {
        text: this.markers[id].info,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.markers[id].info = result;
      }
    });
  }
}
