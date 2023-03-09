import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

  
@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.component.html',
  styleUrls: ['./lista-incidencias.component.css']
})
export class ListaIncidenciasComponent implements OnInit {

  selectedValue: string = 'Todos';
  incidencias: any[] = [];
  revisionForms: FormGroup[] = [];
  incidenciasFiltradas: any[];

  constructor(
    private fire: FirestoreService,
    private afb: FormBuilder
  ) { 
    this.incidenciasFiltradas = [];
  }

  ngOnInit(): void {
    this.getIncidenciasFiltradas();
    this.fire.getAll("incidencias").subscribe(
      (resp: any) => {
        this.incidencias = [];
        this.revisionForms = [];
        resp.forEach((incidencia: any) => {
          this.incidencias.push({
            documentId: incidencia.payload.doc.id,
            data: incidencia.payload.doc.data()
          });
          this.revisionForms.push(this.afb.group({
            revision: [incidencia.payload.doc.data().revision, Validators.required]
          }));
        });
      }
    );
  }

  onSubmit(index: number){
    const documentId = this.incidencias[index].documentId;
    this.fire.update("incidencias", documentId, this.revisionForms[index].value);
  }

  onClickDelete(documentId: string){
    this.fire.delete("incidencias", documentId);
  }

  // Función para obtener incidencias según el filtro seleccionado
  getIncidenciasFiltradas() {
    if (this.selectedValue === 'Todos') {
      this.fire.getAll("incidencias").subscribe((resp: any) => {
        this.incidencias = resp.map((incidencia: any) => {
          return {
            documentId: incidencia.payload.doc.id,
            data: incidencia.payload.doc.data()
          };
        });
        this.incidenciasFiltradas = this.incidencias;
        this.filtrarIncidencias();
      });
    } else {
      this.fire.queryIncidencia('revision', this.selectedValue === 'Revisado' ? 'true' : 'false').subscribe((incidencias: any[]) => {
        this.incidencias = incidencias.map(incidencia => {
          return {
            documentId: incidencia.payload.doc.id,
            data: incidencia.payload.doc.data()
          };
        });
        this.incidenciasFiltradas = this.incidencias;
        this.filtrarIncidencias();
      });
    }
  }
  

  onSelectChange(event: any) {
    this.selectedValue = event.target.value;
    this.getIncidenciasFiltradas();
  }
  

  filtrarIncidencias() {
    if (this.selectedValue === 'Revisado') {
      this.incidencias = this.incidenciasFiltradas.filter(incidencia => incidencia.data.revision === true);
    } else if (this.selectedValue === 'No Revisado') {
      this.incidencias = this.incidenciasFiltradas.filter(incidencia => incidencia.data.revision === false);
    } else {
      this.incidencias = this.incidenciasFiltradas;
    }
  }
}