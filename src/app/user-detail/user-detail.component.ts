import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {strict} from 'assert';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user?: User;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const nickname  = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(nickname)
      .subscribe(user => this.user = user);
  }

  save(): void {
    this.toastr.info('This functionality is not implemented yet!', 'Nothing happened');
    /*this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());*/
  }

  goBack(): void {
    this.location.back();
  }

}
