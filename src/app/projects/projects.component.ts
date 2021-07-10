import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../services/project.service';
import {of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {filterProjectsByText} from '../common/projectFilters';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  // tslint:disable-next-line:variable-name
  _listFilter = '';

  projectsLength = 0;
  $projectValues = of();
  projectPageEvent: PageEvent; // MatPaginator Output

  constructor(private projectService: ProjectService) {
    this.projects = [];
    this.filteredProjects = this.projects;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe((projects: Project[]) => {
        this.processProjects(projects);
      });
  }

  processProjects(projects: Project[]): void {
    this.projects = projects;
    this.filteredProjects = this.projects;
    this.listFilter = '';
    this.$projectValues = of(this.filteredProjects);
    this.projectsLength = this.filteredProjects.length;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProjects();
  }

  filterProjects(): void {
    this.filteredProjects = this.projects;
    if (this._listFilter) {this.filteredProjects = filterProjectsByText(this._listFilter, this.filteredProjects); }
    this.projectsLength = this.filteredProjects.length;
    this.$projectValues = of(this.filteredProjects);
  }
}
