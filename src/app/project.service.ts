import { Injectable } from '@angular/core';
import { Project } from './project';
import { PROJECTS } from './mock-projects';

@Injectable({  // Injectable is a Decorator that takes metadata for the service
  providedIn: 'root' // The service is registered as a provider and available to the dependency injection system
})
export class ProjectService {

  getProjects(): Project[] {
    return PROJECTS;
  }

  constructor() { }
}
