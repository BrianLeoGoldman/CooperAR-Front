import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {

  constructor(private router: Router,
              private toastr: ToastrService) { }

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const requiresLogin = route.data.requiresLogin;
    const isLogged = sessionStorage.getItem('loggedUser') !== '' && sessionStorage.getItem('loggedUser') !== null;
    if (requiresLogin && !isLogged) {
      this.toastr.error('Por favor, inicie sesion para acceder', 'ACCESO NO AUTORIZADO');
      this.router.navigate([`/login`]).then(r => console.log('FORBIDDEN ACCESS'));
      return false;
    }
    else {
      return true;
    }
  }

}
