import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroduccionComponent } from './introduccion/introduccion.component';


const routes: Routes = [
  {
    path: '', component: IntroduccionComponent
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroIncidenciaRoutingModule { }
