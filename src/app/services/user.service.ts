import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../model/user';
import {MessageService} from './message.service';
import {GlobalConstants} from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(nickname: string, password: string): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'text/html');
    const params = new HttpParams().set('nickname', nickname).set('password', password);
    return this.http.get(`${this.usersUrl}/login`, { headers, params, responseType: 'text'} )
      .pipe(tap(_ => this.messageService.log('UserService: login user'))/*,
        catchError(this.messageService.handleError<User[]>('login', []))*/);
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    return this.http.get<User[]>(`${this.usersUrl}`, { headers })
      .pipe(tap(_ => this.messageService.log('UserService: fetched users'))/*,
        catchError(this.messageService.handleError<User[]>('getUsers', []))*/);
  }

  /** GET specific user from the server */
  getUser(nickname: string): Observable<User> {
    const headers = new HttpHeaders().append('Authorization', GlobalConstants.token);
    const url = `${this.usersUrl}/${nickname}`;
    return this.http.get<User>(url, { headers } ).pipe(
      tap(_ => this.messageService.log(`UserService: fetched user nickname=${nickname}`))/*,
      catchError(this.messageService.handleError<User>(`getUser nickname=${nickname}`))*/
    );
  }

  /** PUT: create the user on the server */
  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(this.usersUrl, user, {headers, responseType: 'text'} ).pipe(
      tap(_ => this.messageService.log(`UserService: registered user with nickname=${user.nickname}`))/*,
      catchError(this.messageService.handleError<any>('registerUser'))*/
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

}
