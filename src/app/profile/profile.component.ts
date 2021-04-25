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
  /*user: User = {
    nickname: 'Facundo',
    email: 'facu@mail.com',
    projects: [
      {name: 'Project1', description: 'Dificil', owner: 'Facundo', budget: 1200, tasks: [
        {id: 123, name: 'Cocinar torta', description: 'Dale loco', reward: 340, project_name: 'Project1'},
        {id: 567, name: 'Sacar fotos', description: 'Vamos tomas', reward: 456, project_name: 'Project1'}
        ]},
      {name: 'Project2', description: 'Facilongo', owner: 'Facundo', budget: 4500, tasks: [
          {id: 34, name: 'Hacer casa', description: 'Punchi punchi', reward: 1200, project_name: 'Project2'},
          {id: 77, name: 'Codear Java', description: 'Tutuca', reward: 20, project_name: 'Project2'}
        ]}
      ],
  };*/
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
