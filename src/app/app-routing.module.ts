import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {ProjectsComponent} from './projects/projects.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {TasksComponent} from './tasks/tasks.component';
import {ProfileComponent} from './profile/profile.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProjectCreateComponent} from './project-create/project-create.component';
import {TaskCreateComponent} from './task-create/task-create.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'project-create/:owner/:money', component: ProjectCreateComponent },
  { path: 'task-create/:owner/:projectId/:budget', component: TaskCreateComponent },
  { path: 'file-upload/:entity/:id', component: FileUploadComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
