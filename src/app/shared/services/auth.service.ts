import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  coleccion="usuarios";
  usuario ={
    emailUser:'',
    role:'newUser',
    username:'',
    contrasena:''
    }
  constructor(
    private auth: Auth,
    private usuariosService: UsuariosService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.userData = angularFireAuth.authState;
  }

  // Sign up
  SignUp(email: string, password: string, userName:string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.usuario.emailUser = email;
        this.usuario.contrasena = password;
        this.usuario.username = userName;
        this.usuariosService.newUser(this.coleccion,this.usuario);
        console.log('Has sido registrado con éxito', res);
        
      })
      .catch(error => {
        console.log('Algo ha fallado: ', error.message);
      });
  }

  // Sign In
  SignIn(email: string, password: string) {

    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('¡Has entrado!');
        return true;
      })
      .catch(error => {
        console.log('Ha habido un error: ', error.message);
        return false;
      })
  }

  /* is Authenticated */
  isAuthenticated() {
    console.log("Entrando en isAuthenticated");
    return this.angularFireAuth.authState;
  }

  /*  Sign Out  */
  SignOut() {
    this.angularFireAuth.signOut();
  }
  UserActual(){
    return this.auth.currentUser;
  }
}

