import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroIncidenciaRoutingModule } from './intro-incidencia-routing.module';
import { IntroduccionComponent } from './introduccion/introduccion.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IntroduccionComponent
  ],
  imports: [
    CommonModule,
    IntroIncidenciaRoutingModule,
    ReactiveFormsModule
  ]
})
export class IntroIncidenciaModule { }
