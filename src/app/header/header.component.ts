import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from '../common/global-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goProfile(): void {
    this.router.navigate([`/profile/${GlobalConstants.loggedUser}`]);
  }

  closeSession(): void {
    GlobalConstants.loggedUser = '';
    GlobalConstants.token = '';
    this.router.navigate([`/login`]);
  }
}
