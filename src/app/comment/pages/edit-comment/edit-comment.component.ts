import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@core/models/comment';
import { CommentService } from '@core/services/comment.service';
import { HelperService } from '@shared/services/helper.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss'],
})
export class EditCommentComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;

  constructor(
    private helperService: HelperService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private _snackBar: MatSnackBar
  ) {
    this.commentForm = this.formBuilder.group({
      name: new FormControl([0], Validators.required),
      content: new FormControl([''], Validators.required),
      created_at: new FormControl([''], Validators.required),
    });
  }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.getComment(parseInt(id));
    console.log(this.comment);
  }

  getComment(id: number) {
    this.commentService.getComment(id).subscribe((comment) => {
      this.comment = comment;
      this.commentForm.patchValue(this.comment);
    });
  }

  onSubmit() {
    var formValues = this.helperService.getUpdatedValues(this.commentForm);

    if (Object.keys(formValues).length != 0) {
      this.commentService
        .updateComment(
          this.comment.id,
          this.helperService.toFormData(formValues)
        )
        .subscribe({
          next: (data) => {
            this._snackBar.open('Beitragsdetails wurden gespeichert', '', {
              duration: 3000,
            });
          },
          error: (err) => {
            this._snackBar.open(err.error.message, '', {
              duration: 3000,
            });
          },
        });
    }
  }
}
