import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.component.html',
  styleUrls: ['./request-money.component.scss']
})
export class RequestMoneyComponent implements OnInit {

  nickname: string;
  money: string;
  accountStatus: File = null;
  depositReceipt: File = null;
  validAmount: boolean;
  validSizeAccount: boolean;
  validSizeDeposit: boolean;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location) { }

  ngOnInit(): void {
    this.nickname = this.route.snapshot.paramMap.get('requester');
    this.money = this.route.snapshot.paramMap.get('money');
  }

  // tslint:disable-next-line:typedef
  validateAmount(amount: string) {
    this.validAmount = parseInt(amount, 10) > 0;
  }

  // tslint:disable-next-line:typedef
  handleFileInput(files: FileList, fileNumber: number) {
    if (fileNumber === 1) {
      this.accountStatus = files.item(0);
      this.validSizeAccount = this.accountStatus.size <= 1048576;
    }
    if (fileNumber === 2) {
      this.depositReceipt = files.item(0);
      this.validSizeDeposit = this.depositReceipt.size <= 1048576;
    }
  }

  goBack(): void {
    this.location.back();
  }

  // tslint:disable-next-line:typedef
  requestMoney(requestedValue: string) {
    this.userService.requestMoney(this.nickname, requestedValue, this.accountStatus, this.depositReceipt)
      .subscribe(data => {
        this.location.back();
      }, error => {
        console.log(error.toString());
      });
  }
}
