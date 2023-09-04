import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@core/models/post';
import { Image } from '@core/models/image';
import { PostService } from '@core/services/post.service';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-html-post',
  templateUrl: './edit-html-post.component.html',
  styleUrls: ['./edit-html-post.component.scss'],
})
export class EditHtmlPostComponent implements OnInit {
  tinyApiKey: String = environment.tiny_mce_key;
  tinyMceConfig: any;
  contentForm: FormGroup;

  @Input()
  post: Post;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contentForm = this.formBuilder.group({
      content: new FormControl(['', Validators.required]),
    });
    this.contentForm.patchValue({ content: this.post.content });
    this.initTinyMce();
  }

  onSubmit() {
    this.postService
      .updatePost(this.contentForm.value, this.post.id)
      .subscribe((res) =>
        this._snackBar.open('Beitrag gespeichert.', '', {
          duration: 2000,
        })
      );
  }

  initTinyMce() {
    this.tinyMceConfig = {
      icons: 'material',
      skin: 'borderless',
      initialValue: 'Once upon a time...',
      plugins: [
        'advlist autolink lists link image imagetools charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'media table paste code help wordcount autosave',
      ],
      toolbar:
        'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | image | fullscreen',
      menubar: false,
      mobile: {
        theme: 'mobile',
      },
      autosave_interval: '10s',
      min_height: 400,
      images_upload_handler: (blobInfo, success, failure) => {
        this.uploadImage(blobInfo.blob())
          .then((image: Image) => {
            success(
              `${environment.publicUrl}/storage/${image.path}${image.title}_large.${image.extension}`
            );
          })
          .catch((error) => {
            failure(error);
          });
      },
    };
  }
  public uploadImage(imageData: Blob) {
    let that = this;
    return new Promise(function (resolve, reject) {
      let fd = new FormData();
      fd.set('file', imageData);
      that.postService.uploadImage(fd, that.post.id).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }
}
