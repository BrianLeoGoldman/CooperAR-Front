import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {mockedProject, mockedTask} from '../model/mocks';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        ToastrModule.forRoot({
          positionClass : 'toast-bottom-right'
        })],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project name', () => {
    component.projects = [mockedProject];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.projects .card-title').textContent).toBe('MockProject');
  });

  it('should display project description', () => {
    component.projects = [mockedProject];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.projects .card-body').textContent).toBe('Descripcion');
  });

  it('should display project category', () => {
    component.projects = [mockedProject];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.projects .badge').textContent).toBe('CONSTRUCCION');
  });

  it('should display task name', () => {
    component.tasks = [mockedTask];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.tasks .card-title').textContent).toBe('MockTask');
  });

  it('should display task difficulty', () => {
    component.tasks = [mockedTask];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.tasks .badge').textContent).toBe('REGULAR');
  });
});
