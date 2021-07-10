import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {adminValidator, adultValidator} from '../common/registerValidators';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Provinces} from '../model/provinces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;

  keys: Array<string> = Object.keys(Provinces);
  provinces: Array<string> = this.keys.slice(this.keys.length / 2);

  nickname: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  birthday: string;
  province: string;
  money: number;
  newUser: User = { nickname: '', firstname: '', lastname: '', password: '', email: '', birthday: '', province: '', money: 0, projects: []};

  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(5), adminValidator]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [ Validators.required, adultValidator]],
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
        this.userService.registerUser(this.newUser)
          .subscribe(data => {
              sessionStorage.setItem('token', data);
              sessionStorage.setItem('loggedUser', this.newUser.nickname);
              this.toastr.info('Estas logueado como ' + this.newUser.nickname, 'BIENVENIDO');
              this.router.navigate(['/dashboard']);
          },
          /*error => {
            console.log('Error del metodo userService.registerUser:' + error);
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
