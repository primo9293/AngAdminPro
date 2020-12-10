import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';


const routes: Routes = [
    {
        // path: '',
        path: 'dashboard',
        component: PagesComponent,
        children: [
          // { path: 'dashboard', component: DashboardComponent }, // dashboard
          { path: '', component: DashboardComponent },             // dashboard
          { path: 'progress', component: ProgressComponent },
          { path: 'grafica1', component: Grafica1Component },
          // { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, Como ya esta en la linea 16 no hay necesidad de esta linea
        ]
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class PagesRoutingModule {}
