import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


import { User } from './../modelo/user';
import {PageableResponse} from '../helpers/PageableResponse'
import {Servicio} from '../core/Filtro'
import {TokenLocalStore} from '../_auth/token-local-store'

@Injectable()
export class UserService implements Servicio<User> {
    
    constructor(
        private http: HttpClient,
        private tokenStore: TokenLocalStore
    ){}
    
    private _urls = {
        get: 'api/user',
        getAdmin: 'api/user/admin',
    }
    
    getAll(options: {params?: any}): Observable<PageableResponse<User>> {
        let url = this._urls.get;
        if (this.tokenStore.getAuthorities().includes("ADMIN")) {
            url = this._urls.getAdmin
        }
        return this.http.get<PageableResponse<User>>(url); 
    }
    getOne(id: number): Observable<User> {
        throw new Error("Method not implemented.");
    }
    saveOrUpdate(item: User) {
        throw new Error("Method not implemented.");
    }
    delete(ids: number[]) {
        throw new Error("Method not implemented.");
    }
    filter(filterBody: any, options: {params?: any;}): Observable<PageableResponse<User>> {
        throw new Error("Method not implemented.");
    }
    
}