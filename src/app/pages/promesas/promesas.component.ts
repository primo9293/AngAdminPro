import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.getUsuarios();

    this.getUsuarios().then( usuarios1 => {
      console.log('usuarios1', usuarios1);
    })
    
    /* 
    const promesa = new Promise( (resolve, reject) => {
      if (false) {
        resolve('Hola Mundo 1234');
      } else {
        reject('Algo salio mal revisa')
      }
    });

    //  .catch finaliza con error - .finally finaliza no importa si es error o no - .then es cuando se respondio correctamente
    promesa.then( ( mensaje ) => {
      console.log('Termine.', mensaje);
    })
    // Hay qeu capturar los errores y se hacen con el catch despues del then 
    .catch( error => console.log('Error en la promesa revisa', error));
    console.log('Fin 1234');
    */
  }

  getUsuarios() {
    // https://reqres.in/

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data) )
    })

    /* fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => console.log('Body1',body) ) */
      // .then( body => console.log('Body1',body.data) )
    /* fetch('https://reqres.in/api/users')
      .then( resp => {
        console.log('Hay Data',resp);
        resp.json().then( body => console.log('Body',body))
      }) */

  }

}
