import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { KeycloakService } from './keycloak.service';
@Injectable()
export class KeycloakInterceptorService implements HttpInterceptor {
  constructor(
    private keycloakService: KeycloakService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.keycloakService.isLoggedIn()) {
      return this.getUserToken().pipe(
        mergeMap((token) => {
          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }
          return next.handle(request);
        }));
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        
        //let data = {};
        //data = {
           // reason: error && error.error.reason ? error.error.reason : '',
            // status: error.status
        //};
        if(error.status == 401){
        this.keycloakService.login();        }
        return throwError(error);
    }));
  }
  getUserToken() {
    const tokenPromise: Promise<string> = this.keycloakService.getToken();
    const tokenObservable: Observable<string> = from(tokenPromise);
    return tokenObservable;
  }
}
