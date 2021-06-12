import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {States} from '../model/states';

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

  constructor(private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
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
    this.isAssignable = !this.isOwner && (this.task.state === 'ABIERTA');
    this.isAlreadyAssigned = this.isOwner && (this.task.state === 'ASIGNADA');
    this.canBeCompleted = this.isWorker && (this.task.state === 'ASIGNADA');
    this.canBeApproved = this.isOwner && (this.task.state === 'COMPLETA');
    this.canBeCanceled = this.isOwner && (this.task.state === 'ABIERTA' || this.task.state === 'COMPLETA');
  }

  open(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
      (result) => { console.log(`${result}`); },
      (reason) => { console.log(`${reason}`); }
    );
  }

  delete(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(_ => this.toastr.success('LA TAREA ' + id + ' HA SIDO ELIMINADA', 'OPERACION EXITOSA'));
    this.modalService.dismissAll();
    // this.location.back(); // TODO: triggers task deletion two times!
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }

  // tslint:disable-next-line:typedef
  goUploadFile() {
    this.router.navigate(['file-upload/', 'task', this.task.id])
      .then(r => console.log(r));
  }

  // tslint:disable-next-line:typedef
  assignWorker() {
    this.taskService.assignWorker(sessionStorage.getItem('loggedUser'), this.task.id)
      .subscribe(_ => this.ngOnInit()); // TODO: does it refresh? It does!!!
  }

  // tslint:disable-next-line:typedef
  unassignWorker() {
    this.taskService.unassignWorker(this.task.id)
      .subscribe(_ => this.ngOnInit());
  }

  // tslint:disable-next-line:typedef
  completeTask() {
    this.taskService.completeTask(this.task.id)
      .subscribe(_ => this.ngOnInit());
  }

  // tslint:disable-next-line:typedef
  approveTask() {
    this.taskService.approveTask(this.task.id)
      .subscribe(_ => this.ngOnInit());
  }

  // tslint:disable-next-line:typedef
  unapproveTask() {
    this.taskService.unapproveTask(this.task.id)
      .subscribe(_ => this.ngOnInit());
  }

  // tslint:disable-next-line:typedef
  cancelTask() {
    this.taskService.cancelTask(this.task.id)
      .subscribe(_ => this.ngOnInit());
  }

}
