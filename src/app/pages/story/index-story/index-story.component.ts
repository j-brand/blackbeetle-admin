import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoryService } from '@api/story.service';
import { DeleteDialogComponent } from '@component/dialogs/delete-dialog/delete-dialog.component';
import { Story } from '@model/story';

@Component({
  selector: 'app-index-story',
  templateUrl: './index-story.component.html',
  styleUrls: ['./index-story.component.scss'],
})
export class IndexStoryComponent implements OnInit {
  stories: Story[];
  displayedColumns: string[] = ['active', 'title', 'options'];

  constructor(private storyService: StoryService, public dialog: MatDialog) {}

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
}
