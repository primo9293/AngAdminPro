import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [
    {
        // path: '',
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          // { path: 'dashboard', component: DashboardComponent }, // dashboard
          { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},             // dashboard
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
          { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica'}},
          { path: 'accountsettings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
          { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
          // { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, Como ya esta en la linea 16 no hay necesidad de esta linea
          // Mantenimientos 
          { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de Aplicacion'}},
        ]
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class PagesRoutingModule {}
