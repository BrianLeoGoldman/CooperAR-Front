import { Component, OnInit } from '@angular/core';
import {Project} from '../project';
import { ProjectService  } from '../project.service';

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
  }

  getProjects(): void {
    this.projects = this.projectService.getProjects();
  }

  constructor(private projectService: ProjectService) { } // Constructor should be reserved
  // for minimal initialization such as wiring constructor parameters to properties

  ngOnInit(): void {
    this.getProjects(); // Angular calls ngOnInit() at an appropriate time after
    // constructing a ProjectsComponent instance.
  }

}
