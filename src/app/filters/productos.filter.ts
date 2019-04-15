import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { debounceTime } from 'rxjs/operators/debounceTime';
import { Observable }   from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'productos-filter',
    templateUrl: './productos.filter.html',
    providers: []
    //    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class ProductosFilter implements OnInit, OnDestroy {


    form: FormGroup;
    private estados = ['','Normal', 'Minimo', 'Critico']
    private estaActivo = ['','true','false']
    @Output() change: EventEmitter<any> = new EventEmitter();
    
    private subscripciones: Subscription[]=[];
    
    constructor(
        
        ) 
    {
       
    }

    ngOnInit() {
        console.log("ngInit Filtro")
        this.createForm();
                        
        this.subscripciones.push( 
            this.form.valueChanges.subscribe(val => {
                this.change.emit(val);
            })
        )
    }

    public getValue(): any {
        return this.form.value;
    }


    
    createForm(){
         this.form = new FormGroup({
            codigo: new FormControl(),
            nombre: new FormControl(),
            estadoStock: new FormControl(),
            estaActivo: new FormControl(),
            precioCompra: new FormGroup({
                min:new FormControl(),
                max:new FormControl()
            }),
            precioVenta: new FormGroup({
                min:new FormControl(),
                max:new FormControl()
            }),
            totalStock: new FormGroup({
                min:new FormControl(),
                max:new FormControl()
            })
          });
    }
    
    reset(){
        this.form.reset();
    }
    
    public setValues(data:any) {
        let value = {
        
        }
        this.form.setValue(value)
    }
    
    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }
}