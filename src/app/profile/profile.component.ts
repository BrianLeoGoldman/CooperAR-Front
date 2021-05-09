import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {Project} from '../model/project';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /*@Input() user?: User*/
  user: User =  { nickname: '', firstname: '', lastname: '', password: '', email: '', birthday: '', province: '', money: 0, projects: []};
  projects: Project[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getData();
  }

  prepareData(): void {
    console.log(this.projects);
  }

  getData(): void {
    const nickname  = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(nickname)
      .subscribe(user => this.user = user);
  }

  // tslint:disable-next-line:typedef
  delete(nickname: string) {
    this.userService.deleteUser(nickname)
      .subscribe(_ => console.log('OK'));
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => { // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => { // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
      );
  }

  /*private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }*/
}
