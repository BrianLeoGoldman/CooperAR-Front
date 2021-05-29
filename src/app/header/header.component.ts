import {Component, OnInit} from '@angular/core';
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
    this.router.navigate([`/profile/${sessionStorage.getItem('loggedUser')}`]);
  }

  closeSession(): void {
    // GlobalFunctions.loggedUser = '';
    // GlobalFunctions.token = '';
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedUser');
    this.router.navigate([`/login`]);
  }
}
