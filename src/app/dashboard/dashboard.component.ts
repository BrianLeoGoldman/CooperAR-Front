import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../services/project.service';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../model/task';
import {PageEvent} from '@angular/material/paginator';
import {of} from 'rxjs';
import {Categories} from '../model/categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // users: User[] = [];
  projects: Project[] = [];
  tasks: Task[] = [];

  filteredProjects: Project[] = [];
  // tslint:disable-next-line:variable-name
  _projectListFilter = '';
  projectsLength = 0;
  $projectValues = of();
  projectPageEvent: PageEvent; // MatPaginator Output

  filteredTasks: Task[] = [];
  // tslint:disable-next-line:variable-name
  _taskListFilter = '';
  tasksLength = 0;
  $taskValues = of();
  taskPageEvent: PageEvent; // MatPaginator Output

  pageSize = 4;
  keys: Array<string> = Object.keys(Categories);
  categories: Array<string> = this.keys.slice(this.keys.length / 2);
  categorySelected = '';

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService) {
    this.filteredProjects = this.projects;
    this.filteredTasks = this.tasks;
  }

  ngOnInit(): void {
    // this.getUsers();
    this.getProjects();
    this.getTasks();
  }

  /*getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users
        .sort(() => 0.5 - Math.random()).slice(0, 4));
  }*/

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.processProjects(projects));
  }

  // tslint:disable-next-line:typedef
  processProjects(projects: Project[]) {
    this.projects = projects; // .sort(() => 0.5 - Math.random()).slice(0, 4);
    this.filteredProjects = this.projects;
    this._projectListFilter = '';
    this.$projectValues = of(this.filteredProjects);
    this.projectsLength = this.projects.length;
  }

  get projectListFilter(): string {
    return this._projectListFilter;
  }

  set projectListFilter(value: string) {
    this._projectListFilter = value;
    this.filterProjects();
  }

  // tslint:disable-next-line:typedef
  setCategorySelected(category: string) {
    this.categorySelected = category;
    this.filterProjects();
  }

  // tslint:disable-next-line:typedef
  filterProjects() {
    this.filteredProjects = this.projects;
    if (this.projectListFilter) { this.filterProjectsByText(this.projectListFilter); }
    if (this.categorySelected) { this.filterProjectsByCategory(this.categorySelected); }
    this.projectsLength = this.filteredProjects.length;
    this.$projectValues = of(this.filteredProjects);
  }

  // tslint:disable-next-line:typedef
  filterProjectsByText(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredProjects = this.filteredProjects.filter((project: Project) =>
      (project.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (project.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }

  // tslint:disable-next-line:typedef
  filterProjectsByCategory(category: string) {
    this.filteredProjects = this.filteredProjects.filter((project: Project) =>
      (project.category === category));
  }

  // TASKS

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.processTasks(tasks));
  }

  // tslint:disable-next-line:typedef
  private processTasks(tasks: Task[]) {
    this.tasks = tasks; // .sort(() => 0.5 - Math.random()).slice(0, 4);
    this.filteredTasks = this.tasks;
    this._taskListFilter = '';
    this.$taskValues = of(this.filteredTasks);
    this.tasksLength = this.tasks.length;
  }

  get taskListFilter(): string {
    return this._taskListFilter;
  }

  set taskListFilter(value: string) {
    this._taskListFilter = value;
    this.filteredTasks = this.taskListFilter ? this.doFilterTasks(this.taskListFilter) : this.tasks;
    this.tasksLength = this.filteredTasks.length;
    this.$taskValues = of(this.filteredTasks);
  }

  doFilterTasks(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: Task) =>
      (task.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (task.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }
}
