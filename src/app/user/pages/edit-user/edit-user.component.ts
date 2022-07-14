import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let UserID = this.router.snapshot.paramMap.get('id');
    this.getUser(parseInt(UserID));
  }
  getUser(UserID: number) {
    this.userService.getUser(UserID).subscribe((user) => (this.user = user));
  }
}
