import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatSelectModule,
        ToastrModule.forRoot({
          positionClass : 'toast-bottom-right'
        })],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has admin validator for nickname', () => {
    // TODO: fix test!!!
    component.ngOnInit();
    const control: AbstractControl = component.form.get('nickname');
    control.setValue('admin');
    expect(control.hasError('adminValidator')).toBeTruthy();
  });

  it('should has minimum length validator for nickname', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('nickname');
    control.setValue('Tim');
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
    control.setValue('y1y2y3');
    expect(control.hasError('minlength')).toBeTruthy();
  });

  it('should has required validator for firstname', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('firstname');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });

  it('should has required validator for lastname', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('lastname');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });

  it('should has required validator for email', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('email');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });

  it('should has mail format validator for email', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('email');
    control.setValue('tomas');
    expect(control.hasError('email')).toBeTruthy();
  });

  it('should has required validator for birthday', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('birthday');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });

  /*it('should has adult validator for birthday', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('birthday');
    control.setValue('6/23/2021');
    expect(control.hasError('adultValidator')).toBeTruthy();
  });*/

  it('should has required validator for province', () => {
    component.ngOnInit();
    const control: AbstractControl = component.form.get('province');
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();
  });
});
