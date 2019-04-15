import {Component, OnInit, ViewChild} from '@angular/core';
import {UserRegisterForm} from '../forms/user.form'

import {AuthService} from '../_auth/authorizacion-service'
import {TokenLocalStore} from '../_auth/token-local-store'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../app.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(UserRegisterForm) form: UserRegisterForm;
  
  tokenStore: TokenLocalStore = new TokenLocalStore();
  returnUrl;
  constructor(private _srvc: AuthService
  ) { }
  

  ngOnInit() {
  }
  
  login() {
      this._srvc.login(this.form.getValue())
  }
  logout() {
      this._srvc.logout()
  }
  
    registrar() {
      
  }

}
