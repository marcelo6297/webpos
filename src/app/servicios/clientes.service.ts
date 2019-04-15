import { Location } from '@angular/common'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Cliente } from './../modelo/cliente';
import {PageableResponse} from '../helpers/PageableResponse'
import {Servicio} from '../core/Filtro'

@Injectable()
export class ClientesService implements Servicio<Cliente> {

  
    private urls = {
      get :     'api/clientes',
      update :  'api/clientes/updateStock',
      delete :  'api/clientes/delete',
      search :  'api/clientes/search?search=',
      filter:   'api/clientes/filter',
      ruc:      'api/clientes/ruc?ruc=',
      tipos:    'api/clientes/tipos',
      exportar: 'api/clientes/exportar',
      
  }
//  private clientesUrl = 'api/clientes';
//  private delteUrl = this.clientesUrl + '/delete';
//  private query = '/search?search=';
//  private ruc = this.clientesUrl +'/ruc';
//  private tiposUrl = this.clientesUrl + '/tipos';
//  private exportar = this.clientesUrl + '/exportar';
  
  constructor(private location: Location, private http: HttpClient) { }

  getAll(options: {params?}): Observable<PageableResponse<Cliente>> {
    // return of(CLIENTES);
      return this.http.get<PageableResponse<Cliente>>(this.urls.get, options);
  }


  findAll(search: string): Observable<Cliente[]> {
    // return of(CLIENTES);
      return this.http.get<Cliente[]>(this.urls.search + search);
  }
  
  getAllTipos(): Observable<string[]> {
      return this.http.get<string[]>(this.urls.tipos);
  }

  getOne(id: number) {
      return this.http.get<Cliente>(this.urls.get + '/' + id);
  }

  saveOrUpdate(item: Cliente) {
      return this.http.post(this.urls.get, item);
  }

 
  delete(ids: number[]) {
      return this.http.post(this.urls.delete, ids);
  }
  
  
  /**
   * Traer el archivo desde el servidor
   * Paso dos filtrar por IDS
   */
  getFile() {
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8'
      }),
      responseType: 'text' as 'text'
    };
      return this.http.get(this.urls.exportar, httpOptions);
  }
  
  //Traer por ejemplos
  findByRuc(ruc):Observable<Boolean>{
      return this.http.get<Boolean>(this.urls.ruc + ruc);
  }
  
  //2019-03-30
  filter(filterBody: any, options: {params?}): Observable<PageableResponse<Cliente>> {
       return this.http.post<PageableResponse<Cliente>>(this.urls.filter, filterBody, options);
   }
  
}
