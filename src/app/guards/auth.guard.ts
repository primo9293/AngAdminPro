import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      /* Optimizado
      this.usuarioService.validarToken()
        .subscribe(resp => {
          console.log('respuesta',resp);
        })

      console.log('Paso por el  Guard');
      return false; */
      
      return this.usuarioService.validarToken()
        // Si no hay token se debe enviar al login y se usa .pipe y .tap
        .pipe(
          tap(estaAutenticado => {
            if (!estaAutenticado) {
                this.router.navigateByUrl('/login');
            }
          })
        )
  }  
}
