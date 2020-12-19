import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme( theme: string) {
    // console.log(theme);
    // console.log('linkTheme',linkTheme);
    const url = `./assets/css/colors/${theme}.css`
    // console.log('-',url);
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

}
