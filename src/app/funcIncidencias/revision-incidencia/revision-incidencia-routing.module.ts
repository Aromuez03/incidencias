import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaIncidenciasComponent } from './lista-incidencias/lista-incidencias.component';

const routes: Routes = [
  {
    path: '', component: ListaIncidenciasComponent
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionIncidenciaRoutingModule { }
