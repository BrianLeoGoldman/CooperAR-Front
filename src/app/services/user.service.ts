import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../model/user';
import {MoneyRequest} from '../model/moneyRequest';

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
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    return this.http.get<User[]>(this.usersUrl, { headers })
      .pipe(
        tap(_ => console.log('getUsers: OK')),
        /*catchError(this.handleError<User[]>('getUsers', []))*/
      );
  }

  /** GET specific user from the server */
  getUser(nickname: string): Observable<User> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
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
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.usersUrl}/${nickname}`;
    return this.http.delete(url, { headers })
      .pipe(
        tap(_ => console.log('deleteUser: OK')),
        /*catchError(this.handleError<User>('deleteUser'))*/
      );
  }

  /** PUT: make a request for money */
  // tslint:disable-next-line:typedef
  requestMoney(nickname: string, requestedValue: string, accountStatus: File, depositReceipt: File) {
    console.log('We are going to ask for money!!!');
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.usersUrl}/money?user=${nickname}&money=${requestedValue}`;
    const formData: FormData = new FormData();
    formData.append('accountStatus', accountStatus, accountStatus.name);
    formData.append('depositReceipt', depositReceipt, depositReceipt.name);
    return this.http.put(url, formData, { headers })
      .pipe(
        tap(_ => console.log('requestMoney: OK')),
        /*catchError(this.handleError<User>('requestMoney'))*/
      );
  }

  /** GET: all money requests with a state */
  getMoneyRequests(state: string): Observable<MoneyRequest[]> {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.usersUrl}/money?state=${state}`;
    return this.http.get<MoneyRequest[]>(url, { headers })
      .pipe(
        tap(requests => requests.forEach(request => this.formatMoneyRequest(request))),
        tap(_ => console.log('getMoneyRequests: OK')),
        /*catchError(this.handleError<User>('getMoneyRequests'))*/
      );
  }

  /** PUT: approve a specific money request */
  // tslint:disable-next-line:typedef
  approveMoneyRequest(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.usersUrl}/money/approve?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('approveMoneyRequest: OK')),
        /*catchError(this.handleError<User>('getMoneyRequests'))*/
      );
  }

  /** PUT: reject a specific money request */
  // tslint:disable-next-line:typedef
  rejectMoneyRequest(id: number) {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.usersUrl}/money/reject?id=${id}`;
    return this.http.put(url, { headers })
      .pipe(
        tap(_ => console.log('rejectMoneyRequest: OK')),
        /*catchError(this.handleError<User>('getMoneyRequests'))*/
      );
  }

  /** GET: a file from a Money Request */
  // tslint:disable-next-line:typedef ban-types
  getFile(id: string, type: string, fileName: string): Observable<Object>  {
    const headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('token'));
    const url = `${this.usersUrl}/money/file?id=${id}&type=${type}&fileName=${fileName}`;
    // tslint:disable-next-line:ban-types
    return this.http.get<Object>(url, { headers })
      .pipe(
        tap(response => console.log(response)),
        tap(_ => console.log('getFile: OK')),
        /*catchError(this.handleError<User>('getMoneyRequests'))*/
      );
  }

  formatUser(user: User): void {
    user.province = user.province.replace(/_/g, ' ');
    user.birthday = new Date(user.birthday).toLocaleDateString();
  }

  formatMoneyRequest(request: MoneyRequest): void {
    if (request.creationDate !== null) {
      request.creationDate = new Date(request.creationDate).toLocaleDateString();
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
