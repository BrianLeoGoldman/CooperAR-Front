import {Component, OnInit, SecurityContext} from '@angular/core';
import {MoneyRequest} from '../model/moneyRequest';
import {UserService} from '../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private userService: UserService,
              private sanitized: DomSanitizer,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMoneyRequests('ABIERTO');
    this.sanitizer = this.sanitized;
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
    this.toastr.info('El pedido ' + id + ' fue aprobado exitosamente', 'PEDIDO APROBADO');
  }

  // tslint:disable-next-line:typedef
  rejectMoneyRequest(id: number) {
    this.userService.rejectMoneyRequest(id)
      .subscribe(_ => this.ngOnInit());
    this.toastr.info('El pedido ' + id + ' fue rechazado', 'PEDIDO RECHAZADO');
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

}
