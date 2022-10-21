import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  headline: string;
  text: string;
}

@Component({
  selector: 'app-update-video-dialog',
  templateUrl: './update-video-dialog.component.html',
  styleUrls: ['./update-video-dialog.component.scss'],
})
export class UpdateVideoDialogComponent {
  headline: string;
  text: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UpdateVideoDialogComponent>
  ) {
    this.headline = data.headline;
    this.text = data.text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
