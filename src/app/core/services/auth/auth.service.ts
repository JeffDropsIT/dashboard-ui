import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ApiConfiguration} from '../../../api/backend/api-configuration';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _appToken = 'appToken';
  private _authTokenType = 'authTokenType';
  private _authToken = 'authToken';
  private _currentLoginUser = 'currentLoginUser';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get appToken(): string {
    return localStorage.getItem(this._appToken) || '';
  }

  public set appToken(value: string) {
    localStorage.setItem(this._appToken, value);
  }

  public get authTokenType(): string {
    return localStorage.getItem(this._authTokenType) || '';
  }

  public set authTokenType(value: string) {
    localStorage.setItem(this._authTokenType, value);
  }

  public get authToken(): string {
    return localStorage.getItem(this._authToken) || '';
  }

  public set authToken(value: string) {
    localStorage.setItem(this._authToken, value);
  }

  public set currentLoginUser(value: string) {
    localStorage.setItem(this._currentLoginUser, value);
  }
  public get currentLoginUser(): string {
    // @ts-ignore
    return localStorage.getItem(this._currentLoginUser);
  }

  public getTokenHeader(): string {
    if (!!this._authTokenType && !!this._authToken) {
      return this._authTokenType + ' ' + this._authToken;
    }
    return '';
  }

  public authenticate(userLoginRequest: any, error: any): void {
    this.httpClient
      .post(`${ApiConfiguration.authEndpoint}/login`, userLoginRequest)
      .pipe(tap((response: any) => {
          this.authTokenType = 'Bearer ';
          this.authToken = response?.token;
          if (this.isAuthenticated()) {
            this.currentLoginUser = JSON.stringify(response);
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
        }, (errorResponse) => {
          console.log('error logging in');
          error.message = 'Error while logging in';
        }
      )).subscribe();
  }

  public isAuthenticated(): boolean {
    return !!this.authTokenType && !!this.authToken || environment.isDebugMode;
  }

  public unAuthenticate(): void {
    this.authToken = '';
    this.authTokenType = '';
    this.currentLoginUser = '';
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unAuthenticate();
  }
}
