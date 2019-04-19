import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {BaseForm} from '../core/BaseForm'
import {User} from '../modelo/user'


@Component({
    selector: 'user-form',
    templateUrl: './user.form.html',
    styleUrls: ['./../app.component.css']
//    providers: [ClientesService, Globals]
//    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class UserRegisterForm extends BaseForm<User> {    
    createForm() {
        this.form = new FormGroup({
            id: new FormControl(),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }
    setErrors() {
        this.form.get("email").setErrors({"required": true});
        this.form.get("password").setErrors({"required": true});
    }
    
}

