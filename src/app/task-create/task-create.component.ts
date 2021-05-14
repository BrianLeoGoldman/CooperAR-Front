import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Difficulties} from '../model/difficulties';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  form: FormGroup;
  public invalidData: boolean;
  private formSubmitAttempt: boolean;

  keys: Array<string> = Object.keys(Difficulties);
  difficulties: Array<string> = this.keys.slice(this.keys.length / 2);

  name: string;
  reward: number;
  description: string;
  projectId: number; // From path
  difficulty: string;
  owner: string; // From path
  budget: number; // From path

  constructor(private route: ActivatedRoute, // Holds information about the route to this instance of the component
              private location: Location, // Is an Angular service for interacting with the browser
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.owner = this.route.snapshot.paramMap.get('owner');
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.budget = Number(this.route.snapshot.paramMap.get('budget'));
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      reward: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      difficulty: ['', Validators.required]
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
        this.reward = this.form.get('reward').value;
        this.description = this.form.get('description').value;
        this.difficulty = this.form.get('difficulty').value;
        this.taskService.createTask(
          this.name,
          this.reward,
          this.description,
          this.projectId,
          this.difficulty,
          this.owner)
          .subscribe(data => {
              this.toastr.info('Se ha creado la tarea con nombre ' + this.name, 'TAREA CREADA');
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
