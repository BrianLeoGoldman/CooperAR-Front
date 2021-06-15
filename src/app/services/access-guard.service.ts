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
    const requiresAdmin = route.data.requiresAdmin;
    const isLogged = sessionStorage.getItem('loggedUser') !== '' && sessionStorage.getItem('loggedUser') !== null;
    const isAdmin = sessionStorage.getItem('loggedUser') === 'admin';
    // CASE 1: trying to access while not logged in
    if (requiresLogin && !isLogged) {
      this.toastr.error('Por favor, inicie sesion para acceder', 'ACCESO NO AUTORIZADO');
      // this.router.navigate([`/login`]).then(r => console.log('FORBIDDEN ACCESS'));
      this.reject();
      return false;
    }
    // CASE 2: admin tries to access a user page
    if (requiresLogin && !requiresAdmin && isAdmin) {
      this.toastr.error('El administrador no puede acceder a las paginas de usuario', 'ACCESO NO AUTORIZADO');
      // this.router.navigate([`/login`]).then(r => console.log('FORBIDDEN ACCESS'));
      this.reject();
      return false;
    }
    // CASE 3: user try to access admin page
    if (requiresLogin && requiresAdmin && !isAdmin) {
      this.toastr.error('Solo el administrador puede acceder a esta pagina', 'ACCESO NO AUTORIZADO');
      // this.router.navigate([`/login`]).then(r => console.log('FORBIDDEN ACCESS'));
      this.reject();
      return false;
    }
    else {
      return true;
    }
  }

  // tslint:disable-next-line:typedef
  reject() {
    this.router.navigate([`/login`]).then(r => console.log('FORBIDDEN ACCESS - CLEARING CREDENTIALS'));
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedUser');
  }

}
