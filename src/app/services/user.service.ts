import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../model/user';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/all`)
      .pipe(tap(_ => this.messageService.log('UserService: fetched users')),
        catchError(this.messageService.handleError<User[]>('getUsers', [])));
  }

  /** GET specific user from the server */
  getUser(nickname: string): Observable<User> {
    const url = `${this.usersUrl}/fetch?id=${nickname}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.messageService.log(`UserService: fetched user nickname=${nickname}`)),
      catchError(this.messageService.handleError<User>(`getUser nickname=${nickname}`))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`UserService: updated user nickname=${user.nickname}`)),
      catchError(this.messageService.handleError<any>('updateUser'))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

}
