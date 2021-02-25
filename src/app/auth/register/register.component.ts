import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls : [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false

  public registerForm = this.fb.group({
    nombre: ['Usuario', [ Validators.required, Validators.minLength(3)]],
    email: ['testest@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
    password2: ['12345', [Validators.required]],
    terminos: [true, [Validators.required]],
  }, // Validaciones personalizadas
    {
      validators: this.passWordsIguales('password','password2')
    }
  );

  constructor(private router: Router,
              private fb: FormBuilder,
              private usaurioService: UsuarioService) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted = true;
    // console.log(this.registerForm.value);
    // console.log(this.registerForm);

    if (this.registerForm.invalid) {
      // console.log('posteando formulario');
      return 
    } /*else {
      console.log('Formualrio no es correcto');
    }*/
    // Realizar posteo
    this.usaurioService.crearUsuario( this.registerForm.value )
      .subscribe( resp => {
        // console.log('Usuario Creado');
        // console.log(resp);
        // Navegar al Dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        // console.warn(err)
        // console.warn(err.error.msg)
        // Mensaje con SweetAlert
        Swal.fire('Error', err.error.msg, 'error');
      });

  }

  campoNoValido(campo: string):boolean {
    
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true
    } else {
      return  false
    }
    
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    if( (pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passWordsIguales(pass1: string, pass2: string) {

    return (formgroup: FormGroup) => {
      const pass1Control = formgroup.get(pass1)
      const pass2Control = formgroup.get(pass2)

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true})
      }
    }

  }

}
