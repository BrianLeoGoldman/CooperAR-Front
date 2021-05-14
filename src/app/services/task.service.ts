import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Task} from '../model/task';
import {GlobalConstants} from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:8080/task';  // URL to web api

  /*httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };*/

  constructor(private http: HttpClient) { }

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    return this.http.get<Task[]>(this.tasksUrl, { headers })
      .pipe(
        tap(_ => console.log('getTasks: OK')),
        /*catchError(this.handleError<Task[]>('getTasks', []))*/
      );
  }

  /** GET specific task from the server */
  getTask(id: number): Observable<Task> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url, { headers })
      .pipe(
        tap(task => this.formatTask(task)),
        tap(_ => console.log('getTask: OK')),
        /*catchError(this.handleError<Task>('getTask'))*/
    );
  }

  /** PUT: create a new task */
  createTask(name: string, reward: number, description: string, projectId: number, difficulty: string, owner: string): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.tasksUrl}?name=${name}&reward=${reward}&description=${description}&projectId=${projectId}&difficulty=${difficulty}&owner=${owner}`;
    /*const params = new HttpParams()
      .set('name', name)
      .set('reward', String(reward))
      .set('description', description)
      .set('projectId', String(projectId))
      .set('difficulty', difficulty)
      .set('owner', owner);*/
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('createTask: OK')),
        /*catchError(this.handleError<Task>('createTask'))*/
      );
  }

  /** DELETE: delete the task on the server */
  // tslint:disable-next-line:typedef
  deleteTask(id: number) {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, { headers })
      .pipe(
        tap(_ => console.log('deleteTask: OK')),
        /*catchError(this.handleError<any>('deleteTask'))*/
      );
  }

  formatTask(task: Task): void {
    task.creationDate = new Date(task.creationDate).toLocaleDateString();
  }

  // tslint:disable-next-line:typedef
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' => ' + error);
      return of(result as T);
    };
  }

}
