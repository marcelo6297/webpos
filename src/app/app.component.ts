import { Component, OnInit, OnDestroy } from '@angular/core';

import {AuthService} from './_auth/authorizacion-service'
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnDestroy,OnInit{
    
    
    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }
    
    subscripciones: Subscription[]=[];
    
    ngOnInit(): void {
        this.subscripciones.push( this._srvc.authChange$.subscribe( res =>{
            if (res) {
                this._srvc.getPrincipal().subscribe(res => {
                    this.userName = res.name;
                    this.direccion = res.details.remoteAddress;
                    this.roles = this._srvc.getRoles();
                    }
                )    
            }
        }
        )
        )
    }
  title = 'Facturacion V0.1';
  showSideNav = false;
  userName;direccion;roles
  
  
  constructor(private _srvc: AuthService) {
      
    this.userName = this._srvc.getUsername();
      
  }
  
  isLoggedIn(){
      return this._srvc.isLoggedIn();
  }
  menu: any = [
    { titulo: 'Clientes', ruta: '/clientes', icon: 'person' },
//    { titulo: 'Nuevo Cliente', ruta: '/clientes/new' },
    { titulo: 'Productos', ruta: '/productos', icon: 'shoping' },
//    { titulo: 'Productos', ruta: '/productos/new' },
    { titulo: 'Ventas', ruta: '/ventas', icon: 'shoping' },
    { titulo: 'Nueva Venta', ruta: '/ventas/new' },
    { titulo: 'Compras', ruta: '/compras',  icon: 'shoping' },
    { titulo: 'Usuarios', ruta: '/user', icon: 'account_circle' },
//    { titulo: 'Login', ruta: '/login' },
  ];
  toogleSideNav() {
    this.showSideNav = !this.showSideNav;
  }
    
  logout(){
      this._srvc.logout(); 
     
  }
}
