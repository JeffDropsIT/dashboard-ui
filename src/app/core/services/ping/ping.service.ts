import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  private readonly INACTIVE_TIMEOUT = 16000;
  interval: any;

  constructor(private authService: AuthService) {
  }

  ping(): void {
    this.interval = setTimeout(() => {
      alert('Session timeout');
      this.authService.unAuthenticate();
    }, this.INACTIVE_TIMEOUT);
  }

  refresh(): void {
    clearInterval(this.interval);
    this.ping();
  }
}
