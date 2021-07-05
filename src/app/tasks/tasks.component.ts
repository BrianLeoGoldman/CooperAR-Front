import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {TaskService} from '../services/task.service';
import {PageEvent} from '@angular/material/paginator';
import {of} from 'rxjs';

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
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
        this.listFilter = '';
        this.$taskValues = of(this.filteredTasks);
        this.tasksLength = this.filteredTasks.length;
      });
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTasks = this.listFilter ? this.doFilter(this.listFilter) : this.tasks;
    this.$taskValues = of(this.filteredTasks);
    this.tasksLength = this.filteredTasks.length;
  }

  doFilter(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: Task) =>
      (task.name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
      (task.description.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }

}
