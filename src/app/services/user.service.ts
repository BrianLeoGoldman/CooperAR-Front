import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../model/user';
import {GlobalConstants} from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/user';  // URL to web api

  /*httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };*/

  constructor(private http: HttpClient) { }

  /** GET login as a user */
  login(nickname: string, password: string): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'text/html');
    const url = `${this.usersUrl}/login`;
    const params = new HttpParams().set('nickname', nickname).set('password', password);
    return this.http.get(url, { headers, params, responseType: 'text'} )
      .pipe(
        tap(_ => console.log('login: OK')),
        /*catchError(this.handleError<User>('login'))*/
      );
  }

  /** GET all users from the server */
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    return this.http.get<User[]>(this.usersUrl, { headers })
      .pipe(
        tap(_ => console.log('getUsers: OK')),
        /*catchError(this.handleError<User[]>('getUsers', []))*/
      );
  }

  /** GET specific user from the server */
  getUser(nickname: string): Observable<User> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.usersUrl}/${nickname}`;
    return this.http.get<User>(url, { headers } )
      .pipe(
        tap(user => this.formatUser(user)),
        tap(_ => console.log('getUser: OK')),
        /*catchError(this.handleError<User>('getUser'))*/
    );
  }

  /** PUT: create the user on the server */
  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(this.usersUrl, user, { headers, responseType: 'text' } )
      .pipe(
        tap(_ => console.log('registerUser: OK')),
        /*catchError(this.handleError<User>('registerUser'))*/
    );
  }

  /** DELETE: delete the user on the server */
  // tslint:disable-next-line:typedef
  deleteUser(nickname: string) {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.usersUrl}/${nickname}`;
    return this.http.delete(url, { headers })
      .pipe(
        tap(_ => console.log('deleteUser: OK')),
        /*catchError(this.handleError<User>('deleteUser'))*/
      );
  }

  formatUser(user: User): void {
    user.province = user.province.replace(/_/g, ' ');
    user.birthday = new Date(user.birthday).toLocaleDateString();
  }

  // tslint:disable-next-line:typedef
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' => ' + error);
      return of(result as T);
    };
  }

}
