/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthService} from './authorizacion-service'
import {TokenLocalStore} from './token-local-store'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    tokenStore: TokenLocalStore = new TokenLocalStore()
    
    
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let token = this.tokenStore.getToken();
        if (token ) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            });
        }
        
        return next.handle(request);
    }
}

//@Injectable()
//export class ErrorInterceptor implements HttpInterceptor {
//    
//    constructor(private authServ:AuthService){
//        
//    }
//    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//        // add authorization header with basic auth credentials if available
//        
////        return next.handle(request).pipe(catchError({error:any, caught: new Observable<HttpEvent<any>>()}))
//    }
//}

@Injectable()
export class AuthGuard implements CanActivate {
    
    tokenStore: TokenLocalStore = new TokenLocalStore()

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.tokenStore.isLogin()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}


