import { Component, OnInit } from '@angular/core';

import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'name', 'email', 'active'];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(users => this.users = users);
  }


}
