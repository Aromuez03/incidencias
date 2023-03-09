import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  formEditIncidencia = this.fb.group({
    lugarIncidencia: [],
    descIncidencia: [],
    arregloIncidencia: [],
    estadoIncidencia: ['', Validators.required],
    asignaIncidencia: ['', Validators.required],
    revision: []
  })
  indidencia: any;
  documentId: string = '';
  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private fire: FirestoreService
  ) { }

  ngOnInit(): void {
    this.documentId = this.ruta.snapshot.paramMap.get('idIncidencia')!;
    this.fire.getOne("incidencias",this.documentId).subscribe((resp: any) => { 
      this.formEditIncidencia.setValue(resp.payload.data() );
    });
  }
  onSubmit(){
    this.formEditIncidencia.patchValue({
    estadoIncidencia: this.formEditIncidencia.value.estadoIncidencia
    });
    this.fire.update("incidencias",this.documentId,this.formEditIncidencia.value)
    }
}
