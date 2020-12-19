import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    this.loadTheme()
  }

  loadTheme() {
    const tema = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    // console.log('tema',tema);
    this.linkTheme.setAttribute('href', tema);
  }


}
