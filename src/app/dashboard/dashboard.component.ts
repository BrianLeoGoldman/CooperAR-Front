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
import {filterProjectsByCategory, filterProjectsByProgress, filterProjectsByText} from '../common/projectFilters';
import {filterTasksByDifficulty, filterTasksByReward, filterTasksByText} from '../common/taskFilters';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects: Project[] = [];
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

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  // tslint:disable-next-line:variable-name
  _taskListFilter = '';
  tasksLength = 0;
  $taskValues = of();
  taskPageEvent: PageEvent; // MatPaginator Output
  difficultiesKeys: Array<string> = Object.keys(Difficulties);
  difficulties: Array<string> = this.difficultiesKeys.slice(this.difficultiesKeys.length / 2);
  difficultySelected = '';
  rewardSelected = '';

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

  processProjects(projects: Project[]): void {
    this.projects = projects; // .sort(() => 0.5 - Math.random()).slice(0, 4);
    this.filteredProjects = this.projects;
    this._projectListFilter = '';
    this.$projectValues = of(this.filteredProjects);
    this.projectsLength = this.filteredProjects.length;
  }

  get projectListFilter(): string {
    return this._projectListFilter;
  }

  set projectListFilter(value: string) {
    this._projectListFilter = value;
    this.filterProjects();
  }

  setCategorySelected(category: string): void {
    this.categorySelected = category;
    this.filterProjects();
  }

  setProgressSelected(progress: string): void {
    this.progressSelected = progress;
    this.filterProjects();
  }

  filterProjects(): void {
    this.filteredProjects = this.projects;
    if (this.projectListFilter) {this.filteredProjects = filterProjectsByText(this.projectListFilter, this.filteredProjects); }
    if (this.categorySelected) {this.filteredProjects = filterProjectsByCategory(this.categorySelected, this.filteredProjects); }
    if (this.progressSelected) {this.filteredProjects = filterProjectsByProgress(this.progressSelected, this.filteredProjects); }
    this.projectsLength = this.filteredProjects.length;
    this.$projectValues = of(this.filteredProjects);
  }

  // TASKS

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.processTasks(tasks));
  }

  private processTasks(tasks: Task[]): void {
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
  }

  setDifficultySelected(difficulty: string): void {
    this.difficultySelected = difficulty;
    this.filterTasks();
  }

  setRewardSelected(reward: string): void {
    this.rewardSelected = reward;
    this.filterTasks();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks;
    if (this.taskListFilter) { filterTasksByText(this.taskListFilter, this.filteredTasks); }
    if (this.difficultySelected) { filterTasksByDifficulty(this.difficultySelected, this.filteredTasks); }
    if (this.rewardSelected) { filterTasksByReward(this.rewardSelected, this.filteredTasks); }
    this.tasksLength = this.filteredTasks.length;
    this.$taskValues = of(this.filteredTasks);
  }

}
