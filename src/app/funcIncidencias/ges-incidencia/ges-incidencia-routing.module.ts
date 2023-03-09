import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { ListaIncidenciasComponent } from './lista-incidencias/lista-incidencias.component';

const routes: Routes = [
  {
    path: '', component: ListaIncidenciasComponent
  },
  {
    path: 'edit/:idIncidencia', component: GestionComponent
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GesIncidenciaRoutingModule { }
