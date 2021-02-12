import { Component, OnInit } from '@angular/core';

import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss'],
})
export class IndexUserComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'name', 'email', 'active', 'options'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      if (res) {
        this.users = this.users.filter((user) => user.id != id);
      }
    });
  }
}
