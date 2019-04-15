
import {Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatSnackBar, MatDialog ,MatTableDataSource, 
MatCheckboxChange,MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription'
import {merge} from 'rxjs/operators'
import {debounceTime} from 'rxjs/operators/debounceTime';

import { ProductosService } from './../servicios/productos.service';
import { Producto }         from '../modelo/Producto';
import { BorrarDialog }     from '../dialog/borrar.dialog'
import { ProductosDialog }  from '../dialog/productos.dialog'
import { PageableRequestOptions} from '../helpers/PageableResponse'
import {ProductosFilter} from '../filters/productos.filter'
import {Globals} from '../globals'
import {BaseListComponent} from '../core/BaseListComponent'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService,Globals]
})
export class ProductosComponent extends BaseListComponent<Producto> implements OnInit, OnDestroy {

  
  displayedColumns = ['id', 'codigo','nombre', 'descripcion', 'precioVenta', 'iva','stockInicial','totalIngreso','totalSalida','totalStock', 'estadoStock', 'acciones'];

  
  message = "No se puede eliminar Productos que tienen Registros asociados en compras o ventas"
  showMessage = false;
  

  
  @ViewChild(ProductosFilter) filtro: ProductosFilter;

  constructor( snackBar: MatSnackBar ,
       _srvc: ProductosService , 
       dialog: MatDialog,
       global: Globals,
  
  ) {
      super(snackBar, dialog, global, _srvc);
 }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
   
    this.getAll();
    
    
    //suscribir a los dos cambios
    let merged$ = this.sort.sortChange.pipe(merge(this.paginator.page))
    this.subscripciones.push(
        merged$.subscribe(val => 
        {
//            if (val.active) {
//                this.paginator.firstPage() 
//            }
             this.filtrar();
        })        
    )
    
    this.subscripciones.push(
        this.sort.sortChange.subscribe(val => this.paginator.firstPage() )
    )
    this.subscripciones.push(
        this.filtro.change.pipe(debounceTime(this.global.duration.short)).subscribe(val => {
            this.filtrar();
        })
    )
  }
  
  



  
  //Agregado el 2019-01-24
   aBorrar(evt: MatCheckboxChange, id) {
    
    if (evt.checked) {
      this.ids.push(id);
    }
    else {
       // Item to remove
      this.ids = this.ids.filter(obj => obj !== id);
    }
    
    this.borrarDisabled = !(this.ids.length > 0) ;
    
    
  }
  

  

  

    
  nuevo() {
      let dialogData = {data : {producto: new Producto(), isEditing: false}, width: '60%' }
      this._openDialog(dialogData)
  }
  
  edit(id:number) {
      let producto
      for (let i = 0; i < this.dataSource.data.length ;i++) {
          if (this.dataSource.data[i].id === id) {
              producto = this.dataSource.data[i]
              break;
          }
      }
      let dialogData = {data: {producto: producto, isEditing: true}, width: '60%' }
      this._openDialog(dialogData)
  }  
  
  private _openDialog(dialogData:any){
      let mensajeOK, mensajeNoOK
        if (dialogData.data.isEditing) {
            mensajeOK = this.global.messageSuccess.editar;
            mensajeNoOK = this.global.messageError.editar;
        }
        else {
            mensajeOK = this.global.messageSuccess.guardar;
            mensajeNoOK = this.global.messageError.guardar;
        }
        const dialogRef = this.dialog.open(ProductosDialog, dialogData);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.getAll();
//                this._srvc.updateStock().subscribe(res => {
//                    this.filtro.reset();
//                })
            };
            
        }, error => {
            this.showSnack(mensajeNoOK + error.message)
        })
  }
  
  exists(item) {
      return this.ids.indexOf(item) > -1;
  };

}
