import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Producto } from '../modelo/Producto';
import {PageableResponse} from '../helpers/PageableResponse'
import {Servicio} from '../core/Filtro'

@Injectable()
export class ProductosService implements Servicio<Producto>{

  private urls = {
      get : 'api/productos',
      update : 'api/productos/updateStock',
      delete : 'api/productos/delete',
      search : 'api/productos/search',
      filter: 'api/productos/filter'
      
  }
  
  constructor(private http: HttpClient) { }

  /**
   * Retorna la lista de productos desde el servidor
   */
  getAll(options: {params?}): Observable<PageableResponse<Producto>> {
      
      return this.http.get<PageableResponse<Producto>>(this.urls.get, options );
    
  }
  
    
  /**
   * Retorna la lista de compras
   */
  search(search, ids?:string[]): Observable<Producto[]> {
    // return of(CLIENTES);
      
      const options = {
      params: {
        'search': search,
        'ids': ids,
      }}
      return this.http.get<Producto[]>(this.urls.search, options);
      
      
  }  
  /**
   * Enviar archivos al servidor
   */
  postFile(file: File): Observable<Producto[]> {

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Producto[]>(this.urls.get + '/upload', formData);

  }
  
  /**
   * Guardar Producto
   */
   saveOrUpdate(prod:Producto) : Observable<Producto> {
       return this.http.post<Producto>(this.urls.get, prod);
   }
   
   getOne(id:number) : Observable<Producto>{
       return this.http.get<Producto>(this.urls.get + '/' + id);
   }
   
   delete(ids:number[], ) {
       return this.http.post<Producto[]>(this.urls.delete, ids);
   }
   
   //actualizar el stock
   updateStock() {
       return this.http.post(this.urls.update, {});
   }
   
   /**
    * Filtrar el formulario
    */
   filter(filterBody: any,options: {params?}): Observable<PageableResponse<Producto>> {
       return this.http.post<PageableResponse<Producto>>(this.urls.filter, filterBody, options);
   }

}
