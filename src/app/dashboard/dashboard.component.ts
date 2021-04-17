import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../services/project.service';
import {User} from '../user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects: Project[] = [];
  users: User[] = [];

  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {
    this.getProjects();
    this.getUsers();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects.slice(0, 4));
  }

   getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users.slice(0, 4));
  }
}
