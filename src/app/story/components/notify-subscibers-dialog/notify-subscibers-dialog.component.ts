import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  subject: string;
  content: string;
  image: string;
}

@Component({
  selector: 'app-notify-subscibers-dialog',
  templateUrl: './notify-subscibers-dialog.component.html',
  styleUrls: ['./notify-subscibers-dialog.component.scss'],
})
export class NotifySubscibersDialogComponent implements OnInit {
  imgPath: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<NotifySubscibersDialogComponent>
  ) {}

  ngOnInit() {
    if (this.data.image) {
      this.imageChange(this.data.image);
    }
  }

  //Add preview Image on File Input Change
  public imageChange(event: string) {
    this.data.image = event;
    this.imgPath = event;
  }
}
