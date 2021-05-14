import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categories} from '../model/categories';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProjectService} from '../services/project.service';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalConstants} from '../common/global-constants';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;

  keys: Array<string> = Object.keys(Categories);
  categories: Array<string> = this.keys.slice(this.keys.length / 2);

  nickname: string;
  money: number;

  name: string;
  budget: number;
  description: string;
  category: string;
  owner: string;

  constructor(private route: ActivatedRoute, // Holds information about the route to this instance of the component
              private location: Location, // Is an Angular service for interacting with the browser
              private projectService: ProjectService,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.nickname = this.route.snapshot.paramMap.get('id');
    this.money = Number(this.route.snapshot.paramMap.get('money'));
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      budget: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required]
    });
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
        this.owner = this.nickname;
        this.projectService.createProject(
          this.name,
          this.budget,
          this.description,
          this.category,
          this.owner)
          .subscribe(data => {
              this.toastr.info('Se ha creado el proyecto con nombre ' + this.name, 'PROYECTO CREADO');
              this.location.back();
              // this.router.navigate(['/dashboard']);
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
