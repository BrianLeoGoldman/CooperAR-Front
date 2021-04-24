import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {TasksComponent} from './tasks/tasks.component';
import {ProfileComponent} from './profile/profile.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
