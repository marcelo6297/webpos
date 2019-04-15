/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {ViewChild, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatSnackBar,
    MatDialog
} from '@angular/material';

import {Globals} from '../globals'
import {BorrarDialog} from '../dialog/borrar.dialog';
import { PageableRequestOptions} from '../helpers/PageableResponse'
import {Form, Servicio} from '../core/Filtro'


export class BaseListComponent<T> implements OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource: MatTableDataSource<T>;
    subscripciones: Subscription[] = [];
    showSideNav = false;
    borrarDisabled = true;
    filtro: Form<T>;
    ids: number[] = [];
    


    constructor(
        protected snackBar: MatSnackBar,
        protected dialog: MatDialog,
        protected global: Globals,
        protected _srvc: Servicio<T>
    ) {
        this.dataSource = new MatTableDataSource<T>();
    }

    toogleSideNav() {
        this.showSideNav = !this.showSideNav;
    }

    filtrar() {
        let filtro = this.filtro.getValue();
        let options = PageableRequestOptions(this.paginator, this.sort);
        this._srvc.filter(filtro, options).subscribe(data => {
            this._cargarTabla(data)
        })
    }

    getAll() {
        let options = PageableRequestOptions(this.paginator, this.sort);
        return this._srvc.getAll(options).subscribe(data => {
            this._cargarTabla(data)
        })

    }

    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }

    protected _cargarTabla(data: {content, totalElements, size, number}) {
        this.dataSource.data = data.content;
        this.paginator.length = data.totalElements
        this.paginator.pageSize = data.size;
        this.paginator.pageIndex = data.number
    }

    borrar() {
        const dialogRef = this.dialog.open(BorrarDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this._srvc.delete(this.ids).subscribe(res => {
                    //falta mejorar para cumplir con el paginado y ordenado

                    this.ids = [];
                    this.borrarDisabled = true;
                    this.filtrar()
                },
                    error => {
                        this.showSnack(this.global.messageError.elimiar + error.message);
                        //Que hacer marcar todos los tildados o no

                    });
            }

        });

    }

    showSnack(message: any) {
        this.snackBar.open(message, "OK", {duration: 3000})
    }
}