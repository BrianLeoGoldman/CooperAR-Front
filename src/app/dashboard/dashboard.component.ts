import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../services/project.service';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../model/task';
import {PageEvent} from '@angular/material/paginator';
import {of} from 'rxjs';
import {Categories} from '../model/categories';
import {Difficulties} from '../model/difficulties';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects: Project[] = [];
  tasks: Task[] = [];

  filteredProjects: Project[] = [];
  // tslint:disable-next-line:variable-name
  _projectListFilter = '';
  projectsLength = 0;
  $projectValues = of();
  projectPageEvent: PageEvent; // MatPaginator Output
  categoriesKeys: Array<string> = Object.keys(Categories);
  categories: Array<string> = this.categoriesKeys.slice(this.categoriesKeys.length / 2);
  categorySelected = '';
  progressSelected = '';

  filteredTasks: Task[] = [];
  // tslint:disable-next-line:variable-name
  _taskListFilter = '';
  tasksLength = 0;
  $taskValues = of();
  taskPageEvent: PageEvent; // MatPaginator Output
  difficultiesKeys: Array<string> = Object.keys(Difficulties);
  difficulties: Array<string> = this.difficultiesKeys.slice(this.difficultiesKeys.length / 2);
  difficultySelected = '';

  pageSize = 4;


  constructor(private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService) {
    this.filteredProjects = this.projects;
    this.filteredTasks = this.tasks;
  }

  ngOnInit(): void {
    this.getProjects();
    this.getTasks();
  }

  // PROJECTS

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
  setProgressSelected(progress: string) {
    this.progressSelected = progress;
    this.filterProjects();
  }

  // tslint:disable-next-line:typedef
  filterProjects() {
    this.filteredProjects = this.projects;
    if (this.projectListFilter) { this.filterProjectsByText(this.projectListFilter); }
    if (this.categorySelected) { this.filterProjectsByCategory(this.categorySelected); }
    if (this.progressSelected) { this.filterProjectsByProgress(this.progressSelected); }
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

  // tslint:disable-next-line:typedef
  filterProjectsByProgress(progress: string) {
    switch (progress) {
      case '1':
        this.filteredProjects = this.filteredProjects.filter((project: Project) =>
          ((project.percentage >= 0) && (project.percentage < 25)));
        break;
      case '2':
        this.filteredProjects = this.filteredProjects.filter((project: Project) =>
          ((project.percentage >= 25) && (project.percentage < 50)));
        break;
      case '3':
        this.filteredProjects = this.filteredProjects.filter((project: Project) =>
          ((project.percentage >= 50) && (project.percentage < 75)));
        break;
      case '4':
        this.filteredProjects = this.filteredProjects.filter((project: Project) =>
          ((project.percentage >= 75) && (project.percentage <= 100)));
        break;
      default:
        console.log('Something strange happened...');
    }
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
    this.filterTasks();
    /*this.filteredTasks = this.taskListFilter ? this.doFilterTasks(this.taskListFilter) : this.tasks;
    this.tasksLength = this.filteredTasks.length;
    this.$taskValues = of(this.filteredTasks);*/
  }

  // tslint:disable-next-line:typedef
  setDifficultySelected(difficulty: string) {
    this.difficultySelected = difficulty;
    this.filterTasks();
  }

  // tslint:disable-next-line:typedef
  filterTasks() {
    this.filteredTasks = this.tasks;
    if (this.taskListFilter) { this.filterTasksByText(this.taskListFilter); }
    if (this.difficultySelected) { this.filterTasksByDifficulty(this.difficultySelected); }
    this.tasksLength = this.filteredTasks.length;
    this.$taskValues = of(this.filteredTasks);
  }

  // tslint:disable-next-line:typedef
  filterTasksByText(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredTasks = this.filteredTasks.filter((task: Task) =>
      (task.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (task.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }

  // tslint:disable-next-line:typedef
  filterTasksByDifficulty(difficulty: string) {
    this.filteredTasks = this.filteredTasks.filter((task: Task) =>
      (task.difficulty === difficulty));
  }

  /*doFilterTasks(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: Task) =>
      (task.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (task.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }*/
}
