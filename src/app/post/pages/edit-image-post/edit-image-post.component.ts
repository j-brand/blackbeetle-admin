import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from '@core/services/image.service';
import { PostService } from '@core/services/post.service';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateImageDialogComponent } from '@shared/components/dialogs/update-image-dialog/update-image-dialog.component';
import { Post } from '@core/models/post';
import { Image } from '@core/models/image';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-image-post',
  templateUrl: './edit-image-post.component.html',
  styleUrls: ['./edit-image-post.component.scss'],
})
export class EditImagePostComponent implements OnInit {
  uploadURL: String = null;

  @Input()
  post: Post;

  constructor(
    private imageService: ImageService,
    public dialog: MatDialog,
    private postService: PostService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.uploadURL = 'post/upload/' + this.post.id;
  }

  /**
   * Add the image file to the array of images
   * @param $file Image
   */
  addToPostImages($file: Image) {
    this.post.images.push($file);
  }

  /**
   * Delte the image from the album
   * @param id image ID
   */
  deleteImage(id: Number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        delete: 'Bild',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.imageService.deleteImage(id).subscribe((res) => {
          if (res) {
            this.post.images = this.post.images.filter(
              (image) => image.id != id
            );
          }
        });
      }
    });
  }

  /**
   * Swap the positions von two images.
   * @param event Mat Drag & Drop Event
   */
  /*   imagePositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.post.images, event.previousIndex, event.currentIndex);
    let img_one = this.post.images[event.previousIndex];
    let img_two = this.post.images[event.currentIndex];
    this.postService
      .updateImagePosition(this.post.id, event.previousIndex, img_one.id)
      .subscribe();
    this.postService
      .updateImagePosition(this.post.id, event.currentIndex, img_two.id)
      .subscribe();
  } */
  imagePositionChanged(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.post.images, event.previousIndex, event.currentIndex);
    let img_one = this.post.images[event.previousIndex];
    let img_two = this.post.images[event.currentIndex];
    this.postService
      .swapImagePosition(
        this.post.id,
        event.currentIndex + 1,
        event.previousIndex + 1,
        img_two.id
      )
      .subscribe();
  }

  editImage(id: number) {
    let image: Image = this.post.images.filter((image) => image.id == id)[0];
    const dialogRef = this.dialog.open(UpdateImageDialogComponent, {
      data: {
        image: image,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateImageDescription(image.id, result);
      }
    });
  }

  updateImageDescription(id: number, description: string) {
    let formData = new FormData();
    formData.set('description', description);
    this.imageService.updateImageDescription(id, formData).subscribe(
      (image) => {
        this.post.images[this.post.images.findIndex((el) => el.id == id)] =
          image;
        this._snackBar.open('Bildbeschreibung geändert.', '', {
          duration: 3000,
        });
      },
      (err) => {
        this._snackBar.open(err.error.message, '', {
          duration: 3000,
        });
      }
    );
  }
}
