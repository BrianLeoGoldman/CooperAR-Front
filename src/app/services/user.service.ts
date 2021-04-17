import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../user';
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
      .pipe(tap(_ => this.log('fetched users')), catchError(this.handleError<User[]>('getUsers', [])));
    // All HttpClient methods return an RxJS Observable of something
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/fetch?id=${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

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
