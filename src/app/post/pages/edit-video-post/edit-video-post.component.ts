import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '@core/models/post';
import { FileUploadService } from '@core/services/file-upload.service';
import { PostService } from '@core/services/post.service';
import { UpdateVideoDialogComponent } from '@post/components/update-video-dialog/update-video-dialog.component';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-video-post',
  templateUrl: './edit-video-post.component.html',
  styleUrls: ['./edit-video-post.component.scss'],
})
export class EditVideoPostComponent implements OnInit {
  uploadProgress = 0;
  videoUrl: string = '';

  @ViewChild('video')
  public video: ElementRef;

  @Input()
  post: Post;

  constructor(
    private postService: PostService,
    private uploadService: FileUploadService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.post.content) {
      let content = JSON.parse(this.post.content);
      this.videoUrl = `${environment.publicUrl}/${content.path}/${content.filename}`;
    }
  }

  onFileChanged($event) {
    if (this.videoUrl.length > 0) {
      const dialogRef = this.dialog.open(UpdateVideoDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.postService.deleteVideo(this.post.id).subscribe((res) => {
            if (res === true) {
              this.uploadVideo($event.target.files.item(0));
            }
          });
        }
      });
    } else {
      this.uploadVideo($event.target.files.item(0));
    }
  }

  uploadVideo(file: File) {
    this.uploadService
      .uploadInChunks(file, `post/upload-video/${this.post.id}`)
      .subscribe((result) => {
        if (result && result.status && result.status == 'progress') {
          this.uploadProgress = result.message;
        } else if (result.id) {
          this.post = result;
          let content = JSON.parse(result.content);
          this.videoUrl = `${environment.publicUrl}/${content.path}/${content.filename}`;
          this.video.nativeElement.load();
          this._snackBar.open('Video wurde hochgeladen', '', {
            duration: 3000,
          });
        }
      });
  }
}
