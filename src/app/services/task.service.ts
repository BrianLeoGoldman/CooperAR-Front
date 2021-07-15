import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Task} from '../model/task';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:8080/task';  // URL to web api

  /*httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };*/

  constructor(private http: HttpClient) { }

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    return this.http.get<Task[]>(this.tasksUrl, { headers })
      .pipe(
        tap(_ => console.log('getTasks: OK')),
        /*catchError(this.handleError<Task[]>('getTasks', []))*/
      );
  }

  /** GET specific task from the server */
  getTask(id: number): Observable<Task> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url, { headers })
      .pipe(
        tap(task => this.formatTask(task)),
        tap(_ => console.log('getTask: OK')),
        /*catchError(this.handleError<Task>('getTask'))*/
    );
  }

  /** GET tasks assgined to the user */
  // tslint:disable-next-line:typedef
  getAssignedTasks(nickname: string): Observable<Task[]> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/assign?user=${nickname}`;
    return this.http.get<Task[]>(url, { headers })
      .pipe(
        tap(_ => console.log('getAssignedTasks: OK')),
        /*catchError(this.handleError<Task>('getTask'))*/
      );
  }

  /** PUT: create a new task */
  createTask(name: string, reward: number, description: string, projectId: number, difficulty: string, owner: string): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}?name=${name}&reward=${reward}&description=${description}&projectId=${projectId}&difficulty=${difficulty}&owner=${owner}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('createTask: OK')),
        /*catchError(this.handleError<Task>('createTask'))*/
      );
  }

  /** DELETE: delete the task on the server */
  // tslint:disable-next-line:typedef
  deleteTask(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, { headers })
      .pipe(
        tap(_ => console.log('deleteTask: OK')),
        /*catchError(this.handleError<any>('deleteTask'))*/
      );
  }

  /** POST: post a new file on the task */
  // tslint:disable-next-line:typedef
  // TODO: same method as in project service!!!
  postFile(fileToUpload: File, id: number): Observable<boolean> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/file/${id}`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<boolean>(url, formData, { headers })
      .pipe(
        tap(_ => console.log('postFile: OK')),
        /*catchError(this.handleError<any>('deleteProject'))*/
      );
  }

  /** GET: download a file from the task */
  // tslint:disable-next-line:ban-types
  downloadFile(id: number, file: string): Observable<any> {
    // tslint:disable-next-line:ban-types
    const HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    headers.append('Accept', '*/*');
    headers.append('Response-Type', 'text/plain');
    const url = `${this.tasksUrl}/download?id=${id}&file=${file}`;
    // tslint:disable-next-line:ban-types
    return this.http.get<any>(url, HTTPOptions)
      .pipe(
        tap(response => console.log(response)),
        tap(_ => console.log('downloadFile: OK')),
        /*catchError(this.handleError<User>('getMoneyRequests'))*/
      );
  }

  /** PUT: assign a user as worker of a task */
  // tslint:disable-next-line:typedef
  assignWorker(loggedUser: string, id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/assign?user=${loggedUser}&id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('assignWorker: OK')),
      );
  }

  /** PUT: unassign a user as worker of a task */
  // tslint:disable-next-line:typedef
  unassignWorker(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/unassign?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('unassignWorker: OK')),
      );
  }

  /** PUT: complete a task */
  // tslint:disable-next-line:typedef
  completeTask(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/complete?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('completeTask: OK')),
      );
  }

  /** PUT: approve a completed task */
  // tslint:disable-next-line:typedef
  approveTask(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/approve?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('approveTask: OK')),
      );
  }

  /** PUT: unapprove a completed task */
  // tslint:disable-next-line:typedef
  unapproveTask(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/unapprove?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('unapproveTask: OK')),
      );
  }

  /** PUT: cancel a task */
  // tslint:disable-next-line:typedef
  cancelTask(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/cancel?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('cancelTask: OK')),
      );
  }

  /** GET all the messages for this task */
  // tslint:disable-next-line:typedef
  getMessages(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/message?id=${id}`;
    return this.http.get<Message[]>(url, { headers })
      .pipe(
        tap(messages => console.log('getMessages: OK')),
      );
  }

  /** PUT: add a new message to task chat */
  // tslint:disable-next-line:typedef
  addMessage(id: number, publisher: string, dateTime: string, messageText: string) {
    console.log('publishingDate: ' + dateTime);
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.tasksUrl}/message?id=${id}&publisher=${publisher}&dateTime=${dateTime}&text=${messageText}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('addMessage: OK')),
      );
  }

  formatTask(task: Task): void {
    task.creationDate = new Date(task.creationDate).toLocaleDateString();
    if (task.finishDate !== null) {
      task.finishDate = new Date(task.finishDate).toLocaleDateString();
    }
  }

  // tslint:disable-next-line:typedef
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' => ' + error);
      return of(result as T);
    };
  }
}
