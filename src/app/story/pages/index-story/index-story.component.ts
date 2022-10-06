import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoryService } from '@core/services/story.service';
import { Story } from '@core/models/story';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';
import { NotifySubscibersDialogComponent } from '@story/components/notify-subscibers-dialog/notify-subscibers-dialog.component';
import { NotificationService } from '@core/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index-story',
  templateUrl: './index-story.component.html',
  styleUrls: ['./index-story.component.scss'],
})
export class IndexStoryComponent implements OnInit {
  stories: Story[];
  displayedColumns: string[] = ['active', 'title', 'options'];

  constructor(
    private storyService: StoryService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories(): void {
    this.storyService
      .getStories()
      .subscribe((stories) => (this.stories = stories));
  }

  deleteStory(id: Number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        delete: 'Geschichte',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.storyService.deleteStory(id).subscribe((res) => {
          if (res) {
            this.stories = this.stories.filter((story) => story.id != id);
          }
        });
      }
    });
  }

  sendNotification(id: number, data?: any) {
    const dialogRef = this.dialog.open(NotifySubscibersDialogComponent, {
      data: data ? data : { subject: '', content: '', image: '' },
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result['option'] = 'S' + id;
      result['slug'] = this.stories.filter((story) => story.id == id)[0].slug;
      this.notificationService.notify(result).subscribe({
        next: (result) => {
          this._snackBar.open('Benachrichtigungen werden verschickt!', '', {
            duration: 3000,
          });
        },
        error: (er) => {
          this.sendNotification(id, {
            subject: result['subject'],
            content: result['content'],
            image: result['image'],
          });

          this._snackBar.open(er.message, '', {
            duration: 3000,
          });
        },
      });
    });
  }
}
