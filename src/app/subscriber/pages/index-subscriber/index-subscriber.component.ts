import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscriber } from '@core/models/subscriber';
import { SubscriberService } from '@core/services/subscriber.service';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-index-subscriber',
  templateUrl: './index-subscriber.component.html',
  styleUrls: ['./index-subscriber.component.scss'],
})
export class IndexSubscriberComponent implements OnInit {
  subscribers: Subscriber[];
  displayedColumns: string[] = ['name', 'email', 'verified', 'options'];

  constructor(
    private subscriberService: SubscriberService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSubscribers();
  }

  getSubscribers(): void {
    this.subscriberService
      .getSubscribers()
      .subscribe((subscribers) => (this.subscribers = subscribers));
  }

  deleteSubscriber(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        delete: 'Abonnenten',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscriberService.deleteSubscriber(id).subscribe((res) => {
          if (res) {
            this.subscribers = this.subscribers.filter((sub) => sub.id != id);
          }
        });
      }
    });
  }
  resendVerification(id: number) {
    this.subscriberService.sendVerification(id).subscribe(
      (response) =>
        this._snackBar.open(response.message, '', {
          duration: 3000,
        }),
      (err) => {
        console.log(err);
      }
    );
  }
}
