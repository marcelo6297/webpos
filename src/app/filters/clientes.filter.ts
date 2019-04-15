import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import {Form} from '../core/Filtro'
import {Cliente} from '../modelo/cliente'

@Component({
    selector: 'clientes-filter',
    templateUrl: './clientes.filter.html',
    providers: []
    //    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class ClientesFilter implements OnInit, OnDestroy, Form<Cliente> { 
    setValues(T: any): void {
        throw new Error("Method not implemented.");
    }
    
    form: FormGroup;
    private estaActivo = ['','true','false']
    private subscripciones: Subscription[]=[];
    @Output() change: EventEmitter<any> = new EventEmitter();
    
    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
        
    }
    ngOnInit(): void {
        this.createForm();
                        
        this.subscripciones.push( 
            this.form.valueChanges.subscribe(val => {
                this.change.emit(val);
            })
        )
    }
    
    createForm(){
         this.form = new FormGroup({
            nombre: new FormControl(),
            apellido: new FormControl(),
            ruc: new FormControl(),
            activo: new FormControl(),
            telefono: new FormControl(),
            direccion1: new FormControl(),
            fechaNacimiento: new FormGroup({
                min:new FormControl(),
                max:new FormControl()
            }),
        });
    }
    
    public reset(){
        this.form.reset();
    }
    
    public getValue(): any {
        return this.form.value;
    }

}