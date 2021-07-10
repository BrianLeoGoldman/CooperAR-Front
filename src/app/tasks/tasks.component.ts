import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {TaskService} from '../services/task.service';
import {PageEvent} from '@angular/material/paginator';
import {of} from 'rxjs';
import {filterTasksByText} from '../common/taskFilters';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  // tslint:disable-next-line:variable-name
  _listFilter = '';

  tasksLength = 0;
  $taskValues = of();
  taskPageEvent: PageEvent; // MatPaginator Output

  constructor(private taskService: TaskService) {
    this.tasks = [];
    this.filteredTasks = this.tasks;
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.processTasks(tasks));
  }

  processTasks(tasks: Task[]): void {
    this.tasks = tasks;
    this.filteredTasks = this.tasks;
    this.listFilter = '';
    this.$taskValues = of(this.filteredTasks);
    this.tasksLength = this.filteredTasks.length;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterTasks();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks;
    if (this._listFilter) { filterTasksByText(this._listFilter, this.filteredTasks); }
    this.tasksLength = this.filteredTasks.length;
    this.$taskValues = of(this.filteredTasks);
  }

}
