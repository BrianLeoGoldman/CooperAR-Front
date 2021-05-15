import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProjectService} from '../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Difficulties} from '../model/difficulties';
import {TaskService} from '../services/task.service';
import {GlobalConstants} from '../common/global-constants';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: Project =  { name: '', budget: 0, description: '', owner: '', creationDate: '', finishDate: '', category: '', tasks: [] };
  isOwner: boolean;

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;

  keys: Array<string> = Object.keys(Difficulties);
  difficulties: Array<string> = this.keys.slice(this.keys.length / 2);

  name: string;
  reward: number;
  description: string;
  difficulty: string;

  constructor(private route: ActivatedRoute, // Holds information about the route to this instance of the component
              private location: Location, // Is an Angular service for interacting with the browser
              private projectService: ProjectService,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProject();
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      reward: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      difficulty: ['', Validators.required]
    });
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id)
      .subscribe(project => this.setProjectInfo(project));
  }

  private setProjectInfo(project: Project): void {
    this.project = project;
    this.isOwner = GlobalConstants.loggedUser === this.project.owner;
  }

  goBack(): void {
    this.location.back();
  }

  delete(id: number): void {
    this.projectService.deleteProject(id)
      .subscribe(_ => console.log('Project deleted'));
    this.modalService.dismissAll();
    // this.location.go('/dashboard');
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => { // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => { // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // tslint:disable-next-line:typedef
  goCreateTask() {
    this.router.navigate(['/task-create.component/', this.project.owner, this.project.id, this.project.budget])
      .then(r => console.log(r));
  }
}
