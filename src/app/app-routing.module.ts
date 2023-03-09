import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './auth/guards/login-guard.guard';
import { OperarioGuard } from './auth/guards/operario.guard';
import { DirectivoGuard } from './auth/guards/directivo.guard';


const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./auth/login/login.module').
          then(m => m.LoginModule)
  },
  {
    path: 'registro', loadChildren: () => import('./auth/register/register.module').
          then(m => m.RegisterModule)
  },
  {
    path: 'intInc', loadChildren: () => import('./funcIncidencias/intro-incidencia/intro-incidencia.module').
          then(m => m.IntroIncidenciaModule)
  },
  {
    path: 'gesInc', loadChildren: () => import('./funcIncidencias/ges-incidencia/ges-incidencia.module').
          then(m => m.GesIncidenciaModule),
          canActivate: [OperarioGuard]
  },
  {
    path: 'revInc', loadChildren: () => import('./funcIncidencias/revision-incidencia/revision-incidencia.module').
          then(m => m.RevisionIncidenciaModule),
          canActivate: [DirectivoGuard]
  },
  {
    path: 'listUsu', loadChildren: () => import('./crudUsuario/crud/crud.module').
          then(m => m.CrudModule),
          canActivate: [LoginGuardGuard]
  },
  {
    path: '**', redirectTo: '/intInc', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
