import { Component, OnInit } from '@angular/core';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatSnackBar,
    MatDialog
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

}
