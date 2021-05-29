import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        ToastrModule.forRoot({
          positionClass : 'toast-bottom-right'
        })],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has required validator for nickname', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('nickname');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });

  it('should has minimum length validator for nickname', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('nickname');
    control.setValue('Dan');
    expect(control.hasError('minlength')).toBeTruthy();
  });

  it('should has required validator for password', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('password');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });

  it('should has minimum length validator for password', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('password');
    control.setValue('a2b3c4');
    expect(control.hasError('minlength')).toBeTruthy();
  });
});
