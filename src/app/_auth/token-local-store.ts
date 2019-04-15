import {Subject} from 'rxjs/Subject'

import {Principal} from '../modelo/user';
    export class TokenLocalStore {

    USER_KEY = "userKey"
    TOKEN_KEY = "token"
    AUTHORITIES_KEY = "authorities"
    
    public  prin$:Subject<Principal> = new Subject();

    public getUser(): string {return sessionStorage.getItem(this.USER_KEY)}
    public setUser(user) {
        sessionStorage.setItem(this.USER_KEY, user);
    }
    public getToken() { return sessionStorage.getItem(this.TOKEN_KEY) }
    public setToken(token) { 
        
        sessionStorage.setItem(this.TOKEN_KEY, token)
    }
    public setAuthorities(authorities) {sessionStorage.setItem(this.AUTHORITIES_KEY, authorities)}
    public getAuthorities():string[] {
        let result=[];
        if (sessionStorage.getItem(this.AUTHORITIES_KEY)) 
            JSON.parse(sessionStorage.getItem(this.AUTHORITIES_KEY)).forEach(
            auth=> {
                result.push(auth.authority);
            })
        return result;
    }
    public clear() {
        sessionStorage.removeItem(this.USER_KEY)
        sessionStorage.removeItem(this.TOKEN_KEY)
        sessionStorage.removeItem(this.AUTHORITIES_KEY)
    }

    public isLogin(): boolean {
        return this.getToken() != null;
    }
    
    public setPrincipal(p:Principal){
        this.prin$.next(p)
    }
}
