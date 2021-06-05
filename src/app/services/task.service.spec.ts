import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {mockedTask1, mockedTask2, mockedUser1} from '../model/mocks';
import {Task} from '../model/task';
import {HttpErrorResponse} from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [ UserService ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ UserService ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTasks should return a list of Tasks', () => {
    const mockTasksList: Task[] = [mockedTask1, mockedTask2];
    service.getTasks().subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockTasksList));
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasksList);
  });

  it('#getTask should return one Task', () => {
    const id = 5;
    service.getTask(id).subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockedUser1));
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedUser1);
  });

  it('#assignWorker should not return anything', () => {
    const nickname = 'juan123';
    const id = 5;
    service.assignWorker(nickname, id).subscribe((value) => {
      expect(value).toBe(null);
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task/assign?user=${nickname}&id=${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('#unassignWorker should not return anything', () => {
    const id = 5;
    service.unassignWorker(id).subscribe((value) => {
      expect(value).toBe(null);
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task/unassign?id=${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('#completeTask should not return anything', () => {
    const id = 5;
    service.completeTask(id).subscribe((value) => {
      expect(value).toBe(null);
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task/complete?id=${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('#approveTask should not return anything', () => {
    const id = 5;
    service.approveTask(id).subscribe((value) => {
      expect(value).toBe(null);
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task/approve?id=${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('#unapproveTask should not return anything', () => {
    const id = 5;
    service.unapproveTask(id).subscribe((value) => {
      expect(value).toBe(null);
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/task/unapprove?id=${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });



});
