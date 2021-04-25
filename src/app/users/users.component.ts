import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  /*user: User = {
    nickname: 'Facundo',
    email: 'facu@mail.com',
  };*/

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  add(name: string): void {
  }

  delete(user: User): void {
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
}
