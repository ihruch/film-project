import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from '@angular/router';
// import { AuthService } from './../services/auth.service';
import { AuthMDBService } from './../services/auth-mdb.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    // private authService: AuthService,
    private dbServices: AuthMDBService,
    private router: Router
  ) {}

  canActivate() {
    const isLogin = this.dbServices.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad() {
    return this.canActivate();
  }

  canActivateChild() {
    return this.canActivate();
  }
}
