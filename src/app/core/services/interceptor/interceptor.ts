import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap, tap} from 'rxjs/operators';
import {PingService} from '../ping/ping.service';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private readonly HEADER_ACCESS_TOKEN_TYPE = 'Bearer';
  private readonly AUTH_HEADER = 'Authorization';
  private readonly UI_PROXY_AUTH = '/api/auth';


  constructor(private pingService: PingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {'Access-Control-Allow-Origin': '*', Accept: '*/*'}
    });

    if (request.url.includes(this.UI_PROXY_AUTH)) {

      return next.handle(request).pipe(
        tap(response => {
          if (response instanceof HttpResponse && !!response?.body) {
            this.pingService.refresh();
          }
        })
      );
    }

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())
      .pipe();

    // tslint:disable-next-line:typedef
    function handleRoute() {
      return next.handle(request);
    }
  }
}
