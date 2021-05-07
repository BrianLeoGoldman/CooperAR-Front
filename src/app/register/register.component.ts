import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {GlobalConstants} from '../common/global-constants';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
/*export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /*nameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[0-9])'),
  ]);*/

  /*matcher = new MyErrorStateMatcher();*/

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;

  provinces: string[] = ['Buenos Aires', 'Chaco', 'Formosa', 'Rio Negro'];

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

  provinceControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {}

  // tslint:disable-next-line:typedef
  register() {
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
    this.form = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      province: ['', Validators.required]
    });

  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.invalidData = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.newUser.nickname = this.form.get('nickname').value;
        this.newUser.firstname = this.form.get('firstname').value;
        this.newUser.lastname = this.form.get('lastname').value;
        this.newUser.password = this.form.get('password').value;
        this.newUser.email = this.form.get('email').value;
        this.newUser.birthday = this.form.get('birthday').value;
        this.newUser.province = this.form.get('province').value;
        this.newUser.money = 0;
        this.newUser.projects = [];
        console.log(this.newUser);
        this.userService.registerUser(this.newUser)
          .subscribe(data => {
              GlobalConstants.token = data;
              GlobalConstants.loggedUser = this.newUser.nickname;
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
}}
