import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {GlobalConstants} from '../common/global-constants';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;

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
              public userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.invalidData = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.nickname = this.form.get('nickname').value;
        this.password = this.form.get('password').value;
        this.userService.login(this.nickname, this.password)
          .subscribe(data => {
              GlobalConstants.token = data;
              GlobalConstants.loggedUser = this.nickname;
              this.router.navigate(['/dashboard']);
            },
            error => {
              console.log(error);
            }
          );
      } catch (err) {
        this.invalidData = true;
        console.log(err);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
