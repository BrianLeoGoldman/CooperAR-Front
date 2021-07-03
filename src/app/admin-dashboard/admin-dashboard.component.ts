import {Component, OnInit, SecurityContext} from '@angular/core';
import {MoneyRequest} from '../model/moneyRequest';
import {UserService} from '../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  moneyRequests: MoneyRequest[] = [];
  private sanitizer: DomSanitizer;
  image: any;
  private readonly imageType: string = 'data:image/JPG;base64,';
  showButtons = true;
  requestInProgress: boolean;
  stateSelected = 'ABIERTO';

  requestsLength = 0;
  $requestValues = of();
  requestPageEvent: PageEvent; // MatPaginator Output
  pageSize = 4;

  constructor(private userService: UserService,
              private sanitized: DomSanitizer,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.requestInProgress = false;
    this.getMoneyRequests(this.stateSelected);
    this.sanitizer = this.sanitized;
  }

  private getMoneyRequests(state: string): void {
    this.userService.getMoneyRequests(state)
      .subscribe(moneyRequests => this.processMoneyRequests(moneyRequests));
  }

  // tslint:disable-next-line:typedef
  processMoneyRequests(moneyRequests: MoneyRequest[]) {
    this.moneyRequests = moneyRequests;
    this.$requestValues = of(this.moneyRequests);
    this.requestsLength = this.moneyRequests.length;
    console.log('requestsLength: ' + this.requestsLength);
    this.showButtons = !(this.stateSelected === 'APROBADO' || this.stateSelected === 'RECHAZADO');
  }

  // tslint:disable-next-line:typedef
  approveMoneyRequest(id: number) {
    this.requestInProgress = true;
    this.userService.approveMoneyRequest(id)
      .subscribe(success => this.reloadAndFeedback(
        'El pedido ' + id + ' fue aprobado exitosamente',
        'PEDIDO APROBADO'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  rejectMoneyRequest(id: number) {
    this.requestInProgress = true;
    this.userService.rejectMoneyRequest(id)
      .subscribe(success => this.reloadAndFeedback(
        'El pedido ' + id + ' fue rechazado',
        'PEDIDO RECHAZADO'),
        error => this.requestInProgress = false);
  }

  // tslint:disable-next-line:typedef
  reloadAndFeedback(message: string, title: string) {
    this.toastr.info(message, title);
    this.ngOnInit();
  }

  // tslint:disable-next-line:typedef
  getFile(id: number, type: string, fileName: string) {
    this.userService.getFile(id.toString(), type, fileName)
      .subscribe(data => this.processImage(data));
  }

  // tslint:disable-next-line:typedef
  processImage(data: any) {
    // this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
    this.image = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(this.imageType + data.content));
    console.log('this.image: ' + this.image);
    const image2 = new Image();
    image2.src = this.image;
    console.log(image2);
    window.open('about:blank').document.write(image2.outerHTML);
    /*window.open(this.image, this.image);*/
  }

  // tslint:disable-next-line:typedef
  setStateSelected(state: string) {
    this.stateSelected = state;
    this.ngOnInit();
  }
}
