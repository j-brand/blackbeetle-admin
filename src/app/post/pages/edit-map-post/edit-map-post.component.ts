import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '@core/models/post';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UpdateMarkerDialogComponent } from '@post/components/update-marker-dialog/update-marker-dialog.component';
import { PostService } from '@core/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GMapMarker } from '@shared/models/g-map-marker';

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
  markers: GMapMarker[] = [];
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  infoContent = '';

  @Input()
  post: Post;

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    let jsonData = JSON.parse(this.post.content);
    for (const marker of jsonData.coordinates) {
      let position: google.maps.LatLng = new google.maps.LatLng(
        marker.position
      );
      this.mapBounds.extend(position);

      this.markers.push({
        position,
        //ID rausschmeißen wenn im Frontend geändert
        info: marker.id ? marker.id : marker.info,
      });
    }
    this.options.zoom = jsonData.zoomlevel;
    this.options.center = this.mapBounds.getCenter();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    let position = event.latLng;
    this.markers.push({
      position,
      info: '',
    });
  }

  openInfoWindow(marker: MapMarker, info) {
    this.infoContent = info;
    this.infoWindow.open(marker);
  }
  markerDropped(event, id: number) {
    this.markers[id].position = new google.maps.LatLng(
      event.latLng.lat(),
      event.latLng.lng()
    );
  }

  /**-------*/

  deleteMarker(id: number) {
    this.markers = this.markers
      .slice(0, id)
      .concat(this.markers.slice(id + 1, this.markers.length));
  }

  editMarker(id: number) {
    const dialogRef = this.dialog.open(UpdateMarkerDialogComponent, {
      data: {
        description: this.markers[id].info,
        lng: this.markers[id].position.lng(),
        lat: this.markers[id].position.lat(),
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.markers[id].info = data.description;
        this.markers[id].position = new google.maps.LatLng(data.lat, data.lng);
      }
    });
  }

  markerPositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.markers, event.previousIndex, event.currentIndex);
  }

  save() {
    let coordiantes = {
      coordinates: this.markers,
      zoomlevel: this.options.zoom,
    };
    this.postService
      .updatePost({ content: JSON.stringify(coordiantes) }, this.post.id)
      .subscribe((result) =>
        this._snackBar.open('Karte gespeichert!', '', {
          duration: 3000,
        })
      );
  }
}
