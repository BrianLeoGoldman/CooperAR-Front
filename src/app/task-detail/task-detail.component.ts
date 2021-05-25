import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalConstants} from '../common/global-constants';
import {States} from '../model/states';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task =  { name: '', description: '', reward: 0, projectId: '', creationDate: '', finishDate: '', difficulty: '', owner: '', worker: '', state: '', files: [] };
  isOwner: boolean;
  isAssignable: boolean;

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
    this.isOwner = GlobalConstants.loggedUser === this.task.owner;
    this.isAssignable = !this.isOwner && (this.task.state === 'ABIERTA');
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
      .subscribe(_ => console.log('Task ' + id + ' deleted'));
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
    this.taskService.assignWorker(GlobalConstants.loggedUser, this.task.id)
      .subscribe(_ => this.ngOnInit()); // TODO: does not refresh!
  }
}
