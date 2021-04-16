import { Injectable } from '@angular/core';
import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({  // Injectable is a Decorator that takes metadata for the service
  providedIn: 'root' // The service is registered as a provider and available to the dependency injection system
  // in the root of the project (one singleton for all components)
})
export class ProjectService {

  private projectsUrl = 'http://localhost:8080/project';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProjectsOld(): Observable<Project[]> { // This method needs to have an asynchronous signature
    // It will return an Observable because it will eventually use the Angular HttpClient.get method
    // to fetch the heroes and HttpClient.get() returns an Observable
    const projects = of(PROJECTS);
    this.messageService.add('ProjectService: fetched projects');
    return projects;
  }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectsUrl}/all`)
      .pipe(tap(_ => this.log('fetched projects')), catchError(this.handleError<Project[]>('getProjects', [])));
    // All HttpClient methods return an RxJS Observable of something
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProject(id: number): Observable<Project> {
    // For now, assume that a project with the specified `id` always exists.
    // const project = PROJECTS.find(h => h.id === id) as Project;
    // this.messageService.add(`ProjectService: fetched project id=${id}`);
    // return of(project);
    const url = `${this.projectsUrl}/fetch?id=${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** PUT: update the project on the server */
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, this.httpOptions).pipe(
      tap(_ => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: Project) => this.log(`added project w/ id=${newProject.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}?id=${id}`;
    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
