/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Observable } from 'rxjs/Observable';
import { Cliente } from './../modelo/cliente';
import {PageableResponse} from '../helpers/PageableResponse'
 
export interface Form<T> {
    createForm():void;
    reset():void;
    getValue():T;
    setValues(T):void;
}

/**
 * interface servicio
 */
export interface Servicio<T> {
    getAll(options: {params?}): Observable<PageableResponse<T>>;
    getOne(id: number) :Observable<T>;
    saveOrUpdate(item: T);
    delete(ids: number[]);
    filter(filterBody: any, options: {params?}): Observable<PageableResponse<T>> 
}
