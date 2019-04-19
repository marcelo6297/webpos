/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
import { JwtResponse } from './JwtResponse';
import {User, Principal} from '../modelo/user'
//import { AuthLoginInfo } from './login-info';
//import { SignUpInfo } from './signup-info';

import {TokenLocalStore} from './token-local-store'
 
 
@Injectable()
export class AuthService {
    
    private urls = {
        login: 'api/principal/login',
        principal: 'api/principal'

    };
    private returnUrl: string;
    private tokenStore = new TokenLocalStore();
    authChange$ = new Subject();
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }
 
   attemptAuth(credentials: User):Observable<JwtResponse>{
      
      
      return this.http.post<JwtResponse>(this.urls.login, credentials);
  }
  
  login(credentials: User, errorCallback) {
     
      this.attemptAuth(credentials).subscribe(
          res => {
              this.tokenStore.setUser(res.username)
              this.tokenStore.setToken(res.token)
              this.tokenStore.setAuthorities(JSON.stringify(res.authorities))
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.authChange$.next(true);
              this.router.navigate([this.returnUrl]);
//              Emitir el evento de cambio de credenciales
              
              
          }, err=>errorCallback(err));
  }
  /* elimina el token del servidor y del localSessionStore
   */
  logout(){
      this.tokenStore.clear();
      this.authChange$.next(false);
      this.router.navigate(["/login"]);
  }
  
  isLoggedIn() {
      return this.tokenStore.isLogin()
  }
  
  getUsername():string{
      return this.tokenStore.getUser()
  }
  getRoles():string[]{
      return this.tokenStore.getAuthorities()
  }
  
  getPrincipal(): Observable<Principal> {
      return this.http.get<Principal>(this.urls.principal); 
  }
 
}