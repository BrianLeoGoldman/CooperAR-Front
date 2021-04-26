import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor() {}

  // tslint:disable-next-line:typedef
  register() {
    console.log(this.email);
    console.log(this.password);
  }

  ngOnInit(): void {
  }

}
