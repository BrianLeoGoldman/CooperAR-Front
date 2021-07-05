import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../services/user.service';
import {Task} from '../model/task';
import {of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  // tslint:disable-next-line:variable-name
  _listFilter = '';

  usersLength = 0;
  $userValues = of();
  userPageEvent: PageEvent; // MatPaginator Output

  constructor(private userService: UserService) {
    this.users = [];
    this.filteredUsers = this.users;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        this.filteredUsers = this.users;
        this.listFilter = '';
        this.$userValues = of(this.filteredUsers);
        this.usersLength = this.filteredUsers.length;
      });
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter ? this.doFilter(this.listFilter) : this.users;
    this.$userValues = of(this.filteredUsers);
    this.usersLength = this.filteredUsers.length;
  }

  doFilter(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: User) =>
      (user.nickname.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (user.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (user.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }

}
