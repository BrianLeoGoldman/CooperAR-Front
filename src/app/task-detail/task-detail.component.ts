import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NbChatModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  task: Task =  { name: '', description: '', reward: 0, projectId: '', creationDate: '', finishDate: '', difficulty: '', owner: '', worker: '', state: '', files: [] };
  isOwner: boolean;
  isWorker: boolean;
  isAssignable: boolean;
  isAlreadyAssigned: boolean;
  canBeCompleted: boolean;
  canBeApproved: boolean;
  canBeCanceled: boolean;
  requestInProgress: boolean;

  messages = [
    { sender: 'juan1985',
      date: new Date(2021, 7, 3, 3, 14, 22),
      text: 'Hola maria_ana. Queria saber cual es el requerimiento de aprobacion de esta tarea.'},
    { sender: 'maria_ana',
      date: new Date(2021, 7, 3, 3, 22, 33),
      text: '¿Como estas juan1985?. Te comento, el criterio es subir el documento formulario.doc completo'},
    { sender: 'juan1985',
      date: new Date(2021, 7, 3, 3, 35, 5),
      text: 'Muchas gracias!!!'}
  ];

  messageText = '';
  private scrollContainer: any;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router) {  }

  ngOnInit(): void {
    this.requestInProgress = false;
    this.getTask();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

    // Add a new item every 2 seconds
    setInterval(() => {
      this.messages.push();
    }, 2000);
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
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
    this.requestInProgress = true;
    this.taskService.deleteTask(id)
      .subscribe(success => this.reloadAndRedirect(
        'La tarea numero ' + id + ' ha sido eliminada',
        'TAREA ELIMINADA',
        '/dashboard'),
        error => this.requestInProgress = false);
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line:typedef
  assignWorker() {
    this.requestInProgress = true;
    this.taskService.assignWorker(sessionStorage.getItem('loggedUser'), this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'Te has asignado la tarea ' + this.task.name + '.\n' +
        'El usuario ' + this.task.owner + ' ya ha sido notificado',
        'TAREA ASIGNADA'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  unassignWorker() {
    this.requestInProgress = true;
    this.taskService.unassignWorker(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'El usuario ' + this.task.worker + ' fue desasignado.\n' +
        'El usuario ' + this.task.worker + ' ya ha sido notificado',
        'USUARIO DESASIGNADO'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  completeTask() {
    this.requestInProgress = true;
    this.taskService.completeTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue completada.\n' +
        'El usuario ' + this.task.owner + ' ya ha sido notificado',
        'TAREA COMPLETADA'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  approveTask() {
    this.requestInProgress = true;
    this.taskService.approveTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue aprobada.\n' +
        'El usuario ' + this.task.worker + ' ya ha recibido los fondos',
        'TAREA APROBADA'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  unapproveTask() {
    this.requestInProgress = true;
    this.taskService.unapproveTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue desaprobada.\n' +
        'El usuario ' + this.task.worker + ' ya ha sido notificado',
        'TAREA DESAPROBADA'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  cancelTask() {
    this.requestInProgress = true;
    this.taskService.cancelTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue cancelada.\n' +
        'Se te ha devuelto el dinero asignado',
        'TAREA CANCELADA'),
        error => this.requestInProgress = false);
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

  // tslint:disable-next-line:typedef
  addMessage() {
    this.messages.push({sender: sessionStorage.getItem('loggedUser'),
      date: new Date(),
      text: this.messageText});
  }
}
