import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  // progreso: number = 65;

  progreso1: number = 35
  progreso2: number = 65

  constructor() { }

  ngOnInit(): void {
  }

  getProgreso1() {
    return `${this.progreso1}%`
  }

  
  getProgreso2() {
    return `${this.progreso2}%`
  }

  /* Se optimiza para que no haya progreso 1 y progreso 2, se coloca en el html
  cambioValorHijo(valor: number) {
    this.progreso1 = valor;
    console.log('Uy-',valor,'-')
  } */

  /* 
  get getPorcentaje() {
    return `${this.progreso}%`
  }

  cambiarValor( valor: number ) {

    if(this.progreso >= 100 && valor >= 0) {
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0) {
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
  }
  */
}
