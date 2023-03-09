import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GesIncidenciaRoutingModule } from './ges-incidencia-routing.module';
import { GestionComponent } from './gestion/gestion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaIncidenciasComponent } from './lista-incidencias/lista-incidencias.component';


@NgModule({
  declarations: [
    GestionComponent,
    ListaIncidenciasComponent
  ],
  imports: [
    CommonModule,
    GesIncidenciaRoutingModule,
    ReactiveFormsModule
  ]
})
export class GesIncidenciaModule { }
