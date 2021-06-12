import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../model/user';
import {mockedUser1, mockedUser2} from '../model/mocks';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [ UserService ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ UserService ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should return a token', () => {
    const nickname = 'juan123'; const password = 'aa11bb22';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVr';
    service.login(nickname, password).subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(token));
    });
    const req = httpTestingController.expectOne(
      `http://localhost:8080/user/login?nickname=${nickname}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.flush(token);
  });

  it('#getUsers should return a list of Users', () => {
    const mockUsersList: User[] = [mockedUser1, mockedUser2];
    service.getUsers().subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockUsersList));
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersList);
  });

  it('#getUser should return one User', () => {
    const nickname = 'juan123';
    service.getUser(nickname).subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockedUser1));
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/user/${nickname}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedUser1);
  });

  it('#createUser should return the created user ', () => {
    const token = 'Bearer ehfdh24ryruhugh54h34ifhu43fh4u';
    service.registerUser(mockedUser2).subscribe((value) => {
      expect(value).not.toBe(null);
      expect(value).toEqual(token);
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/user`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(mockedUser2);
    req.flush(token);
  });
});
