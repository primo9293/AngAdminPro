import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {
 
  // @Input Recibo información del padre
  // @Input() nombre como se llama: tipo_dato = data por defecto;
  // @Input()        title        :  string   = 'Sin titulo';
  @Input() title: string = 'Sin titulo';
  @Input() labelsTitu: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('dataLab') doughnutChartData: MultiDataSet = [[350, 450, 100]];

  public colors:Color[] = [
    { backgroundColor: ['#6857E6','#009FEE','#F02059']  }
  ]
  
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [ [350, 450, 100] ];
  // public doughnutChartType: ChartType = 'doughnut';
  
  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
