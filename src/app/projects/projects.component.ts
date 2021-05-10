import { Component, OnInit } from '@angular/core';
import {Project} from '../model/project';
import { ProjectService  } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';

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

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
        this.filteredProjects = this.projects;
        this.listFilter = '';
      });
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProjects = this.listFilter ? this.doFilter(this.listFilter) : this.projects;
  }

  doFilter(filterBy: string): Project[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projects.filter((project: Project) =>
      project.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private projectService: ProjectService, private toastr: ToastrService) {
    this.projects = [];
    this.filteredProjects = this.projects;
  }

  ngOnInit(): void {
    this.getProjects();
  }

}
