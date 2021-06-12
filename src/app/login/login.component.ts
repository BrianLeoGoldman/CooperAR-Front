import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private router: Router,
              public userService: UserService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

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
              if (this.nickname === 'admin') {
                sessionStorage.setItem('token', data);
                sessionStorage.setItem('loggedUser', 'admin');
                this.toastr.info('Estas logueado como admin', 'BIENVENIDO');
                this.router.navigate(['/admin-dashboard']);
              }
              else {
                sessionStorage.setItem('token', data);
                sessionStorage.setItem('loggedUser', this.nickname);
                this.toastr.info('Estas logueado como ' + this.nickname, 'BIENVENIDO');
                this.router.navigate(['/dashboard']);
              }
            },
            /*error => {
              console.log('Error del metodo userService.login:' + error);
            }*/
          );
      } catch (err) {
        this.invalidData = true;
        console.log('Error al extraer campos:' + err);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
