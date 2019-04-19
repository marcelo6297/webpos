import {Component, OnInit, ViewChild} from '@angular/core';
import {UserRegisterForm} from '../forms/user.form'

import {AuthService} from '../_auth/authorizacion-service'
import {TokenLocalStore} from '../_auth/token-local-store'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../app.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(UserRegisterForm) form: UserRegisterForm;

  tokenStore: TokenLocalStore = new TokenLocalStore();
  returnUrl;
  errorCredencial = ""
  showError:boolean = false;
  constructor(private _srvc: AuthService
  ) { }
  

  ngOnInit() {
  }

  login() {
      this._srvc.login(this.form.getValue(), (
        err:HttpErrorResponse)=>
        {
          if (err.status === 403) {
            this.errorCredencial = err.statusText;
            this.form.setErrors();
            this.showError = true;
          }
        })
  }
  limpiar() {
      this.form.reset()
  }

    registrar() {

  }

}
