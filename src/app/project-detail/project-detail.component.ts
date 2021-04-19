import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../model/project';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project?: Project;

  constructor(private route: ActivatedRoute, // Holds information about the route to this instance of the component
              private location: Location, // Is an Angular service for interacting with the browser
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const name = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(name)
      .subscribe(project => this.project = project);
  }

  save(): void {
    this.projectService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
