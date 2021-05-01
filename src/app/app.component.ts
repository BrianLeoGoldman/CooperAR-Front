import { Component } from '@angular/core';
import {GlobalConstants} from './common/global-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CooperAR';

  // tslint:disable-next-line:typedef
  goProfile() {
    this.router.navigate([`/profile/${GlobalConstants.loggedUser}`]);
  }

  constructor(private router: Router) {
  }
}
