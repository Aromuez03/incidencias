import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from '@firebase/app';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { OperarioGuard } from './auth/guards/operario.guard';
import { DirectivoGuard } from './auth/guards/directivo.guard';
import { LoginGuardGuard } from './auth/guards/login-guard.guard';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserAnimationsModule,
    SharedModule,
    provideAuth(() => getAuth()),
    RouterModule
    
  ],
  providers:[
    OperarioGuard,DirectivoGuard,LoginGuardGuard,
    { provide: PERSISTENCE, useValue: 'session'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
