import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) { }

  listaUsuarios: any[] = [];
  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  });

  login() {
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('contrasena')?.value;
    if (!email || !password) {
      alert("Por favor, ingrese su correo electrónico y contraseña");
      return;
    }
    this.authService.SignIn(email,password)
      .then((resp: any) => {
        if (resp) {
          console.log("Establecemos el rol al usuario");
          this.usuariosService.getUser(email).subscribe((respu: any) => {
            // Si el usuario se autentica correctamente, se obtiene el rol actual y se almacena en una variable
              respu.forEach((user: any) => {
                this.listaUsuarios.push({
                  id: user.payload.doc.id,
                  data: user.payload.doc.data()
                });
              });
              // Establecemos el rol al usuario
            this.listaUsuarios.forEach(user => {
              this.usuariosService.setRolActual(user.data.rol);
            });
          });

          // Se redirige al usuario al menú
          this.router.navigate(['/menu']);
        } else {
          // Si la autenticación falla, se muestra un mensaje de error
          this.formLogin.reset();
          alert("[Error]: El mail o la contraseña son incorrectos")
        }
      });
  }





  logOut() {
    this.authService.SignOut();
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

}
