import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  // Optimización del component Antes linea 24
  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string) {
    this.settingsService.changeTheme(theme);
  }

}

/*
export class AccountSettingsComponent implements OnInit {

  // Movido al servicio C:\Users\carpr\OneDrive\Documentos\Ejercicios\Angular-Udemy\03-AngularAvanzado\03-adminpro\src\app\services\settings.service.ts
  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element>;

  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
    // this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string) {
    // Se mueve a un servicio C:\Users\carpr\OneDrive\Documentos\Ejercicios\Angular-Udemy\03-AngularAvanzado\03-adminpro\src\app\services\settings.service.ts
    // console.log(theme);
    // console.log('linkTheme',linkTheme);
    const url = `./assets/css/colors/${theme}.css`
    // console.log('-',url);
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    // this.settingsService.changeTheme(theme);
    this.checkCurrentTheme();
  }

  // Movido al servicio C:\Users\carpr\OneDrive\Documentos\Ejercicios\Angular-Udemy\03-AngularAvanzado\03-adminpro\src\app\services\settings.service.ts
  checkCurrentTheme(){
    // console.log('Links',links);
    this.links.forEach( elem => {
      elem.classList.remove('working');
      // Busco y comparo con el que esta actual ó en cache y asigno la clase Working(Clase qeu coloca el check el chulito)
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme.getAttribute('href');
      // console.log('btnTheme',btnTheme);
      // console.log('- btnThemeUrl',btnThemeUrl,);
      // console.log('- currentTheme',currentTheme);
      if ( btnThemeUrl === currentTheme ) {
        elem.classList.add('working');
      }
    })
  } 

}
*/