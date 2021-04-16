import { Component, OnInit } from '@angular/core';
import {Project} from '../project';
import { ProjectService  } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects); // This waits for the Observable
    // to emit the array of heroes—which could happen now or several minutes from now. The
    // subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.projectService.addProject({ name } as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
  }

  delete(project: Project): void {
    this.projects = this.projects.filter(h => h !== project);
    this.projectService.deleteProject(project.id).subscribe();
  }

  constructor(private projectService: ProjectService) { } // Constructor should be reserved
  // for minimal initialization such as wiring constructor parameters to properties

  ngOnInit(): void {
    this.getProjects(); // Angular calls ngOnInit() at an appropriate time after
    // constructing a ProjectsComponent instance.
  }

}
