import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Task } from '../model/task';
import {MessageService} from './message.service';
import {GlobalConstants} from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
// TODO: manage error handling!!!
export class TaskService {

  private tasksUrl = 'http://localhost:8080/task';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    return this.http.get<Task[]>(`${this.tasksUrl}`, { headers })
      .pipe(tap(_ => this.messageService.log('TaskService: fetched tasks')),
        catchError(this.messageService.handleError<Task[]>('getTasks', [])));
  }

  /** GET specific task from the server */
  getTask(id: number): Observable<Task> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url, { headers }).pipe(
      tap(_ => this.messageService.log(`TaskService: fetched task id=${id}`)),
      catchError(this.messageService.handleError<Task>(`getTask id=${id}`))
    );
  }

  /** PUT: update the task on the server */
  // TODO: not used yet!!!
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`TaskService: updated task id=${task.id}`)),
      catchError(this.messageService.handleError<any>('updateTask'))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

}
