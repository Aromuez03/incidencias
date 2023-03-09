import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevisionIncidenciaRoutingModule } from './revision-incidencia-routing.module';
import { ListaIncidenciasComponent } from './lista-incidencias/lista-incidencias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaIncidenciasComponent
  ],
  imports: [
    CommonModule,
    RevisionIncidenciaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RevisionIncidenciaModule { }
