import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {
    this.googleInit();
  }

  /* Optimizado
  googleInit() {
    gapi.load('auth2', () => {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '379790892673-084o01ktt0pqkvau4r40b15uame966hc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
    });
  }   */   
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
      return {
        headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {
    return new Promise<void>(resolve => {
      // console.log('Google Init');
      gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '379790892673-084o01ktt0pqkvau4r40b15uame966hc.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      });
    })
    
  }

  logout(){
    localStorage.removeItem('token');
    
    
    this.auth2.signOut().then(() => {
      // console.log('User signed out.');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  //Optimizado
  /* validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        // console.log(resp)
        // Desustructurando
        const { nombre, email, google, role, img ='', uid } = resp.usuarioDB;
        // this.usuario = resp.usuarioDB;
        // Instancia del usuario
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        // this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true ),
      // Se atrapa el error y con el of() lo que hace es hacer otro observable 
      // y con eso manejamos el error y le devolvemos el false al Guard
      catchError(error => {
        console.log('error', error);
        return of(false)
      })
    );
  } */
 
  validarToken(): Observable<boolean>{
      // Optimizado const token = localStorage.getItem('token') || '';
      return this.http.get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token
        }
      }).pipe(
        map( (resp: any) => {
          // console.log(resp)
          // Desustructurando
          const { nombre, email, google, role, img ='', uid } = resp.usuarioDB;
          // this.usuario = resp.usuarioDB;
          // Instancia del usuario
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          // this.usuario.imprimirUsuario();
          localStorage.setItem('token', resp.token)
          return true
        }),
        // map( resp => true ),
        // Se atrapa el error y con el of() lo que hace es hacer otro observable 
        // y con eso manejamos el error y le devolvemos el false al Guard
        catchError(error => {
          console.log('error', error);
          return of(false)
        })
      );
    }

  crearUsuario( formData: RegisterForm ) {
    // console.log('Creandi Usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
                  .pipe(
                    tap( (resp: any) => {
                      // console.log('resp_Crear');
                      localStorage.setItem('token', resp.token)
                    })
                  )
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string}) {
    
    // enviar Rol
    // ...data = le digo todo lo qeu viene en la data
    data = {
      ...data,
      role: this.usuario.role
    };
    // Aqui data ya viene con email, nombre y role
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

    /* return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    }); */
  }

  login( formData: LoginForm ) {
    // console.log('Creandi Usuario');
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    // console.log('resp_Login');
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  loginGoogle( token ) {
    // console.log('Creandi Usuario');
    return this.http.post(`${base_url}/login/google`, { token })
                .pipe(
                  tap( (resp: any) => {
                    // console.log('resp_Login');
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  cargarUsuarios(desde: number = 0) {
    // http://localhost:3000/api/usuarios?desde=0
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url, this.headers)
            .pipe(
              // delay(5000),
              map(resp => {
                // console.log(resp);
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email,'', user.img, user.google, user.role, user.uid)
                );

                return {
                  total: resp.total,
                  usuarios
                }
              })
            )
  }

  eliminarUsuario(usuario: Usuario) {
    console.log('Elimiando');
    // /usuarios/uid
    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);
  }

  guardarUsuario( usuario: Usuario ) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}

