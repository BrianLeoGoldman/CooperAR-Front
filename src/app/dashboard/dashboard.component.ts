import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from '../services/project.service';
import {User} from '../model/user';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import { Task } from '../model/task';
import * as myGlobals from 'globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects: Project[] = [];
  users: User[] = [];
  tasks: Task[] = [];

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.getProjects();
    this.getUsers();
    this.getTasks();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects.sort(() => 0.5 - Math.random()).slice(0, 4));
  }

   getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users.sort(() => 0.5 - Math.random()).slice(0, 4));
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks.sort(() => 0.5 - Math.random()).slice(0, 4));
  }
}
