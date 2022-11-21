import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfiguration} from '../../../api/backend/api-configuration';
import {LoginRequest} from '../../../api/backend/model/login-request';
import {LoaderService} from '../loader/loader.service';
import {catchError, finalize, map} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KeepAliveService {

  private readonly TOKEN = 'TOKEN';
  private readonly USER = 'USER';

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  public login(request: LoginRequest): void {
    this.loaderService.start();
    this.save(request);
  }

  public keepAlive(): void {
    this.loaderService.start();
    this.http.get(ApiConfiguration.keepAliveEndpoint,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `${localStorage.getItem(this.TOKEN)}`
        }
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem(this.TOKEN, JSON.stringify(response.token));
          localStorage.setItem(this.USER, JSON.stringify(response));
        }),
        catchError(error => {
          console.log('An unexpected error occurred while keep alive');
          return throwError(error);
        }),
        finalize(() => {
          this.loaderService.stop();
        })).subscribe();
  }

  private save(request: any): void {

    if (!!request) {
      this.http.post(ApiConfiguration.authEndpoint, request,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
        .pipe(
          map((response: any) => {
            localStorage.setItem(this.TOKEN, JSON.stringify(response.token));
            localStorage.setItem(this.USER, JSON.stringify(response));
          }),
          catchError(error => {
            console.log('An unexpected error occurred while logining in ', request.username);
            return throwError(error);
          }),
          finalize(() => {
            this.loaderService.stop();
          })).subscribe();
    }
  }
}
