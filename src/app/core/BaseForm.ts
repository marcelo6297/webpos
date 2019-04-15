import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup} from '@angular/forms';

import {Subscription} from 'rxjs/Subscription';


import {Globals} from '../globals'
import {Form} from '../core/Filtro'

export class BaseForm<T> implements OnInit, OnDestroy, Form<T> {
    
    
    item: T
    form: FormGroup;
    subscripciones: Subscription[]=[];
    
    createForm(): void {
        throw new Error("Method not implemented.");
    }
    reset(): void {
        this.form.reset()
    }
    getValue():T {
        return this.form.value;
    }
    
    
    
   ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }
    
    ngOnInit(): void {
        this.createForm()
    }
    
    setValues(T: any): void {
        throw new Error("Method not implemented.");
    }
}