import { Component, OnInit } from '@angular/core';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatSnackBar,
    MatDialog,
    MatCheckboxChange
} from '@angular/material';

import {Globals} from '../globals'
import {BaseListComponent} from '../core/BaseListComponent'
import {User} from '../modelo/user';
import {UserService} from '../servicios/user.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UserService]
})
export class UsuariosComponent extends BaseListComponent<User> implements OnInit {

    displayedColumns = ['id', 'nombre', 'apellido', 'email', 'direccion', 'enabled']
    
    
    
    constructor(
        protected snackBar: MatSnackBar,
        protected dialog: MatDialog,
        protected global: Globals,
        protected _srvc: UserService
    ) {
        super(snackBar, dialog, global, _srvc);
    }

  ngOnInit() {
      this.getAll();
  }
  
  borrar(){}
  
  marcar(evt: MatCheckboxChange, id:number){
      if (evt.checked) {
      this.ids.push(id);
    }
    else {
       // Item to remove
      this.ids = this.ids.filter(obj => obj !== id);
    }
    
    this.borrarDisabled = !(this.ids.length > 0) ;
    
      
  }

}
