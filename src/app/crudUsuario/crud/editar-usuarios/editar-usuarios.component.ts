import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  formUsu = this.afb.group({
    email: ['', Validators.required],
    userName:['',Validators.required]
  })

  documentId :string = '';
  constructor(
    private afb: FormBuilder,
    private ruta: ActivatedRoute,
    private usuService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.documentId = this.ruta.snapshot.paramMap.get('idUsuario')!;
    this.usuService.getOne("usuarios",this.documentId).subscribe((resp: any) => { 
      this.formUsu.setValue(resp.payload.data() );
    });
  }
  onSubmit(){
    this.formUsu.patchValue({
      email: this.formUsu.value.email
    });
    this.formUsu.patchValue({
      userName: this.formUsu.value.userName
    });
    this.usuService.update("usuarios",this.documentId,this.formUsu.value)
    }

}
