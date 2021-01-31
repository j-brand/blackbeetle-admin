import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  text: string;
}
@Component({
  selector: 'app-update-text-dialog',
  templateUrl: './update-text-dialog.component.html',
  styleUrls: ['./update-text-dialog.component.scss']
})
export class UpdateTextDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
