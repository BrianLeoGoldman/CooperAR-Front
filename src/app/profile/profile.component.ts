import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {Project} from '../model/project';
import {Task} from '../model/task';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {Categories} from '../model/categories';
import {filterProjectsByBudget, filterProjectsByCategory} from '../common/projectFilters';
import {Difficulties} from '../model/difficulties';
import {filterTasksByDifficulty, filterTasksByReward, filterTasksByState} from '../common/taskFilters';
import {States} from '../model/states';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User =  { nickname: '', firstname: '', lastname: '', password: '', email: '', birthday: '', province: '', money: 0, projects: []};
  isOwner: boolean;
  requestInProgress: boolean;

  filteredProjects: Project[] = [];
  projectsAvailable: boolean;
  projectsLength = 0;
  $projectValues = of();
  projectPageEvent: PageEvent; // MatPaginator Output
  categoriesKeys: Array<string> = Object.keys(Categories);
  categories: Array<string> = this.categoriesKeys.slice(this.categoriesKeys.length / 2);
  budgetSelected = '';
  categorySelected = '';

  assignedTasks: Task[] = [];
  filteredTasks: Task[] = [];
  tasksAvailable: boolean;
  tasksLength = 0;
  $tasksValues = of();
  tasksPageEvent: PageEvent; // MatPaginator Output
  difficultiesKeys: Array<string> = Object.keys(Difficulties);
  difficulties: Array<string> = this.difficultiesKeys.slice(this.difficultiesKeys.length / 2);
  difficultySelected = '';
  statesKeys: Array<string> = Object.keys(States);
  states: Array<string> = this.statesKeys.slice(this.statesKeys.length / 2);
  stateSelected = '';
  rewardSelected = '';

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.requestInProgress = false;
    this.getData();
  }

  getData(): void {
    const nickname  = this.route.snapshot.paramMap.get('id');
    this.isOwner = sessionStorage.getItem('loggedUser') === nickname;
    this.userService.getUser(nickname)
      .subscribe(user => this.processProjectsInfo(user));
    this.taskService.getAssignedTasks(nickname)
      .subscribe(tasks => this.processTasksInfo(tasks));
  }

  // PROJECTS

  processProjectsInfo(user: User): void {
    this.user = user;
    this.filteredProjects = this.user.projects;
    this.projectsAvailable = this.user.projects.length > 0;
    this.$projectValues = of(this.filteredProjects);
    this.projectsLength = this.filteredProjects.length;
  }

  setBudgetSelected(budget: string): void {
    this.budgetSelected = budget;
    this.filterProjects();
  }

  setCategorySelected(category: string): void {
    this.categorySelected = category;
    this.filterProjects();
  }

  filterProjects(): void {
    this.filteredProjects = this.user.projects;
    if (this.categorySelected) {this.filteredProjects = filterProjectsByCategory(this.categorySelected, this.filteredProjects); }
    if (this.budgetSelected) {this.filteredProjects = filterProjectsByBudget(this.budgetSelected, this.filteredProjects); }
    this.projectsLength = this.filteredProjects.length;
    this.$projectValues = of(this.filteredProjects);
  }

  // TASKS

  processTasksInfo(tasks: Task[]): void {
    this.assignedTasks = tasks;
    this.filteredTasks = this.assignedTasks;
    this.tasksAvailable = this.assignedTasks.length > 0;
    this.$tasksValues = of(this.filteredTasks);
    this.tasksLength = this.filteredTasks.length;
  }

  setDifficultySelected(difficulty: string): void {
    this.difficultySelected = difficulty;
    this.filterTasks();
  }

  setStateSelected(state: string): void {
    this.stateSelected = state;
    this.filterTasks();
  }

  setRewardSelected(reward: string): void {
    this.rewardSelected = reward;
    this.filterTasks();
  }

  filterTasks(): void {
    this.filteredTasks = this.assignedTasks;
    if (this.difficultySelected) {this.filteredTasks = filterTasksByDifficulty(this.difficultySelected, this.filteredTasks); }
    if (this.stateSelected) {this.filteredTasks = filterTasksByState(this.stateSelected, this.filteredTasks); }
    if (this.rewardSelected) {this.filteredTasks = filterTasksByReward(this.rewardSelected, this.filteredTasks); }
    this.tasksLength = this.filteredTasks.length;
    this.$tasksValues = of(this.filteredTasks);
  }

  // OTHERS

  delete(nickname: string): void {
    this.requestInProgress = true;
    this.userService.deleteUser(nickname)
      .subscribe(success => this.reloadAndRedirect(
        'El usuario ' + nickname + ' ha sido eliminado',
        'USUARIO ELIMINADO',
        '/login'),
        error => this.requestInProgress = false);
    this.modalService.dismissAll();
  }

  reloadAndFeedback(message: string, title: string): void {
    this.toastr.success(message, title);
    this.ngOnInit();
  }

  reloadAndRedirect(message: string, title: string, page: string): void {
    this.toastr.success(message, title);
    this.router.navigate([page]).then(r => console.log(r));
  }

  goCreateProject(): void {
    this.router.navigate(['/project-create/', this.user.nickname, this.user.money])
      .then(r => console.log(r));
  }

  goRequestMoney(): void {
    this.router.navigate(['/request-money/', this.user.nickname, this.user.money])
      .then(r => console.log(r));
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => { // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => { // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

}
