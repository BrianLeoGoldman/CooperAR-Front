import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TasksComponent} from './tasks/tasks.component';
import {ProfileComponent} from './profile/profile.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HeaderComponent} from './header/header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {ErrorInterceptorService} from './services/error-interceptor.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {ProjectCreateComponent} from './project-create/project-create.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AccessGuardService} from './services/access-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    DashboardComponent,
    TasksComponent,
    ProfileComponent,
    TaskDetailComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProjectCreateComponent,
    TaskCreateComponent,
    PageNotFoundComponent,
    FileUploadComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(),
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatCardModule,
        NgbModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        // ToastrModule added
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: AccessGuardService,
      useClass: AccessGuardService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
