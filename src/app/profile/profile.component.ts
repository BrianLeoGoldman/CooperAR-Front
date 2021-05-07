import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {Project} from '../model/project';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user?: User;
  projects: Project[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService) { }

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
}