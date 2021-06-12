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
import {AccessGuardService} from './services/access-guard.service';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'dashboard', component: DashboardComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'users', component: UsersComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'projects', component: ProjectsComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'tasks', component: TasksComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'project-detail/:id', component: ProjectDetailComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ] },
  { path: 'task-detail/:id', component: TaskDetailComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'profile/:id', component: ProfileComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'project-create/:owner/:money', component: ProjectCreateComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'task-create/:owner/:projectId/:budget', component: TaskCreateComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: 'file-upload/:entity/:id', component: FileUploadComponent,
    data: { requiresLogin: true }, canActivate: [ AccessGuardService ]  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
