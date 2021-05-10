import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaskService} from '../services/task.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  save(): void {
    this.toastr.info('This functionality is not implemented yet!', 'Nothing happened');
    /*this.taskService.updateTask(this.task)
      .subscribe(() => this.goBack());*/
  }

  goBack(): void {
    this.location.back();
  }

  delete(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(_ => console.log('Task deleted'));
    this.modalService.dismissAll();
    /*this.location.go('/dashboard');*/
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
}
