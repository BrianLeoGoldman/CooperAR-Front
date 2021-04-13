import { Component, OnInit } from '@angular/core';
import {Project} from '../project';
import { ProjectService  } from '../services/project.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  selectedProject?: Project;

  onSelect(project: Project): void {
    this.selectedProject = project;
    this.messageService.add(`ProjectsComponent: Selected project id=${project.id}`);
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects); // This waits for the Observable
    // to emit the array of heroes—which could happen now or several minutes from now. The
    // subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }

  constructor(private projectService: ProjectService, private messageService: MessageService) { } // Constructor should be reserved
  // for minimal initialization such as wiring constructor parameters to properties

  ngOnInit(): void {
    this.getProjects(); // Angular calls ngOnInit() at an appropriate time after
    // constructing a ProjectsComponent instance.
  }

}
