import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'http://localhost:8080/project';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectsUrl}/all`)
      .pipe(tap(_ => this.messageService.log('ProjectService: fetched projects')),
        catchError(this.messageService.handleError<Project[]>('getProjects', [])));
  }

  /** GET specific project from the server */
  getProject(name: string): Observable<Project> {
    const url = `${this.projectsUrl}/fetch?id=${name}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.messageService.log(`ProjectService: fetched project name=${name}`)),
      catchError(this.messageService.handleError<Project>(`getProject name=${name}`))
    );
  }

  /** PUT: update the project on the server */
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`ProjectService: updated project name=${project.name}`)),
      catchError(this.messageService.handleError<any>('updateProject'))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: Project) => this.messageService.log(`ProjectService: added project w/ name=${newProject.name}`)),
      catchError(this.messageService.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject(name: string): Observable<Project> {
    const url = `${this.projectsUrl}?id=${name}`;
    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`ProjectService: deleted project name=${name}`)),
      catchError(this.messageService.handleError<Project>('deleteProject'))
    );
  }

}
