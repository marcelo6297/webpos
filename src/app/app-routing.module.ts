import { UploadsComponent } from './uploads/uploads.component';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ProductosComponent } from './productos/productos.component';
import {AuthGuard} from './_auth/AuthInterceptor'


import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ComprasComponent } from './compras/compras.component';
import { AddComprasComponent } from './compras/add-compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentasListComponent } from './ventas/ventas.list.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';


const rutas: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'index', component: ClienteComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'clientes', component: ClienteComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'clientes/:id/edit', component: ClienteDetailComponent, pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'clientes/new', component: ClienteDetailComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'clientes/upload', component: UploadsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'productos', component: ProductosComponent, pathMatch: 'full', canActivate: [AuthGuard]},
//  {path: 'productos/:id/edit', component: ProductosNewComponent, pathMatch: 'full'},
//  {path: 'productos/new', component: ProductosNewComponent, pathMatch: 'full'},
  {path: 'productos/varios', component: ProductosDetailComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'compras', component: ComprasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'compras/new', component: AddComprasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'compras/:id/edit', component: AddComprasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'ventas', component: VentasListComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'ventas/new', component: VentasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'ventas/:id/edit', component: VentasComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'user', component: UsuariosComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
//  {path: 'ventas/new', component: AddVentasComponent, pathMatch: 'full'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(rutas)],
    exports: [RouterModule],
})
export class AppRoutingModule {}