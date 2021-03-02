import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desdeActual: number = 0;
  public cargando: boolean = true
  public imgSubs: Subscription

  constructor(private usuarioService: UsuarioService,
              private busquedasService :BusquedasService,
              private modalImagenService: ModalImagenService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    // Estoy atento si hay cambios en la imagen de perfil, si es actualizada
    // si hay un evento se dispara esta instruccion
    this.imgSubs = this.modalImagenService.nuevaimagen
      .pipe(
        delay(100)
      ) 
      .subscribe(img=> {
        // console.log(img)
        this.cargarUsuarios()
      })
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desdeActual)
      .subscribe(({total, usuarios}) => {
        // console.log(usuarios);
        this.totalUsuarios = total;
        /* if ( usuarios.length !== 0 ) {
          this.usuarios = usuarios
        } */
        this.usuarios = usuarios
        this.usuariosTemp = usuarios
        this.cargando = false
      })
  }

  cambiarPagina(valor: number) {
    this.desdeActual += valor
    if ( this.desdeActual < 0 ) {
      this.desdeActual = 0
    } else if ( this.desdeActual >= this.totalUsuarios ){
      this.desdeActual -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp      
    }
    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resultados => {
        // console.log(resp)
        this.usuarios = resultados
      })
  }

  eliminarUsuario( usuario: Usuario) {
    // console.log(usuario);

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error','No puede borrar su usuario','error')
    }
    
    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si borrar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
            Swal.fire(
              'Eliminado',
              `El usuario ${usuario.nombre} ha sido borrado`,
              'success'
            );
            this.cargarUsuarios();
          });
      }
    });
  }


  cambiarRole(usuario: Usuario) {
    // console.log(usuario);
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        // console.log('Ok', resp);
        // TODO hacer el del error si falla
      })
  }

  abrirModal(usuario: Usuario){
    // console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
