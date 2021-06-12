import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {mockedProject1, mockedProject2, mockedUser1} from '../model/mocks';
import {Project} from '../model/project';

describe('ProjectService', () => {
  let httpTestingController: HttpTestingController;
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ ProjectService ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProjectService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getProjects should return a list of Projects', () => {
    const mockProjectsList: Project[] = [mockedProject1, mockedProject2];
    service.getProjects().subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockProjectsList));
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/project`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjectsList);
  });

  it('#getProject should return one Project', () => {
    const id = 7;
    service.getProject(id).subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockedProject1));
    });
    const req = httpTestingController.expectOne(`http://localhost:8080/project/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedProject1);
  });

  it('#createProject should return the created project ', () => {
    const name = 'Prueba';
    const budget = 760;
    const description = 'Descripcion de prueba';
    const category = 'DEPORTE';
    const owner = 'juan123';
    service.createProject(name, budget, description, category, owner).subscribe((value) => {
      expect(value).not.toBe(null);
      expect(JSON.stringify(value)).toEqual(JSON.stringify(mockedProject2));
    });
    const req = httpTestingController.expectOne(
      `http://localhost:8080/project?name=${name}&budget=${budget}&description=${description}&category=${category}&owner=${owner}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockedProject2);
  });
});
