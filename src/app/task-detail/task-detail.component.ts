import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task =  { name: '', description: '', reward: 0, projectId: '', creationDate: '', finishDate: '', difficulty: '' };
  isOwner: boolean;

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
    this.isOwner = true; // GlobalConstants.loggedUser === this.task.owner;
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
    this.location.back(); // TODO: when task is deleted and we go back, we still see the deleted task
    // this.router.navigate(['/dashboard']).then(r => console.log(r));
  }
}
