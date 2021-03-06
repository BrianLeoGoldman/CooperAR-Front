import {Injectable} from '@angular/core';
import {Project} from '../model/project';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'http://localhost:8080/project';  // URL to web api

  /*httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };*/

  constructor(private http: HttpClient) { }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    return this.http.get<Project[]>(this.projectsUrl, { headers })
      .pipe(
        tap(_ => console.log('getProjects: OK')),
        /*catchError(this.handleError<Project[]>('getProjects', []))*/
      );
  }

  /** GET specific project from the server */
  getProject(id: number): Observable<Project> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url, { headers })
      .pipe(
        tap(project => this.formatProject(project)),
        tap(_ => console.log('getProject: OK')),
        /*catchError(this.handleError<Project>('getProject'))*/
    );
  }

  /** PUT: add a new project to the server */
  // tslint:disable-next-line:typedef
  createProject(name: string, budget: number, description: string, category: string, owner: string): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.projectsUrl}?name=${name}&budget=${budget}&description=${description}&category=${category}&owner=${owner}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('createProject: OK')),
        /*catchError(this.handleError<Project>('createProject')))*/
      );
  }

  /** DELETE: delete the project from the server */
  // tslint:disable-next-line:typedef
  deleteProject(id: number) {
    const headers = new HttpHeaders()
      .append('Authorization', sessionStorage.getItem('token'));
      /*.append('Response-Type', 'text/html')
      .append('Content-Type', 'text/html');*/
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, { headers, responseType: 'text' }) // TODO: responseType not necessary?
      .pipe(
        tap(_ => console.log('deleteProject: OK')),
        /*catchError(this.handleError<any>('deleteProject'))*/
      );
  }

  /** POST: post a new file on the project */
  // TODO: same method as in task service!!!
  // tslint:disable-next-line:typedef
  postFile(fileToUpload: File, id: number): Observable<boolean> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.projectsUrl}/file/${id}`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<boolean>(url, formData, { headers })
      .pipe(
        tap(_ => console.log('postFile: OK')),
        /*catchError(this.handleError<any>('deleteProject'))*/
      );
  }

  formatProject(project: Project): void {
    project.creationDate = new Date(project.creationDate).toLocaleDateString();
  }

  // tslint:disable-next-line:typedef
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' => ' + error);
      return of(result as T);
    };
  }
}
