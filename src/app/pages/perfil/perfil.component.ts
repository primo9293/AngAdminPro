import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) { 
    this.usuario = usuarioService.usuario;          
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( resp => {
        console.log(resp);
        const {nombre, email} = this.perfilForm.value
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        // TODO colocar mensaje SweetAlert
        Swal.fire('Guardado','Cambios fueron guardados', 'success');
      }, (err) => {
        console.log(err);
        console.log(err.error.msg);
        Swal.fire('Error',err.error.msg, 'error');
      })
  }

  cambiarImagen(file: File) {
    // console.log(file);
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    // const url64 = reader.readAsDataURL(file);
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader.result);
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.img = img
        Swal.fire('Imagen','Imagen subida exitosamente', 'success');
      }).catch( err => {
        Swal.fire('Error','No se pudo actualizar la imagen', 'error');
      });
  }

}
