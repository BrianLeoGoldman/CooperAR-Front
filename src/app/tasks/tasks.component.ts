import { Component, OnInit } from '@angular/core';
import {Task} from '../model/task';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  add(name: string): void {
  }

  delete(task: Task): void {
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

}
