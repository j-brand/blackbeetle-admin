import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-video-dialog',
  templateUrl: './update-video-dialog.component.html',
  styleUrls: ['./update-video-dialog.component.scss'],
})
export class UpdateVideoDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdateVideoDialogComponent>) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
