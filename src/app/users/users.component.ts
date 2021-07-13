import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../services/user.service';
import {of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {filterUsersByText} from '../common/userFilters';

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
      .subscribe(users => this.processUsers(users));
  }

  processUsers(users: User[]): void {
    this.users = users;
    this.filteredUsers = this.users;
    this.listFilter = '';
    this.$userValues = of(this.filteredUsers);
    this.usersLength = this.filteredUsers.length;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterUsers();
  }

  filterUsers(): void {
    this.filteredUsers = this.users;
    if (this._listFilter) { this.filteredUsers = filterUsersByText(this._listFilter, this.filteredUsers); }
    this.usersLength = this.filteredUsers.length;
    this.$userValues = of(this.filteredUsers);
  }

}
