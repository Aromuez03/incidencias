import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../shared/services/firestore.service';

@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.component.html',
  styleUrls: ['./lista-incidencias.component.css']
})
export class ListaIncidenciasComponent implements OnInit {

  incidencias: any[] = [];
  constructor(
    private fire: FirestoreService
  ) { }

  ngOnInit(): void {
    console.log('hola ');
    this.fire.getAll("incidencias").subscribe(
      (resp: any) =>{
        this.incidencias = [];
        resp.forEach((incidencia: any) => {
          this.incidencias.push({
            documentId: incidencia.payload.doc.id,
            data: incidencia.payload.doc.data()
          })  
        });
      }
    )
  }
  onClickDelete(documentId: string){
    this.fire.delete("incidencias",documentId)
  }
}
