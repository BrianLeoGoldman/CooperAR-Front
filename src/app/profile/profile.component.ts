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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User =  { nickname: '', firstname: '', lastname: '', password: '', email: '', birthday: '', province: '', money: 0, projects: []};
  assignedTasks: Task[] = [];
  isOwner: boolean;
  projectsAvailable: boolean;
  tasksAvailable: boolean;
  requestInProgress: boolean;

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
    // this.isOwner = GlobalFunctions.loggedUser === nickname;
    this.isOwner = sessionStorage.getItem('loggedUser') === nickname;
    this.userService.getUser(nickname)
      .subscribe(user => this.processProjectsInfo(user));
    this.taskService.getAssignedTasks(nickname)
      .subscribe(tasks => this.processTasksInfo(tasks));
  }

  processProjectsInfo(user: User): void {
    this.user = user;
    this.projectsAvailable = this.user.projects.length > 0;
  }

  processTasksInfo(tasks: Task[]): void {
    this.assignedTasks = tasks;
    this.tasksAvailable = this.assignedTasks.length > 0;
  }

  // tslint:disable-next-line:typedef
  delete(nickname: string) {
    this.requestInProgress = true;
    this.userService.deleteUser(nickname)
      .subscribe(success => this.reloadAndRedirect(
        'El usuario ' + nickname + ' ha sido eliminado',
        'USUARIO ELIMINADO',
        '/login'),
        error => this.requestInProgress = false);
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line:typedef
  reloadAndFeedback(message: string, title: string) {
    this.toastr.success(message, title);
    this.ngOnInit();
  }

  // tslint:disable-next-line:typedef
  reloadAndRedirect(message: string, title: string, page: string) {
    this.toastr.success(message, title);
    this.router.navigate([page]).then(r => console.log(r));
  }

  // tslint:disable-next-line:typedef
  goCreateProject() {
    this.router.navigate(['/project-create/', this.user.nickname, this.user.money])
      .then(r => console.log(r));
  }

  // tslint:disable-next-line:typedef
  goRequestMoney() {
    this.router.navigate(['/request-money/', this.user.nickname, this.user.money])
      .then(r => console.log(r));
  }

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => { // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => { // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

}
