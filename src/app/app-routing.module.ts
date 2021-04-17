import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {TasksComponent} from './tasks/tasks.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'tasks', component: TasksComponent }
];

@NgModule({ // The @NgModule metadata initializes the router and starts it listening for browser location changes
  imports: [RouterModule.forRoot(routes)], // Adds the RouterModule to the AppRoutingModule imports
  // array and configures it with the routes in one step by calling RouterModule.forRoot()
  exports: [RouterModule] // Exports RouterModule so it will be available throughout the app
})
export class AppRoutingModule { }
