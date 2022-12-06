import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { Post } from '@core/models/post';
import { FileUploadService } from '@core/services/file-upload.service';
import { PostService } from '@core/services/post.service';
import { UpdateVideoDialogComponent } from '@post/components/update-video-dialog/update-video-dialog.component';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-video-post',
  templateUrl: './edit-video-post.component.html',
  styleUrls: ['./edit-video-post.component.scss'],
})
export class EditVideoPostComponent implements OnInit {
  selectedIndex: number = 0;
  uploadProgress = 0;
  videoUrl: string = '';
  youtubeURL: SafeUrl = '';
  youtubeForm: FormGroup;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('videoInput')
  public videoInput: ElementRef;

  @Input()
  post: Post;

  constructor(
    private postService: PostService,
    private uploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private SafePipe: SafePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.youtubeForm = this.formBuilder.group({
      youtubeCode: new FormControl([''], Validators.required),
    });

    if (this.post.content) {
      let content = JSON.parse(this.post.content);
      if (content.path !== 'youtube') {
        this.videoUrl = `${environment.publicUrl}/${content.path}/${content.filename}`;
        this.selectedIndex = 1;
      } else {
        this.youtubeForm.patchValue({ youtubeCode: content.filename });
        this.youtubeURL = this.SafePipe.transform(
          `https://www.youtube-nocookie.com/embed/${content.filename}`,
          'resourceUrl'
        );
      }
    }
  }

  onFileChanged($event) {
    if (this.videoUrl.length > 0) {
      const dialogRef = this.dialog.open(UpdateVideoDialogComponent, {
        data: {
          headline: 'Video hochladen',
          text: 'Wenn du ein neues Video hochlädst, wird das bisherige Video gelöscht.',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.postService.deleteVideo(this.post.id).subscribe((res) => {
            if (res === true) {
              this.uploadVideo($event.target.files.item(0));
            }
          });
        } else {
          this.videoInput.nativeElement.value = '';
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
          //this.video.nativeElement.load();
          this._snackBar.open('Video wurde hochgeladen', '', {
            duration: 3000,
          });
        }
      });
  }

  onYoutubeSave() {
    if (this.videoUrl.length > 0) {
      const dialogRef = this.dialog.open(UpdateVideoDialogComponent, {
        data: {
          headline: 'Video Überschreiben',
          text: 'Wenn du die ID speichers, wird dein hochgeladenes Video überschieben.',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.postService.deleteVideo(this.post.id).subscribe((res) => {
            if (res === true) {
              this.saveYoutube();
            }
          });
        } else {
          this.videoUrl = '';
        }
      });
    } else {
      this.saveYoutube();
    }
  }

  saveYoutube() {
    const content = {
      path: 'youtube',
      filename: this.youtubeForm.controls['youtubeCode'].value,
    };

    this.postService
      .updatePost({ content: JSON.stringify(content) }, this.post.id)
      .subscribe((res) =>
        this._snackBar.open('Beitrag gespeichert.', '', {
          duration: 2000,
        })
      );
  }
}
