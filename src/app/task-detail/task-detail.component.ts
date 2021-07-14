import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Message} from '../model/message';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  task: Task =  { name: '', description: '', reward: 0, projectId: '', creationDate: '', finishDate: '', difficulty: '', owner: '', worker: '', state: '', files: [] };
  taskId: number;
  isOwner: boolean;
  isWorker: boolean;
  isAssignable: boolean;
  isAlreadyAssigned: boolean;
  canBeCompleted: boolean;
  canBeApproved: boolean;
  canBeCanceled: boolean;

  loggedUser: string;
  messages = [];
  messageText = '';
  private scrollContainer: any;

  requestInProgress: boolean;
  /*mySubscription: Subscription;*/

  constructor(private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router) {
    /*this.mySubscription = interval(5000).subscribe((x => {
      this.getMessages();
    }));*/
  }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser');
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.requestInProgress = false;
    this.getTask();
    this.getMessages();
  }

  /*// tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    // clearInterval(this.intervalId);
    this.mySubscription.unsubscribe();
  }*/

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
    this.taskService.getTask(this.taskId)
      .subscribe(task => this.setTaskInfo(task));
  }

  getMessages(): void {
    this.taskService.getMessages(this.taskId)
      .subscribe(messages => this.setMessages(messages));
  }

  private setTaskInfo(task: Task): void {
    this.task = task;
    this.isOwner = this.loggedUser === this.task.owner;
    this.isWorker = this.loggedUser === this.task.worker;
    this.isAssignable = !this.isOwner && (this.task.state === 'DISPONIBLE');
    this.isAlreadyAssigned = this.isOwner && (this.task.state === 'EN_CURSO');
    this.canBeCompleted = this.isWorker && (this.task.state === 'EN_CURSO');
    this.canBeApproved = this.isOwner && (this.task.state === 'COMPLETA');
    this.canBeCanceled = this.isOwner && (this.task.state === 'DISPONIBLE' || this.task.state === 'COMPLETA');
  }

  private setMessages(messages: Message[]): void {
     this.messages = messages;
  }

  delete(id: number): void {
    this.requestInProgress = true;
    this.taskService.deleteTask(id)
      .subscribe(success => this.reloadAndRedirect(
        'La tarea numero ' + id + ' ha sido eliminada',
        'TAREA ELIMINADA',
        '/dashboard'),
        error => this.processErrorFromRequest(error));
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line:typedef
  assignWorker() {
    this.requestInProgress = true;
    this.taskService.assignWorker(this.loggedUser, this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'Te has asignado la tarea ' + this.task.name + '.\n' +
        'El usuario ' + this.task.owner + ' ya ha sido notificado',
        'TAREA ASIGNADA',
        'LA TAREA FUE ASIGNADA'),
        error => this.processErrorFromRequest(error));
  }

  // tslint:disable-next-line:typedef
  unassignWorker() {
    this.requestInProgress = true;
    this.taskService.unassignWorker(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'El usuario ' + this.task.worker + ' fue desasignado.\n' +
        'El usuario ' + this.task.worker + ' ya ha sido notificado',
        'USUARIO DESASIGNADO',
        'LA TAREA VUELVE A ESTAR DISPONIBLE'),
        error => this.processErrorFromRequest(error));
  }

  // tslint:disable-next-line:typedef
  completeTask() {
    this.requestInProgress = true;
    this.taskService.completeTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue completada.\n' +
        'El usuario ' + this.task.owner + ' ya ha sido notificado',
        'TAREA COMPLETADA',
        'LA TAREA FUE COMPLETADA'),
        error => this.processErrorFromRequest(error));
  }

  // tslint:disable-next-line:typedef
  approveTask() {
    this.requestInProgress = true;
    this.taskService.approveTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue aprobada.\n' +
        'El usuario ' + this.task.worker + ' ya ha recibido los fondos',
        'TAREA APROBADA',
        'LA TAREA FUE APROBADA'),
        error => this.processErrorFromRequest(error));
  }

  // tslint:disable-next-line:typedef
  unapproveTask() {
    this.requestInProgress = true;
    this.taskService.unapproveTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue desaprobada.\n' +
        'El usuario ' + this.task.worker + ' ya ha sido notificado',
        'TAREA DESAPROBADA',
        'LA TAREA FUE DESAPROBADA'),
        error => this.processErrorFromRequest(error));
  }

  // tslint:disable-next-line:typedef
  cancelTask() {
    this.requestInProgress = true;
    this.taskService.cancelTask(this.task.id)
      .subscribe(success => this.reloadAndFeedback(
        'La tarea ' + this.task.name + ' fue cancelada.\n' +
        'Se te ha devuelto el dinero asignado',
        'TAREA CANCELADA',
        'LA TAREA FUE CANCELADA'),
        error => this.processErrorFromRequest(error));
  }

  // tslint:disable-next-line:typedef
  addMessage(publisherUser: string, message: string) {
    this.requestInProgress = true;
    const publishingDate = new Date();
    const dateTime = publishingDate.toLocaleString();
    this.taskService.addMessage(this.task.id, publisherUser, dateTime, message)
      .subscribe(success => this.ngOnInit(),
        error => this.processErrorFromRequest(error));
    this.messages.push({
      publisher: publisherUser,
      date: dateTime,
      text: message
    });
    this.messageText = '';
  }

  // tslint:disable-next-line:typedef
  reloadAndFeedback(message: string, title: string, chatMessage: string) {
    this.toastr.success(message, title);
    this.addMessage('CooperAR', chatMessage);
  }

  // tslint:disable-next-line:typedef
  reloadAndRedirect(message: string, title: string, page: string) {
    this.toastr.success(message, title);
    this.router.navigate([page]).then(r => console.log(r));
  }

  // tslint:disable-next-line:typedef
  processErrorFromRequest(error: any) {
    this.requestInProgress = false;
    console.log(error);
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
