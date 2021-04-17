import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../user';
import {catchError, tap} from 'rxjs/operators';
import { Task } from '../task';
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
      .pipe(tap(_ => this.log('fetched tasks')), catchError(this.handleError<Task[]>('getTasks', [])));
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
