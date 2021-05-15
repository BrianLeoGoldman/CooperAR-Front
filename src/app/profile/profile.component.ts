import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {Project} from '../model/project';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalConstants} from '../common/global-constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User =  { nickname: '', firstname: '', lastname: '', password: '', email: '', birthday: '', province: '', money: 0, projects: []};
  projects: Project[] = [];
  isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const nickname  = this.route.snapshot.paramMap.get('id');
    this.isOwner = GlobalConstants.loggedUser === nickname;
    this.userService.getUser(nickname)
      .subscribe(user => this.user = user);
  }

  // tslint:disable-next-line:typedef
  delete(nickname: string) {
    this.userService.deleteUser(nickname)
      .subscribe(_ => console.log('USUARIO ELIMINADO'));
    this.modalService.dismissAll();
    this.router.navigate(['/login']).then(r => console.log(r));
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

  // tslint:disable-next-line:typedef
  goCreateProject() {
    this.router.navigate(['/project-create.component/', this.user.nickname, this.user.money])
      .then(r => console.log(r));
  }
}
