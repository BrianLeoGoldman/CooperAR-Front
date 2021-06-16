import { Component, OnInit } from '@angular/core';
import {MoneyRequest} from '../model/moneyRequest';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  moneyRequests: MoneyRequest[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getMoneyRequests('ABIERTO');
  }

  private getMoneyRequests(state: string): void {
    this.userService.getMoneyRequests(state)
      .subscribe(moneyRequests => this.moneyRequests = moneyRequests);
    console.log(this.moneyRequests);
  }

  // tslint:disable-next-line:typedef
  approveMoneyRequest(id: number) {
    this.userService.approveMoneyRequest(id)
      .subscribe(_ => this.ngOnInit());
  }

  // tslint:disable-next-line:typedef
  rejectMoneyRequest(id: number) {
    this.userService.rejectMoneyRequest(id)
      .subscribe(_ => this.ngOnInit());
  }
}
