import { Injectable } from '@angular/core';
import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({  // Injectable is a Decorator that takes metadata for the service
  providedIn: 'root' // The service is registered as a provider and available to the dependency injection system
  // in the root of the project (one singleton for all components)
})
export class ProjectService {

  getProjects(): Observable<Project[]> { // This method needs to have an asynchronous signature
    // It will return an Observable because it will eventually use the Angular HttpClient.get method
    // to fetch the heroes and HttpClient.get() returns an Observable
    const projects = of(PROJECTS);
    this.messageService.add('ProjectService: fetched projects');
    return projects;
  }

  constructor(private messageService: MessageService) { }
}
