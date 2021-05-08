import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {GlobalConstants} from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
// TODO: manage error handling!!!
export class ProjectService {

  private projectsUrl = 'http://localhost:8080/project';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    return this.http.get<Project[]>(`${this.projectsUrl}`, { headers })
      .pipe(tap(_ => this.messageService.log('ProjectService: fetched projects')),
        catchError(this.messageService.handleError<Project[]>('getProjects', [])));
  }

  /** GET specific project from the server */
  getProject(id: number): Observable<Project> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url, { headers }).pipe(
      tap(_ => this.messageService.log(`ProjectService: fetched project id=${id}`)),
      catchError(this.messageService.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** PUT: update the project on the server */
  // TODO: not used yet!!!
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`ProjectService: updated project id=${project.id}`)),
      catchError(this.messageService.handleError<any>('updateProject'))
    );
  }

  /** POST: add a new project to the server */
  // TODO: not used yet!!!
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: Project) => this.messageService.log(`ProjectService: added project w/ id=${newProject.id}`)),
      catchError(this.messageService.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the project from the server */
  // TODO: not used yet!!!
  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}?id=${id}`;
    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`ProjectService: deleted project id=${id}`)),
      catchError(this.messageService.handleError<Project>('deleteProject'))
    );
  }

}
