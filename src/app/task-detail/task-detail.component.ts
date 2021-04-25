import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  save(): void {
    this.toastr.info('This functionality is not implemented yet!', 'Nothing happened');
    /*this.taskService.updateTask(this.task)
      .subscribe(() => this.goBack());*/
  }

  goBack(): void {
    this.location.back();
  }

}
