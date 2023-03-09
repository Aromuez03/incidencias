import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios : any[] = [];
  constructor(
    private usuService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuService.getAll().subscribe( (resp : any) => {
      this.usuarios= []
      resp.forEach((dataUsu :any) =>
      {
        console.log(dataUsu.payload.doc.data());
        this.usuarios.push({
          id: dataUsu.payload.doc.id,
          data: dataUsu.payload.doc.data()
        })
      });
    })
  }

}
