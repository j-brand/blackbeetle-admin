import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  description: string;
  lng: number;
  lat: number;
}

@Component({
  selector: 'app-update-marker-dialog',
  templateUrl: './update-marker-dialog.component.html',
  styleUrls: ['./update-marker-dialog.component.scss'],
})
export class UpdateMarkerDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  lng: number;
  lat: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<UpdateMarkerDialogComponent>,
    private fb: FormBuilder
  ) {
    this.description = data.description;
    this.lng = data.lng;
    this.lat = data.lat;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      lng: [this.lng, []],
      lat: [this.lat, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
