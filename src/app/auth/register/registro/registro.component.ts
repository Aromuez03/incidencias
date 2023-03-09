import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from '../../../shared/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private UsuariosService: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      userName:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }


  registro() {
    let email = this.authForm.get('email')?.value;
    let password = this.authForm.get('password')?.value;
    let userName = this.authForm.get('userName')?.value;
    this.authService.SignUp(email,password,userName)
  }
}
