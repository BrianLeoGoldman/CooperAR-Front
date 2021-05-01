import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {GlobalConstants} from '../common/global-constants';
import {Router} from '@angular/router';

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
      this.router.navigate(['/dashboard']);
    });
    /*console.log(this.nickname);
    console.log(this.password);*/
  }

  constructor(private router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
  }

}
