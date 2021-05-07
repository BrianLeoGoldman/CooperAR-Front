import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {Project} from '../model/project';
import {GlobalConstants} from '../common/global-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nickname: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  email: string;
  birthday: string;
  province: string;
  money: number;
  newUser: User = { nickname: '', firstname: '', lastname: '', password: '', email: '', birthday: '', province: '', money: 0, projects: []};

  constructor(private router: Router, private userService: UserService) {}

  // tslint:disable-next-line:typedef
  register() {
    console.log(this.email);
    console.log(this.password);
    // tslint:disable-next-line:label-position
    this.fillNewUser();
    this.userService.registerUser(this.newUser)
      .subscribe(data => {
        GlobalConstants.token = data;
        GlobalConstants.loggedUser = this.nickname;
        this.router.navigate(['/dashboard']);
      });
  }

  // tslint:disable-next-line:typedef
  fillNewUser() {
    this.newUser.nickname = this.nickname;
    this.newUser.firstname = this.firstname;
    this.newUser.lastname = this.lastname;
    this.newUser.password = this.password;
    this.newUser.email = this.email;
    this.newUser.projects = [];
  }

  ngOnInit(): void {
  }

}
