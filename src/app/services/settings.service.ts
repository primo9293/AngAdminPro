import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    // console.log('Settings Services Init');
    this.loadTheme();
  }

  loadTheme() {
    const tema = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    // console.log('tema',tema);
    this.linkTheme.setAttribute('href', tema);
  }

  changeTheme( theme: string) {
    // console.log(theme);
    // console.log('linkTheme',linkTheme);
    const url = `./assets/css/colors/${theme}.css`
    // console.log('-',url);
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    // public linkTheme = document.querySelector('#theme');
    // const links: NodeListOf<Element>;
    const links = document.querySelectorAll('.selector');
    // console.log('Links',links);
    links.forEach( elem => {
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
