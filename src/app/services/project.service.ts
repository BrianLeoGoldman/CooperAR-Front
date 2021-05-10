import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  // tslint:disable-next-line:typedef
  deleteProject(id: number) {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, { headers });
  }

  /** PUT: create a new task */
  createTask(name: string, reward: number, description: string, projectId: number, difficulty: string, owner: string): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const params = new HttpParams()
      .set('name', name)
      .set('reward', String(reward))
      .set('description', description)
      .set('projectId', String(projectId))
      .set('difficulty', difficulty)
      .set('owner', owner);
    const url = `${this.projectsUrl}/addTask`;
    console.log('A PUNTO DE CREAR LA TAREA Y HACER EL LLAMADO AL BACK!!!!');
    return this.http.put(
      `${this.projectsUrl}/addTask?name=${name}&reward=${reward}&description=${description}&projectId=${projectId}&difficulty=${difficulty}&owner=${owner}`, { headers }).pipe(
      tap((r) => console.log(`Created task: ` + r)),
      catchError(this.messageService.handleError(`ERROR`)));
  }
}
