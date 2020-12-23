import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// Como es algo global se coloca esta linea
declare function customInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  // Se movio a un servicio C:\Users\carpr\OneDrive\Documentos\Ejercicios\Angular-Udemy\03-AngularAvanzado\03-adminpro\src\app\services\settings.service.ts
  // public linkTheme = document.querySelector('#theme');

  constructor(private settingService: SettingsService  ) { }

  ngOnInit(): void {
    // this.loadTheme()
    customInitFunctions();
  }

  /* loadTheme() {
    const tema = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    // console.log('tema',tema);
    this.linkTheme.setAttribute('href', tema);
  } */


}
