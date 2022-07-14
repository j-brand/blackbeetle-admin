import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '@core/services/post.service';
import { StoryService } from '@core/services/story.service';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';
import { Post } from '@core/models/post';
import { Story } from '@core/models/story';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss'],
})
export class EditStoryComponent implements OnInit {
  story: Story;
  posts: Post[] = null;
  expand: boolean = false;

  displayedColumns: string[] = [
    'drag',
    'active',
    'type',
    'title',
    'date',
    'options',
  ];

  constructor(
    private storyService: StoryService,
    private postService: PostService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let storyID = this.activeRoute.snapshot.paramMap.get('id');
    this.getStory(parseInt(storyID));
  }

  /**
   * Get the story with images from the API.
   * @param id story ID
   */
  getStory(id: number): void {
    this.storyService.getStory(id).subscribe((story) => {
      this.story = story;
      this.posts = story.posts;
    });
  }

  /**
   * Delete the post from the story
   * @param id image ID
   */
  deletePost(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        article: 'den',
        delete: 'Beitrag',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.deletePost(id).subscribe((res) => {
          if (res) {
            this.posts = this.posts.filter((post) => post.id != id);
          }
        });
      }
    });
  }

  /**
   * Swap the positions von two images.
   * @param event Mat Drag & Drop Event
   */
  postPositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.posts, event.previousIndex, event.currentIndex);
    let post_one = this.posts[event.previousIndex];
    let post_two = this.posts[event.currentIndex];

    this.postService
      .updatePost({ position: event.previousIndex }, post_one.id)
      .subscribe();

    this.postService
      .updatePost({ position: event.currentIndex }, post_two.id)
      .subscribe();
  }

  createPost(type: string) {
    let post = { type: type, active: 0, story_id: this.story.id };
    this.postService.createPost(post).subscribe({
      next: (newPost) => {
        this.router.navigate(['/post/' + newPost.id]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
