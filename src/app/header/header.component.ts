import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('loggedUser') === 'admin';
  }

  goProfile(): void {
    this.router.navigate([`/profile/${sessionStorage.getItem('loggedUser')}`]);
  }

  closeSession(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedUser');
    this.router.navigate([`/login`]);
  }
}
