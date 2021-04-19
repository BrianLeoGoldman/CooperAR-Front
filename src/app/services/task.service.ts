import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Task } from '../model/task';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:8080/task';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}/all`)
      .pipe(tap(_ => this.messageService.log('TaskService: fetched tasks')),
        catchError(this.messageService.handleError<Task[]>('getTasks', [])));
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

}
