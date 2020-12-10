import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
// Rutas Hijas
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


/* 
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component'; 
*/

const routes: Routes = [
  
  /* Optimización por Lazind Loading Rutas Perezosas por modulos
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  }, 
  */
  /* { path: 'dashboard', component: DashboardComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'grafica1', component: Grafica1Component }, 
  */

  /* 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  */

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // forRoot() es para rutas principales y forChild Rutas Hijas
    RouterModule.forRoot( routes ),
    // Importo las rutas hijas por Modulos PagesRoutingModule - AuthRoutingModule
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
