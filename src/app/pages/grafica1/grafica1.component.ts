import { Component, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  
  titulo:string = "Ventas Online"
  public labels: string[] = ['Pagina', 'App', 'Telefono'];
  public dataLabels: any = [[1520, 1350, 1480]];
  
  // Doughnut Se traslado para reutilizar. Component Dona
 /*  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ]; */
  // public doughnutChartType: ChartType = 'doughnut';
 /*  public colors:Color[] = [
    { backgroundColor: ['#6857E6','#009FEE','#F02059']  }
  ] */

  constructor() { }

  ngOnInit(): void {
  }

   // events
 /*  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  } */

}
