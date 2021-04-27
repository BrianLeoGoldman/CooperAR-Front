import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {GlobalConstants} from '../common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nickname: string;
  password: string;

  // tslint:disable-next-line:typedef
  login() {
    /*const user = {nickname: this.nickname, password: this.password};*/
    this.userService.login(this.nickname, this.password).subscribe( data => {
      GlobalConstants.token = data; // console.log(data);
      GlobalConstants.loggedUser = this.nickname;
    });
    /*console.log(this.nickname);
    console.log(this.password);*/
  }

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
