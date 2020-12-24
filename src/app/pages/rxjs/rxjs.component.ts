import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
   
    /* let i = -1;
    
    const obs$ = new Observable<number>( observer => {
      
      // let i = -1;
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if ( i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( i === 2) {
          i = 0;
          observer.error('i finalizado');
        }

      }, 1000);

    }) */

    // .pipe() transforma la información que fluye a traves del observable
    // obs$.pipe(
    /* this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subs:', valor),
      error => console.warn('Error', error),
      () => console.info('Observable Terminado')
    ); */
    
    /* const obs$ = new Observable( observer => {

      setInterval( () => {
        console.log('Tick Tac');
      }, 1000);

    })

    obs$.subscribe(
      valor => console.log('Subs:', valor)
    ); */

    this.intervalSubs = this.retornaIntervalo()
    .subscribe( console.log)
    /* this.retornaIntervalo()
      .subscribe( console.log) */
      /* .subscribe(
        ( valor => console.log(valor))
      ) */

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    // const intervalo$ = interval(1000);
    
    return interval(100)
            .pipe(
              // take() cuantas veces quiero repetir
              take(50),
              // map() recibe la información del observable que emite y lo transforma como uno lo coloque
              map( valor => {
                return valor + 1; // 0 + 1 = 1 
                // return 'Hola Mundo ' + valor; // Colocar en el tipado Observable<string>
              }),
              // Filtra 
              filter( valor => ( valor % 2 === 0 ) ? true: false),
              // take() cuantas veces quiero repetir
              // take(10),
            )
    /*
     return interval(1000)
            .pipe(
              // take() cuantas veces quiero repetir
              take(4),
              // map() recibe la información del observable que emite y lo transforma como uno lo coloque
              map( valor => {
                return valor + 1; 
                // return 'Hola Mundo ' + valor; // Colocar en el tipado Observable<string>
              })
            ) */

    /* Optimizado ver arriba linea 73
     const intervalo$ = interval(1000)
                        .pipe(
                          // take() cuantas veces quiero repetir
                          take(4),
                          // map() recibe la información del observable que emite y lo transforma como uno lo coloque
                          map( valor => {
                            // return valor + 1; 
                            return 'Hola Mundo ' + valor;
                          })
                        )
    return intervalo$; */
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    
    // const obs$ = new Observable<number>( observer => {
    return new Observable<number>( observer => {
      
      // let i = -1;
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if ( i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( i === 2) {
          // i = 0;
          observer.error('i finalizado');
        }

      }, 1000);

    })
  }

}
