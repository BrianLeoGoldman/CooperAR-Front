import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../model/project';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Difficulties} from '../model/difficulties';
import {GlobalConstants} from '../common/global-constants';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project?: Project;
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
      .subscribe(project => this.project = project);
  }

  save(): void {
    this.toastr.info('This functionality is not implemented yet!', 'Nothing happened');
    /*this.projectService.updateProject(this.project)
      .subscribe(() => this.goBack());*/
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
  onSubmit() {
    this.invalidData = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.name = this.form.get('name').value;
        this.reward = this.form.get('reward').value;
        this.description = this.form.get('description').value;
        this.difficulty = this.form.get('difficulty').value;
        this.projectService.createTask(
          this.name,
          this.reward,
          this.description,
          this.project.id,
          this.difficulty,
          GlobalConstants.loggedUser)
          .subscribe(data => {
              this.toastr.info('Se ha creado la tarea con nombre ' + this.name, 'TAREA CREADA');
              this.router.navigate(['/dashboard']);
            },
            error => {
              console.log(error);
            }
          );
      } catch (err) {
        this.invalidData = true;
        console.log(err);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
