import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Comment } from '@core/models/comment';
import { CommentService } from '@core/services/comment.service';
import { DeleteDialogComponent } from '@shared/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-index-comment',
  templateUrl: './index-comment.component.html',
  styleUrls: ['./index-comment.component.scss'],
})
export class IndexCommentComponent implements OnInit {
  constructor(
    private commentService: CommentService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  comments: Comment[];

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.getComments(parseInt(id));
  }

  getComments(id: number) {
    this.commentService
      .getCommentsByPost(id)
      .subscribe((comments) => (this.comments = comments));
  }

  deleteComment(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        delete: 'Kommentar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.commentService.deleteComment(id).subscribe((res) => {
          if (res) {
            this.comments = this.comments.filter((comment) => comment.id != id);
            this._snackBar.open('Kommentar wurde gelöscht', '', {
              duration: 3000,
            });
          }
        });
      }
    });
  }
}
