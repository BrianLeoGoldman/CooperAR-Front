import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task =  { name: '', description: '', reward: 0, projectId: '', creationDate: '', finishDate: '', difficulty: '', owner: '', worker: '', state: '', files: [] };
  isOwner: boolean;
  isWorker: boolean;
  isAssignable: boolean;
  isAlreadyAssigned: boolean;
  canBeCompleted: boolean;
  canBeApproved: boolean;
  canBeCanceled: boolean;
  requestInProgress: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.requestInProgress = false;
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.setTaskInfo(task));
  }

  private setTaskInfo(task: Task): void {
    this.task = task;
    // this.isOwner = GlobalFunctions.loggedUser === this.task.owner;
    // this.isWorker = GlobalFunctions.loggedUser === this.task.worker;
    this.isOwner = sessionStorage.getItem('loggedUser') === this.task.owner;
    this.isWorker = sessionStorage.getItem('loggedUser') === this.task.worker;
    this.isAssignable = !this.isOwner && (this.task.state === 'DISPONIBLE');
    this.isAlreadyAssigned = this.isOwner && (this.task.state === 'EN_CURSO');
    this.canBeCompleted = this.isWorker && (this.task.state === 'EN_CURSO');
    this.canBeApproved = this.isOwner && (this.task.state === 'COMPLETA');
    this.canBeCanceled = this.isOwner && (this.task.state === 'DISPONIBLE' || this.task.state === 'COMPLETA');
  }

  delete(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(_ => this.reloadAndRedirect(
        'La tarea numero ' + id + ' ha sido eliminada',
        'TAREA ELIMINADA',
        '/dashboard'));
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line:typedef
  assignWorker() {
    this.requestInProgress = true;
    this.taskService.assignWorker(sessionStorage.getItem('loggedUser'), this.task.id)
      .subscribe(_ => this.reloadAndFeedback(
        'Te has asignado la tarea ' + this.task.name + '.\n' +
        'El usuario ' + this.task.owner + ' ya ha sido notificado',
        'TAREA ASIGNADA'));
  }

  // tslint:disable-next-line:typedef
  unassignWorker() {
    this.requestInProgress = true;
    this.taskService.unassignWorker(this.task.id)
      .subscribe(_ => this.reloadAndFeedback(
        'El usuario ' + this.task.worker + ' fue desasignado.\n' +
        'El usuario ' + this.task.worker + ' ya ha sido notificado',
        'USUARIO DESASIGNADO'));
  }

  // tslint:disable-next-line:typedef
  completeTask() {
    this.requestInProgress = true;
    this.taskService.completeTask(this.task.id)
      .subscribe(_ => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue completada.\n' +
        'El usuario ' + this.task.owner + ' ya ha sido notificado',
        'TAREA COMPLETADA'));
  }

  // tslint:disable-next-line:typedef
  approveTask() {
    this.requestInProgress = true;
    this.taskService.approveTask(this.task.id)
      .subscribe(_ => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue aprobada.\n' +
        'El usuario ' + this.task.worker + ' ya ha recibido los fondos',
        'TAREA APROBADA'));
  }

  // tslint:disable-next-line:typedef
  unapproveTask() {
    this.requestInProgress = true;
    this.taskService.unapproveTask(this.task.id)
      .subscribe(_ => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue desaprobada.\n' +
        'El usuario ' + this.task.worker + ' ya ha sido notificado',
        'TAREA DESAPROBADA'));
  }

  // tslint:disable-next-line:typedef
  cancelTask() {
    this.requestInProgress = true;
    this.taskService.cancelTask(this.task.id)
      .subscribe(_ => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue cancelada.\n' +
        'Se te ha devuelto el dinero asignado',
        'TAREA CANCELADA'));
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
  goUploadFile() {
    this.router.navigate(['file-upload/', 'task', this.task.id])
      .then(r => console.log(r));
  }

  open(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
      (result) => { console.log(`${result}`); },
      (reason) => { console.log(`${reason}`); }
    );
  }

  // tslint:disable-next-line:typedef
  goBack() {
    this.location.back();
  }
}
