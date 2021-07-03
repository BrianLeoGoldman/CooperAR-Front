import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categories} from '../model/categories';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProjectService} from '../services/project.service';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;
  requestInProgress: boolean;
  keys: Array<string> = Object.keys(Categories);
  categories: Array<string> = this.keys.slice(this.keys.length / 2);

  name: string;
  budget: number;
  description: string;
  category: string;
  owner: string; // From path
  money: number; // From path

  constructor(private route: ActivatedRoute, // Holds information about the route to this instance of the component
              private location: Location, // Is an Angular service for interacting with the browser
              private projectService: ProjectService,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.requestInProgress = false;
    this.owner = this.route.snapshot.paramMap.get('owner');
    this.money = Number(this.route.snapshot.paramMap.get('money'));
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      budget: ['', [Validators.required, Validators.min(1), Validators.max(this.money)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  reloadAndFeedback(message: string, title: string) {
    this.toastr.success(message, title);
    this.ngOnInit();
  }

  // tslint:disable-next-line:typedef
  reloadAndRedirect(message: string, title: string, page: string) {
    this.toastr.success(message, title);
    this.router.navigate([page]).then(r => console.log(r));
  }

  goBack(): void {
    this.location.back();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.invalidData = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.name = this.form.get('name').value;
        this.budget = this.form.get('budget').value;
        this.description = this.form.get('description').value;
        this.category = this.form.get('category').value;
        this.requestInProgress = true;
        this.projectService.createProject(
          this.name,
          this.budget,
          this.description,
          this.category,
          this.owner)
          .subscribe(data => {
              this.toastr.info('Se ha creado el proyecto con nombre ' + this.name, 'PROYECTO CREADO');
              this.location.back();
            },
            error => {
              this.requestInProgress = false;
            }
          );
      } catch (err) {
        this.invalidData = true;
        console.log('Error al extraer campos:' + err);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
