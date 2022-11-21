import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';
import {PingService} from '../../core/services/ping/ping.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


  constructor(public router: Router, private authService: AuthService, private pingService: PingService) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      console.log('invalid user');
      return false;
    }
    this.pingService.ping();
    return true;
  }
}
