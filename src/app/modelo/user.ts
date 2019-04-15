/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export interface User {
    id: number
    username:string
    password:string
}

export interface Principal {
    authenticated: boolean,
    authorities: any,
    details: {remoteAddress:string }
    name: string,
}

